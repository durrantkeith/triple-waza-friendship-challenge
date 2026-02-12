import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fjzlfidikzkomaywqwku.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqemxmaWRpa3prb21heXdxd2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MjI2NDYsImV4cCI6MjA4NDE5ODY0Nn0.Yu04bAA3qz2DSPR7bfnyLLZuTaeBAz1rDL2qDUqcOOU';

// Service role key needed for admin operations
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function resetAdminPassword() {
  const email = 'durrantkeith@gmail.com';
  const newPassword = 'OSPJudoFudoshin#0131';

  if (!supabaseServiceRoleKey) {
    console.log('⚠️  Service role key not found.');
    console.log('\nTo reset the password, you need to:');
    console.log('1. Go to https://dashboard.supabase.com');
    console.log('2. Select your project');
    console.log('3. Go to Settings → API');
    console.log('4. Copy the "service_role" key (NOT the anon key)');
    console.log('5. Run: SUPABASE_SERVICE_ROLE_KEY=your_key_here node create-admin.mjs');
    return;
  }

  try {
    // Create admin client with service role key
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // First, try to get the user
    const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers();

    if (listError) {
      console.error('Error listing users:', listError.message);
      return;
    }

    const user = users.users.find(u => u.email === email);

    if (user) {
      // User exists, update password
      const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
        user.id,
        { password: newPassword }
      );

      if (error) {
        console.error('Error updating password:', error.message);
        return;
      }

      console.log('✅ Password reset successfully!');
      console.log('Email:', email);
      console.log('New Password:', newPassword);
      console.log('User ID:', user.id);
    } else {
      // User doesn't exist, create it
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: newPassword,
        email_confirm: true
      });

      if (error) {
        console.error('Error creating user:', error.message);
        return;
      }

      console.log('✅ New admin account created successfully!');
      console.log('Email:', email);
      console.log('Password:', newPassword);
      console.log('User ID:', data.user?.id);
    }

    console.log('\nYou can now login with these credentials.');

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

resetAdminPassword();
