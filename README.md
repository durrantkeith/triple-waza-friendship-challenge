# Triple Waza Friendship Challenge

A global judo challenge platform connecting practitioners worldwide through the practice of Nage-no-Kata.

## Quick Links

- **Live Site**: https://triplewazachallenge.netlify.app
- **Admin Dashboard**: https://triplewazachallenge.netlify.app/admin

## Features

- Video submission system for judo practitioners
- Global participation map showing dojos worldwide
- Founding Sensei Circle showcase
- Educational content and kata library
- Admin dashboard for content management
- Social media integration
- Challenge-a-friend functionality

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Hosting**: Netlify
- **Authentication**: Supabase Auth

## Local Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account
- GitHub account (for deployment)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/durrantkeith/triple-waza-friendship-challenge.git
cd triple-waza-friendship-challenge
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Add your Supabase credentials to `.env`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Deployment to Netlify

### One-Time Setup

1. **Connect to Netlify**:
   - Log in to [Netlify](https://app.netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Choose GitHub and select your repository
   - Netlify will auto-detect the build settings from `netlify.toml`

2. **Configure Environment Variables**:
   Go to Site Settings > Environment Variables and add:

   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Deploy**:
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Automatic Deployments

Once connected, Netlify automatically deploys when you push to the `main` branch:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

## Database Setup

The project uses Supabase for data persistence. All migrations are in `supabase/migrations/`.

Key tables:
- `submissions` - Video submissions from practitioners
- `dojos` - Registered dojos worldwide
- `founders` - Founding members showcase
- `founding_sensei_circle` - Founding Sensei Circle members
- `educational_content` - Educational articles and resources
- `kata_collections` - Kata library collections

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── lib/           # Supabase client
│   ├── utils/         # Helper functions
│   └── styles/        # CSS files
├── supabase/
│   ├── migrations/    # Database migrations
│   └── functions/     # Edge functions
├── public/            # Static assets
└── docs/             # Documentation
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks

## Admin Access

To create an admin user, use the provided script:

```bash
node create-admin.mjs your-email@example.com
```

Then log in at `/admin` with your Supabase credentials.

## Social Media Integration

The platform includes social media auto-posting functionality. See `SOCIAL_MEDIA_SETUP.md` for configuration details.

## Security

- Row Level Security (RLS) enabled on all tables
- Admin-only access for content management
- Secure file uploads with validation
- Environment variables for sensitive data

## Documentation

- `DEPLOYMENT_GUIDE.md` - Detailed deployment instructions
- `NETLIFY_DEPLOYMENT_GUIDE.md` - Netlify-specific setup
- `SOCIAL_MEDIA_SETUP.md` - Social media integration
- `SECURITY_CHECKLIST.md` - Security guidelines
- `SUPABASE_AUTH_CONFIG.md` - Authentication setup

## Contributing

This is a community-driven project. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For questions or issues:
- Open a GitHub issue
- Contact: info@onlineselfprotection.com

## License

All rights reserved.

## Acknowledgments

Built for the global judo community to promote the practice of Nage-no-Kata and foster connections between practitioners worldwide.
