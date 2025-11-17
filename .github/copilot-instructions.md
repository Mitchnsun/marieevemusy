# Copilot Instructions for Marie-Eve Musy Website

## 🎯 Project Overview

This is the professional website for Marie-Eve Musy, a journalist and actress based in Geneva. The site showcases her profile, TV presenting work in Switzerland, demos, career path, and contact information.

## 🏗️ Architecture & Technology Stack

### Core Technologies

- **Framework**: Next.js 16.0.3 with App Router and Turbopack (enabled by default)
- **Language**: TypeScript 5.9.2 with strict configuration
- **Styling**: Tailwind CSS 4.1.13
- **Runtime**: React 19.2.0
- **Package Manager**: Yarn 4.11.0

### Development Tools

- **Linting**: ESLint with comprehensive plugins for code quality, security, and accessibility
- **Formatting**: Prettier with TailwindCSS class sorting
- **Type Checking**: TypeScript compiler with strict mode

## 📁 Project Structure

```
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Homepage component
│   └── globals.css        # Global styles and Tailwind CSS imports
├── public/                # Static assets (images, videos, demos, etc.)
├── .github/               # GitHub configurations
├── eslint.config.mjs      # ESLint configuration with advanced plugins
├── next.config.ts         # Next.js configuration
├── postcss.config.mjs     # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Styling Guidelines

### Tailwind CSS Best Practices

- Use Tailwind utility classes for all styling
- Classes are automatically sorted by Prettier in logical order: layout → spacing → styling
- Prefer Tailwind utilities over custom CSS when possible
- Use responsive modifiers (`sm:`, `md:`, `lg:`, `xl:`) for responsive design
- Utilize dark mode variants (`dark:`) when applicable

### Component Structure

- Components should be functional components with TypeScript
- Use proper TypeScript interfaces for props
- Follow React 19 best practices
- Implement proper accessibility with semantic HTML and ARIA attributes

## 🔧 Code Quality Standards

### ESLint Configuration

The project uses comprehensive ESLint plugins:

- **eslint-plugin-prettier**: Integrates Prettier formatting
- **eslint-plugin-import**: Validates import/export statements
- **eslint-plugin-sonarjs**: Detects code smells and complexity issues
- **eslint-plugin-security**: Identifies security vulnerabilities
- **eslint-plugin-unicorn**: Enforces modern JavaScript practices
- **eslint-plugin-unused-imports**: Removes unused imports automatically
- **eslint-plugin-simple-import-sort**: Sorts imports consistently
- **eslint-plugin-jsx-a11y**: Ensures accessibility compliance

### Import Organization

Imports should be organized in this order:

1. React and Next.js imports
2. Third-party library imports
3. Internal component imports
4. Relative imports
5. Type-only imports (using `import type`)

### Key Rules Enforced

```js
{
  'prettier/prettier': 'error',
  'unused-imports/no-unused-imports': 'error',
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error'
}
```

## 🛠️ Development Workflow

### Available Scripts

- `yarn dev` - Development server (Turbopack enabled by default)
- `yarn build` - Production build (Turbopack enabled by default)
- `yarn start` - Start production server
- `yarn lint` - Run ESLint checks
- `yarn lint:fix` - Auto-fix ESLint issues
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check if code is properly formatted
- `yarn type-check` - TypeScript type validation

### Pre-commit Checklist

1. Run `yarn lint` to check for code quality issues
2. Run `yarn format` to ensure consistent formatting
3. Run `yarn type-check` to validate TypeScript
4. Test the application with `yarn dev`

## 🌐 Content Guidelines

### Language & Localization

- Primary language: French (site serves French-speaking audience in Switzerland)
- Use proper French typography and punctuation
- Consider bilingual content (French/English) if needed for international visibility

### Content Structure

- Focus on professional profile, media work, and career achievements
- Maintain professional and approachable tone
- Ensure accessibility for all users
- Include proper metadata for SEO
- Highlight TV presenting work and demos prominently

### Media Assets

- Optimize images and videos for web delivery
- Use Next.js `Image` component for all images
- Provide proper alt text for accessibility
- Organize media files logically in the `public/` directory
- Support high-resolution displays with appropriate image sizes

## 🔒 Security & Performance

### Security Considerations

- ESLint security plugin actively monitors for vulnerabilities
- Sanitize any user inputs (contact forms, etc.)
- Use Next.js built-in security features
- Implement proper CORS policies if needed

### Performance Guidelines

- Optimize images using Next.js `Image` component
- Implement proper loading states
- Use React 19 features like Server Components when beneficial
- Leverage Next.js caching strategies
- Optimize video delivery for demos and showreels
- Implement responsive navigation patterns:
  - Desktop: Classical navigation for quick access
  - Mobile: Optimized mobile menu for space efficiency
- Use `"use client"` directive only when needed for interactive components

## 📝 Code Contribution Guidelines

### When Making Changes

1. **Maintain Code Quality**: All code must pass ESLint checks without errors
2. **Follow Formatting**: Use Prettier for consistent code style
3. **Type Safety**: Ensure TypeScript compilation succeeds
4. **Accessibility**: Maintain WCAG compliance using jsx-a11y rules
5. **Performance**: Consider impact on bundle size and loading times

### Component Development

- Create reusable, well-typed components
- Use semantic HTML elements
- Implement proper error boundaries where needed
- Follow React best practices for hooks and state management
- Ensure accessibility compliance with ARIA attributes and semantic markup
- Test responsive behavior across different screen sizes

### File Naming Conventions

- Use `kebab-case` for directories
- Use `PascalCase` for component files
- Use `camelCase` for utility files
- Include descriptive names that reflect component purpose

## 🎭 Domain-Specific Context

### Professional Context

- **Marie-Eve Musy**: Journalist and actress based in Geneva
- **Focus**: TV presenting work in Switzerland
- **Key Content**: Professional demos, career highlights, contact information
- **Target Audience**: Media professionals, potential clients, recruiters, general public

### Target Audience

- Media producers and directors
- Casting directors
- Journalists and media professionals
- Event organizers looking for presenters
- General public interested in her work
- Swiss media industry contacts

### Content Priorities

1. **Professional Demos**: Video showcases of TV presenting work
2. **Biography**: Career path and achievements
3. **Portfolio**: Work samples and notable projects
4. **Contact Information**: Professional contact methods
5. **Media Coverage**: Press mentions and appearances

## 🚀 Deployment & Maintenance

### Deployment Platform

- Optimized for Vercel deployment
- Compatible with other Next.js hosting platforms
- Production builds use optimizations for performance

### Monitoring & Updates

- Keep dependencies updated regularly
- Monitor for security vulnerabilities
- Test thoroughly before deploying changes
- Maintain backward compatibility when possible

### Key Implementation Notes

- **Professional Design**: Clean, modern design reflecting professional media work
- **Media-First Approach**: Prioritize showcase of video demos and visual content
- **Responsive Design**: Ensure excellent experience on all devices
- **Performance**: Fast loading times, especially for media content
- **Accessibility**: Full WCAG compliance for inclusive access
- **SEO Optimization**: Proper meta tags and structured data for visibility

---

Remember: This project represents a professional's public presence. Maintain professionalism, ensure all changes enhance the user experience, and prioritize the clear presentation of Marie-Eve Musy's work and achievements.
