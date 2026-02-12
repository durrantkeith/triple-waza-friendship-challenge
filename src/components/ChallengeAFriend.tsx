import { useState } from 'react';
import { Mail, UserPlus, Send, Plus, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ChallengeAFriendProps {
  onNavigate: (page: string) => void;
}

export default function ChallengeAFriend({ onNavigate }: ChallengeAFriendProps) {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [recipientEmails, setRecipientEmails] = useState(['']);
  const [message, setMessage] = useState(
    `Subject: Your Dojo is Invited: Triple Waza Friendship Challenge

Greetings from the Triple Waza Friendship Challenge!
We invite your dojo to join a growing global movement of judo practitioners preserving traditional kata together.
The Challenge: Film your group performing the first three Nage-no-Kata techniques and share it with dojos worldwide.
✅ No experience needed. Everyone in the dojo does this together!
✅ All ages and levels welcome
✅ Participation over perfection
✅ Earn a place in our global Hall of Fame archive

Can you complete the challenge within 30 days?

Learn more: triplewazachallenge.com

Respectfully,
[Your Name]`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const addEmailField = () => {
    setRecipientEmails([...recipientEmails, '']);
  };

  const removeEmailField = (index: number) => {
    const newEmails = recipientEmails.filter((_, i) => i !== index);
    setRecipientEmails(newEmails.length > 0 ? newEmails : ['']);
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...recipientEmails];
    newEmails[index] = value;
    setRecipientEmails(newEmails);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!senderName.trim()) {
      setError('Please enter your name');
      setIsSubmitting(false);
      return;
    }

    const validEmails = recipientEmails.filter(email => email.trim() && email.includes('@'));

    if (validEmails.length === 0) {
      setError('Please enter at least one valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const referrals = validEmails.map(email => ({
        sender_name: senderName.trim(),
        sender_email: senderEmail.trim(),
        recipient_email: email.trim(),
        message: message.trim(),
      }));

      const { error: insertError } = await supabase
        .from('friend_referrals')
        .insert(referrals);

      if (insertError) throw insertError;

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-challenge-emails`;
      const headers = {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      };

      const emailPromises = validEmails.map(async email => {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            sender_name: senderName.trim(),
            sender_email: senderEmail.trim(),
            recipient_email: email.trim(),
            message: message.trim(),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to send to ${email}`);
        }

        return response;
      });

      await Promise.all(emailPromises);

      onNavigate('video-thankyou');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send invitations. Please try again.';

      if (errorMessage.includes('Email service not configured')) {
        setError('Email service is not configured. Please contact the administrator to set up RESEND_API_KEY in Supabase.');
      } else {
        setError(errorMessage);
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Golden Frame Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-5xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-yellow-300/10 to-transparent rounded-lg blur-xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800/95 via-slate-900/98 to-black/95 backdrop-blur-xl rounded-lg p-1 shadow-[0_0_60px_rgba(251,191,36,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="bg-gradient-to-br from-slate-900/98 via-slate-800/95 to-slate-900/98 rounded-lg p-12 md:p-16 border-4 border-double border-amber-400/40 shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-center mb-6">
                  <UserPlus size={48} className="mr-4 text-amber-400" />
                  <h1 className="text-4xl md:text-5xl font-bold">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
                      Challenge other Dojos!
                    </span>
                  </h1>
                </div>
                <div className="text-center max-w-3xl mx-auto mb-8">
                  <p className="text-2xl md:text-3xl font-bold mb-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
                      Each dojo is asked to Challenge 3 more dojos.
                    </span>
                    <br />
                    <span className="text-white">
                      Judo for everyone. Judo for the world!
                    </span>
                  </p>
                </div>

                <div className="max-w-3xl mx-auto border-t border-b border-amber-400/20 py-8">
                  <p className="text-lg md:text-xl text-white leading-relaxed font-light text-center mb-6">
                    The Triple Waza Friendship Challenge connects kata practitioners worldwide at a grassroots level. No organizations. No associations. Just fun. Through attainable goals and five minutes of group practice, traditional judo becomes accessible to everyone. Practice together, share your three technique video, and strengthen Judo.
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
                      Each dojo is asked to Challenge 3 more dojos.
                      <br />
                      Be a part of our effort to improve and preserve Judo for future generations!
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Name or Dojo Name <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-slate-600 mb-2">This will appear as "Introduced by [Your Name/Dojo]"</p>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-osp-blue focus:border-transparent transition-all"
                  placeholder="Enter your name or dojo name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Email <span className="text-slate-400">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-osp-blue focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Dojo Email Address(es) <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {recipientEmails.map((email, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Mail className="text-slate-400 flex-shrink-0" size={20} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => updateEmail(index, e.target.value)}
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-osp-blue focus:border-transparent transition-all"
                        placeholder="dojo@email.com"
                        required
                      />
                      {recipientEmails.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEmailField(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Remove email field"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addEmailField}
                  className="mt-3 flex items-center space-x-2 text-osp-blue hover:text-osp-navy font-medium transition-colors"
                >
                  <Plus size={20} />
                  <span>Add another email</span>
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-osp-blue focus:border-transparent transition-all resize-none"
                  rows={18}
                  placeholder="Add a personal message to your invitation..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-osp-blue hover:bg-osp-navy text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>{isSubmitting ? 'Sending...' : 'Send Invitations'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('challenge')}
                  className="sm:w-auto px-6 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="text-center text-slate-600 text-sm">
                By sending invitations, you're helping grow our global Judo community.{' '}
                <button
                  onClick={() => onNavigate('submit')}
                  className="text-osp-blue hover:text-osp-navy font-medium underline"
                >
                  Learn more about the challenge
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
