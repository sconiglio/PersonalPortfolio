# 🚀 Modern Portfolio Template

A clean, professional portfolio template built with Next.js, React, and Tailwind CSS. Perfect for product managers, developers, designers, and anyone looking to showcase their work with a modern, minimalist design.

## ✨ Features

- **🎨 Modern Design**: Clean, professional layout with black, white, and gray color scheme
- **📱 Responsive**: Mobile-first design that works perfectly on all devices
- **⚡ Fast Performance**: Built with Next.js 14 for optimal speed and SEO
- **🔧 Easy Customization**: Simple configuration file and modular components
- **📊 SEO Optimized**: Built-in meta tags, Open Graph, and structured data
- **🤖 AI Chatbot**: Optional intelligent contact assistant
- **📈 Analytics Ready**: Optional visitor tracking and insights dashboard
- **🎯 Interactive Tour**: Guided portfolio walkthrough for visitors
- **📧 Contact Forms**: Multiple contact options including meeting scheduling

## 🚀 Quick Start (5 minutes)

### Prerequisites

- Node.js 18+ installed
- Git installed
- A GitHub account (for deployment)

### Step 1: Clone and Install

```bash
# Clone the template
git clone https://github.com/LawrenceHua/modern-portfolio-template.git
cd modern-portfolio-template

# Install dependencies
npm install
```

### Step 2: Basic Configuration

1. **Update your information** in `src/config/site.ts`:

   ```typescript
   export const siteConfig = {
     name: "Your Full Name",
     title: "Your Job Title",
     description: "Your portfolio description",
     contact: {
       email: "your.email@example.com",
       phone: "+1 (555) 123-4567",
       location: "Your City, State",
       linkedin: "https://linkedin.com/in/yourprofile",
       github: "https://github.com/yourusername",
     },
     // ... more configuration
   };
   ```

2. **Add your profile image**:
   - Place your photo in `public/images/placeholders/`
   - Update the path in `src/config/site.ts`:
   ```typescript
   images: {
     profile: "/images/placeholders/your-photo.jpg",
   }
   ```

### Step 3: Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 🎨 Complete Customization Guide

### 1. Personal Information Setup

#### Update Basic Details

- **Name & Title**: Edit `src/config/site.ts` (lines 5-7)
- **Contact Info**: Update all contact fields in `src/config/site.ts`
- **Social Links**: Add your LinkedIn, GitHub, Twitter, etc.

#### Replace Images

```bash
# Add these files to public/images/placeholders/
your-profile-photo.jpg     # Your professional headshot
your-resume.pdf           # Your resume file
your-og-image.png         # Social media preview image
```

### 2. Content Sections Customization

Each section is modular and easy to edit:

#### Hero Section (`src/components/sections/HeroSection.tsx`)

- Update headline and subtitle
- Change profile image
- Modify call-to-action buttons
- Customize animated text gallery

#### About Section (`src/components/sections/AboutSection.tsx`)

- Write your professional story
- Add your background and expertise
- Include key achievements and highlights

#### Skills Section (`src/components/sections/SkillsSection.tsx`)

- Replace skills data with your expertise
- Organize by categories (Technical, Business, Tools)
- Add experience levels and endorsements

#### Projects Section (`src/components/sections/ProjectsSection.tsx`)

- Showcase your best work
- Include project descriptions, technologies, and links
- Add project screenshots or demos

#### Experience Timeline (`src/components/sections/TimelineSection.tsx`)

- Add your work history
- Include education background
- Add company logos and achievements

#### Contact Section (`src/components/sections/ContactSection.tsx`)

- Update contact form fields
- Add your preferred contact methods
- Configure email settings

### 3. Adding/Removing Sections

#### To Add a New Section:

1. **Create the component**:

   ```bash
   # Create new section file
   touch src/components/sections/NewSection.tsx
   ```

2. **Add to main page** (`src/app/page.tsx`):

   ```typescript
   import { NewSection } from "@/components/sections/NewSection";

   // Add to the page layout
   <NewSection />
   ```

3. **Add navigation** (`src/components/layout/Navigation.tsx`):
   ```typescript
   const navItems = [
     // ... existing items
     { name: "New Section", href: "#new-section" },
   ];
   ```

#### To Remove a Section:

1. Remove the import and component from `src/app/page.tsx`
2. Remove the navigation link from `src/components/layout/Navigation.tsx`
3. Delete the section file if no longer needed

### 4. Styling and Theme Customization

#### Color Scheme

Edit `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#your-primary-color",
        secondary: "#your-secondary-color",
        accent: "#your-accent-color",
      },
    },
  },
};
```

#### Global Styles

Modify `src/app/globals.css` for:

- Custom fonts
- Global animations
- Base styling overrides

#### Component-Specific Styling

Each component uses Tailwind classes that can be easily modified:

- Background colors: `bg-*` classes
- Text colors: `text-*` classes
- Spacing: `p-*`, `m-*`, `gap-*` classes
- Typography: `text-*`, `font-*` classes

### 5. Advanced Features Setup

#### AI Chatbot (Optional)

1. Get OpenAI API key from [OpenAI](https://platform.openai.com)
2. Add to `.env.local`:
   ```env
   OPENAI_API_KEY=your-api-key-here
   ```
3. Customize chatbot responses in `src/app/api/chatbot/route.ts`

#### Analytics Dashboard (Optional)

1. Set up Google Analytics or similar
2. Configure tracking in `src/lib/analytics.ts`
3. Access dashboard at `/analytics`

#### Email Contact (Optional)

1. Get Resend API key from [Resend](https://resend.com)
2. Add to `.env.local`:
   ```env
   RESEND_API_KEY=your-api-key-here
   ```
3. Configure email templates in `src/app/api/contact/route.ts`

## 🚀 Deployment Guide

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically

3. **Configure Environment Variables** (if using advanced features):
   - Add your API keys in Vercel dashboard
   - Set production environment variables

### Deploy to Netlify

1. **Build the project**:

   ```bash
   npm run build
   ```

2. **Deploy**:
   - Connect your GitHub repo to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `.next`

### Deploy to GitHub Pages

1. **Add export script** to `package.json`:

   ```json
   {
     "scripts": {
       "export": "next build && next export",
       "deploy": "npm run export && touch out/.nojekyll"
     }
   }
   ```

2. **Deploy**:
   ```bash
   npm run deploy
   git add out/
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

## 🛠️ Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run test         # Run tests

# Utilities
npm run type-check   # Check TypeScript types
npm run clean        # Clean build files
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Main layout with meta tags
│   ├── page.tsx           # Home page with all sections
│   ├── globals.css        # Global styles
│   ├── api/               # API routes
│   │   ├── chatbot/       # AI chatbot API
│   │   ├── contact/       # Contact form API
│   │   └── analytics/     # Analytics API
│   └── og/                # Open Graph image generation
├── components/
│   ├── sections/          # Portfolio sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── TimelineSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx
│   ├── layout/            # Navigation and layout
│   ├── chatbot/           # AI chatbot components
│   ├── analytics/         # Analytics dashboard
│   └── providers/         # React context providers
├── config/
│   └── site.ts           # Site configuration
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript definitions
```

## 🎯 AI-Powered Customization

Use these prompts with your AI assistant for fast customization:

### Content Updates

```
"Update the portfolio content in [SECTION_FILE] to reflect my background as a [YOUR_ROLE] with experience in [YOUR_SKILLS]. Include my projects [PROJECT_NAMES] and education at [SCHOOL_NAMES]."
```

### Styling Changes

```
"Modify the color scheme in [COMPONENT_FILE] to use [COLOR_PALETTE] instead of the current black/white theme."
```

### Adding Features

```
"Add a new section to showcase [FEATURE_TYPE] in the portfolio. Create the component and integrate it into the main page."
```

### SEO Optimization

```
"Optimize the SEO for my portfolio by updating meta tags, adding structured data, and improving page titles for better search engine visibility."
```

## 📋 Pre-Launch Checklist

- [ ] **Personal Information**: All placeholders replaced with your info
- [ ] **Profile Image**: Professional photo uploaded and linked
- [ ] **Content**: All sections updated with your information
- [ ] **Links**: All social and project links working
- [ ] **Contact**: Contact form tested and working
- [ ] **Mobile**: Portfolio looks good on mobile devices
- [ ] **Performance**: Page loads quickly (use Lighthouse)
- [ ] **SEO**: Meta tags and descriptions updated
- [ ] **Analytics**: Tracking configured (if using)
- [ ] **Domain**: Custom domain configured (optional)
- [ ] **SSL**: HTTPS enabled
- [ ] **Testing**: All features tested thoroughly

## 🎯 Best Practices

### Content Strategy

- **Keep it concise**: Each section scannable in 30 seconds
- **Show results**: Include metrics, outcomes, and impact
- **Use visuals**: Add screenshots, diagrams, or videos
- **Tell stories**: Explain the "why" behind your work
- **Update regularly**: Keep content fresh and current

### Technical Optimization

- **Optimize images**: Use WebP format and compress images
- **Test performance**: Monitor Core Web Vitals
- **Mobile-first**: Ensure perfect mobile experience
- **Accessibility**: Follow WCAG guidelines
- **SEO**: Add meta descriptions and alt text

### Common Customizations

**Change Color Scheme**:

```typescript
// In tailwind.config.ts
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

**Add Custom Fonts**:

```css
/* In globals.css */
@import url("https://fonts.googleapis.com/css2?family=Your+Font:wght@400;700&display=swap");
```

**Modify Layout**:

```typescript
// In page.tsx - reorder sections as needed
<HeroSection />
<AboutSection />
<SkillsSection />
// ... etc
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

MIT License - feel free to use this template for your own projects!

## 🆘 Support & Help

### Common Issues

**Portfolio not loading**:

- Check if all dependencies are installed: `npm install`
- Verify Node.js version is 18+: `node --version`
- Clear cache: `rm -rf .next && npm run dev`

**Styling issues**:

- Check Tailwind CSS is working: `npm run build`
- Verify CSS imports in `globals.css`
- Check browser console for errors

**Deployment problems**:

- Ensure all environment variables are set
- Check build logs for errors
- Verify domain and SSL settings

### Getting Help

- **Documentation**: Check `QUICK_START.md` and `TEMPLATE_SETUP.md`
- **Issues**: Create a GitHub issue with detailed description
- **Questions**: Use GitHub Discussions
- **Custom Development**: Consider hiring a developer for complex customizations

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

**Made with ❤️ for the developer community**

_This template is designed to help you showcase your work professionally and effectively. Customize it to reflect your unique style and experience!_
