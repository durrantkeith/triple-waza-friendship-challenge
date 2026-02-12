# Contributing to Triple Waza Friendship Challenge

Thank you for your interest in contributing to the Triple Waza Friendship Challenge platform!

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/triple-waza-friendship-challenge.git
   cd triple-waza-friendship-challenge
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Local Setup

1. Copy environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your Supabase credentials to `.env.local`

3. Start the development server:
   ```bash
   npm run dev
   ```

### Making Changes

1. Make your changes in a feature branch
2. Test your changes locally
3. Run type checking:
   ```bash
   npm run typecheck
   ```
4. Run linting:
   ```bash
   npm run lint
   ```
5. Build to verify no production errors:
   ```bash
   npm run build
   ```

## Code Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types for props and state
- Avoid `any` type when possible

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use meaningful component and prop names

### Styling

- Use Tailwind CSS utility classes
- Follow existing design patterns
- Ensure responsive design (mobile-first)
- Test on multiple screen sizes

### Accessibility

- Use semantic HTML elements
- Add proper ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers when possible

## Database Changes

### Migrations

When making database changes:

1. Create a new migration file in `supabase/migrations/`
2. Use timestamp format: `YYYYMMDDHHMMSS_description.sql`
3. Include detailed comments explaining changes
4. Always enable RLS on new tables
5. Add appropriate RLS policies
6. Test migrations locally first

Example migration structure:
```sql
/*
  # Description of Migration

  1. Changes Made
    - List of changes

  2. Security
    - RLS policies added
*/

-- Your SQL here
```

## Commit Guidelines

### Commit Messages

Follow this format:
```
Type: Brief description

Longer description if needed
```

Types:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Build process or tooling changes

Examples:
```
feat: Add video upload progress indicator

fix: Resolve mobile navigation menu closing issue

docs: Update deployment guide with environment variables
```

## Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Create a pull request with:
   - Clear title describing the change
   - Description of what was changed and why
   - Screenshots for UI changes
   - Reference to related issues (if any)

4. Wait for review
5. Address any requested changes
6. Once approved, your PR will be merged

## Testing

### Manual Testing

Before submitting a PR:
- Test your changes in multiple browsers
- Test on mobile devices or emulators
- Verify no console errors
- Check that existing features still work

### Visual Testing

For UI changes:
- Include before/after screenshots
- Test different screen sizes
- Verify color contrast meets accessibility standards

## Questions or Issues?

- Open an issue for bugs or feature requests
- Tag maintainers for questions
- Be respectful and constructive

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Thank You!

Your contributions help make this platform better for the global judo community!
