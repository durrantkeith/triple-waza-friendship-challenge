import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface UploadRequest {
  submissionId: string;
}

interface SocialMediaResult {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  error?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { submissionId }: UploadRequest = await req.json();

    if (!submissionId) {
      throw new Error("submissionId is required");
    }

    const { data: submission, error: fetchError } = await supabase
      .from("submissions")
      .select("*, dojos(*)")
      .eq("id", submissionId)
      .single();

    if (fetchError || !submission) {
      throw new Error("Submission not found");
    }

    if (submission.status !== "approved") {
      throw new Error("Only approved submissions can be uploaded to social media");
    }

    const result: SocialMediaResult = {};
    const errors: string[] = [];

    let videoUrl = submission.youtube_url;

    if (!videoUrl && submission.video_file_path) {
      const { data: publicUrlData } = supabase.storage
        .from("kata-videos")
        .getPublicUrl(submission.video_file_path);
      videoUrl = publicUrlData.publicUrl;
    }

    if (!videoUrl) {
      throw new Error("No video URL or file path found");
    }

    const caption = `🥋 Triple Waza Friendship Challenge\n\n` +
      `${submission.dojos?.name || "Dojo"} from ${submission.dojos?.city}, ${submission.dojos?.country}\n\n` +
      `${submission.message || "Join us in celebrating the global judo community!"}\n\n` +
      `#TripleWazaChallenge #Judo #MartialArts #JudoCommunity`;

    const facebookPageId = Deno.env.get("FACEBOOK_PAGE_ID");
    const facebookAccessToken = Deno.env.get("FACEBOOK_ACCESS_TOKEN");
    if (facebookPageId && facebookAccessToken) {
      try {
        const fbResponse = await fetch(
          `https://graph.facebook.com/v18.0/${facebookPageId}/videos`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              file_url: videoUrl,
              description: caption,
              access_token: facebookAccessToken,
            }),
          }
        );

        if (fbResponse.ok) {
          const fbData = await fbResponse.json();
          result.facebook = `https://www.facebook.com/${fbData.id}`;
        } else {
          const errorText = await fbResponse.text();
          errors.push(`Facebook: ${errorText}`);
        }
      } catch (error) {
        errors.push(`Facebook: ${error.message}`);
      }
    }

    const instagramUserId = Deno.env.get("INSTAGRAM_USER_ID");
    const instagramAccessToken = Deno.env.get("INSTAGRAM_ACCESS_TOKEN");
    if (instagramUserId && instagramAccessToken) {
      try {
        const igContainerResponse = await fetch(
          `https://graph.facebook.com/v18.0/${instagramUserId}/media`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              video_url: videoUrl,
              caption: caption,
              media_type: "REELS",
              access_token: instagramAccessToken,
            }),
          }
        );

        if (igContainerResponse.ok) {
          const containerData = await igContainerResponse.json();

          const igPublishResponse = await fetch(
            `https://graph.facebook.com/v18.0/${instagramUserId}/media_publish`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                creation_id: containerData.id,
                access_token: instagramAccessToken,
              }),
            }
          );

          if (igPublishResponse.ok) {
            const publishData = await igPublishResponse.json();
            result.instagram = `https://www.instagram.com/p/${publishData.id}`;
          } else {
            const errorText = await igPublishResponse.text();
            errors.push(`Instagram publish: ${errorText}`);
          }
        } else {
          const errorText = await igContainerResponse.text();
          errors.push(`Instagram container: ${errorText}`);
        }
      } catch (error) {
        errors.push(`Instagram: ${error.message}`);
      }
    }

    const youtubeAccessToken = Deno.env.get("YOUTUBE_ACCESS_TOKEN");
    if (youtubeAccessToken && submission.video_file_path) {
      try {
        const title = `Triple Waza Challenge - ${submission.dojos?.name} (${submission.dojos?.city}, ${submission.dojos?.country})`;

        const videoBlob = await fetch(videoUrl).then(r => r.blob());

        const metadata = {
          snippet: {
            title: title.substring(0, 100),
            description: caption,
            tags: ["judo", "martial arts", "triple waza challenge", "kata"],
            categoryId: "17",
          },
          status: {
            privacyStatus: "public",
            selfDeclaredMadeForKids: false,
          },
        };

        const formData = new FormData();
        formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        formData.append('video', videoBlob, 'video.mp4');

        const ytResponse = await fetch(
          "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=multipart&part=snippet,status",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${youtubeAccessToken}`,
            },
            body: formData,
          }
        );

        if (ytResponse.ok) {
          const ytData = await ytResponse.json();
          result.youtube = `https://www.youtube.com/watch?v=${ytData.id}`;
        } else {
          const errorText = await ytResponse.text();
          errors.push(`YouTube: ${errorText}`);
        }
      } catch (error) {
        errors.push(`YouTube: ${error.message}`);
      }
    }

    const updateData: any = {
      social_media_uploaded_at: new Date().toISOString(),
    };

    if (result.facebook) updateData.facebook_url = result.facebook;
    if (result.instagram) updateData.instagram_url = result.instagram;
    if (result.youtube) updateData.youtube_url = result.youtube;
    if (errors.length > 0) updateData.social_media_upload_error = errors.join("; ");

    await supabase
      .from("submissions")
      .update(updateData)
      .eq("id", submissionId);

    return new Response(
      JSON.stringify({
        success: true,
        result,
        errors: errors.length > 0 ? errors : undefined,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error uploading to social media:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
