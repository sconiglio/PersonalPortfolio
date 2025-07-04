# 🚀 Portfolio Template Setup Guide

Complete guide for customizing this portfolio template for your professional needs.

## ✅ What's Been Done

This repository has been successfully transformed from a personal portfolio into a reusable template:

### ✨ **Template Features Ready:**

- ✅ **All personal branding removed** (names, images, achievements replaced with placeholders)
- ✅ **Generic content structure** with TODO comments for customization
- ✅ **Comprehensive documentation** with step-by-step setup instructions
- ✅ **Environment variables template** (.env.example)
- ✅ **Clean project structure** (modular components and organized files)
- ✅ **Neutral color scheme** (black, white, gray only)
- ✅ **Placeholder images** ready for replacement

### 📁 **Current Structure:**

```
portfolio-template/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Main layout with meta tags
│   │   ├── page.tsx         # Home page with all sections
│   │   ├── globals.css      # Global styles
│   │   ├── api/             # API routes
│   │   │   ├── chatbot/     # AI chatbot API
│   │   │   ├── contact/     # Contact form API
│   │   │   └── analytics/   # Analytics API
│   │   └── og/              # Open Graph image generation
│   ├── components/
│   │   ├── sections/        # Portfolio sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── TimelineSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── layout/          # Navigation and layout
│   │   ├── chatbot/         # AI chatbot components
│   │   ├── analytics/       # Analytics dashboard
│   │   └── providers/       # React context providers
│   ├── config/
│   │   └── site.ts          # Site configuration
│   ├── lib/                 # Utility functions
│   ├── hooks/               # Custom React hooks
│   └── types/               # TypeScript definitions
├── public/
│   └── images/
│       └── placeholders/    # Placeholder images
├── .env.example            # Environment variables template
├── README.md               # Complete user guide
├── QUICK_START.md          # 5-minute setup guide
└── package.json            # Dependencies and scripts
```

## 🛠️ **Complete Setup Process**

### Phase 1: Initial Setup

#### 1. **Installation and Dependencies**

```bash
# Clone the repository
git clone https://github.com/LawrenceHua/modern-portfolio-template.git
cd modern-portfolio-template

# Install dependencies
npm install

# Verify installation
npm run dev
```

**Expected output**: Development server starts at `http://localhost:3000`

#### 2. **Environment Configuration**

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your actual values
nano .env.local
```

**Required environment variables** (if using advanced features):

```env
# Basic Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# OpenAI (for AI chatbot)
OPENAI_API_KEY=your-openai-api-key

# Resend (for email contact)
RESEND_API_KEY=your-resend-api-key

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Firebase (for analytics dashboard)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

### Phase 2: Content Customization

#### 3. **Update Site Configuration**

Edit `src/config/site.ts` with your information:

```typescript
export const siteConfig = {
  // Basic Information
  name: "Your Full Name",
  title: "Your Professional Title",
  description: "Your portfolio description for SEO",

  // Contact Information
  contact: {
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    location: "Your City, State",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourhandle",
  },

  // Social Media
  social: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourhandle",
    instagram: "https://instagram.com/yourhandle",
    youtube: "https://youtube.com/@yourchannel",
  },

  // Images
  images: {
    profile: "/images/placeholders/your-photo.jpg",
    og: "/og-image.png",
    favicon: "/favicon.png",
  },

  // SEO
  seo: {
    domain: "https://yourdomain.com",
    keywords: ["Your Name", "Your Title", "Your Skills", "Portfolio"],
    googleVerification: "your-google-verification-code",
  },
};
```

#### 4. **Replace Images and Assets**

**Required images to replace:**

```bash
# Add these files to public/images/placeholders/
your-profile-photo.jpg     # Professional headshot (400x400px)
your-resume.pdf           # Your resume file
your-og-image.png         # Social media preview (1200x630px)
your-favicon.png          # Website icon (32x32px)
```

**Image specifications:**

- **Profile photo**: 400x400px, JPG/PNG, under 500KB
- **OG image**: 1200x630px, JPG/PNG, under 1MB
- **Favicon**: 32x32px, PNG, under 50KB
- **Resume**: PDF format, under 5MB

#### 5. **Customize Content Sections**

**Hero Section** (`src/config/site.ts`):

```typescript
hero: {
  headline: "Hi, I'm Your Name",
  subtitle: "I help companies build better products",
  description: "Your professional summary and value proposition",
  ctaText: "View My Work",
  ctaLink: "#projects",
},
```

**About Section** (`src/config/site.ts`):

```typescript
about: {
  title: "About Me",
  content: `Your professional story and background...`,
  highlights: [
    "5+ years in your field",
    "Led teams of 10+ people",
    "Increased efficiency by 40%",
    "Launched 3 successful projects",
  ],
},
```

**Skills Section** (`src/config/site.ts`):

```typescript
skills: [
  {
    category: "Technical Skills",
    items: [
      "Your Technical Skill 1",
      "Your Technical Skill 2",
      "Your Technical Skill 3",
    ],
  },
  {
    category: "Soft Skills",
    items: [
      "Leadership",
      "Communication",
      "Problem Solving",
      "Strategic Thinking",
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      "Tool 1",
      "Tool 2",
      "Tool 3",
      "Platform 1",
    ],
  },
],
```

**Projects Section** (`src/config/site.ts`):

```typescript
projects: [
  {
    title: "Your Project Name",
    description: "Detailed description of your project, its impact, and your role",
    technologies: ["Technology 1", "Technology 2", "Technology 3"],
    link: "https://your-project.com",
    image: "/images/placeholders/pm_happy_hour_logo.jpeg",
  },
  // Add more projects...
],
```

**Experience Timeline** (`src/config/site.ts`):

```typescript
experience: [
  {
    title: "Your Job Title",
    company: "Company Name",
    period: "2023 - Present",
    description: "Your role and responsibilities",
    achievements: [
      "Specific achievement with metrics",
      "Another achievement with impact",
      "Third achievement with results",
    ],
  },
  // Add more experience...
],
```

**Testimonials** (`src/config/site.ts`):

```typescript
testimonials: [
  {
    name: "Client Name",
    role: "Client Role",
    company: "Client Company",
    content: "Their testimonial about your work",
    image: "/images/placeholders/pm_happy_hour_logo.jpeg",
  },
  // Add more testimonials...
],
```

### Phase 3: Advanced Customization

#### 6. **Tour Steps Customization**

Update the tour steps in `src/app/page.tsx`:

```typescript
const tourSteps = [
  {
    target: "#hero",
    content: "Welcome to my portfolio! This is where I introduce myself.",
    position: "bottom",
  },
  {
    target: "#about",
    content: "Learn more about my background and expertise.",
    position: "top",
  },
  // Add more tour steps...
];
```

#### 7. **Navigation Customization**

Edit `src/components/layout/Navigation.tsx`:

```typescript
const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#timeline" },
  { name: "Contact", href: "#contact" },
];
```

#### 8. **Styling Customization**

**Color Scheme** (`tailwind.config.ts`):

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

**Custom Fonts** (`src/app/globals.css`):

```css
@import url("https://fonts.googleapis.com/css2?family=Your+Font:wght@400;700&display=swap");

body {
  font-family: "Your Font", sans-serif;
}
```

### Phase 4: Testing and Validation

#### 9. **Local Testing**

```bash
# Start development server
npm run dev

# Test all features
npm run build
npm run lint
npm run test
```

**Testing checklist:**

- [ ] Portfolio loads correctly at `http://localhost:3000`
- [ ] All sections display your content
- [ ] Images load properly
- [ ] Links work correctly
- [ ] Mobile responsiveness
- [ ] Contact form functionality
- [ ] AI chatbot (if enabled)
- [ ] Analytics tracking (if enabled)

#### 10. **Performance Optimization**

```bash
# Check performance
npm run build
# Review build output for optimization opportunities

# Test with Lighthouse
# Open Chrome DevTools > Lighthouse > Generate report
```

**Performance targets:**

- **Lighthouse Score**: 90+ for all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Phase 5: Deployment

#### 11. **Pre-Deployment Checklist**

- [ ] All personal information updated
- [ ] Images replaced and optimized
- [ ] Content customized
- [ ] Links tested and working
- [ ] Mobile responsiveness verified
- [ ] Performance optimized
- [ ] Environment variables configured
- [ ] Build successful (`npm run build`)

#### 12. **Deploy to Production**

**Option A: Vercel (Recommended)**

```bash
# Push to GitHub
git add .
git commit -m "Portfolio customization complete"
git push origin main

# Deploy with Vercel
npx vercel --prod
```

**Option B: Netlify**

```bash
# Build for production
npm run build

# Deploy to Netlify
# Upload .next folder or connect GitHub repository
```

**Option C: GitHub Pages**

```bash
# Add export script to package.json
{
  "scripts": {
    "export": "next build && next export",
    "deploy": "npm run export && touch out/.nojekyll"
  }
}

# Deploy
npm run deploy
git add out/
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## 🔧 **Advanced Features Setup**

### AI Chatbot Configuration

1. **Get OpenAI API Key**:
   - Sign up at [OpenAI](https://platform.openai.com)
   - Create API key in dashboard
   - Add to `.env.local`:

   ```env
   OPENAI_API_KEY=your-api-key-here
   ```

2. **Customize Chatbot** (`src/app/api/chatbot/route.ts`):
   ```typescript
   const systemPrompt = `You are a helpful assistant for [Your Name], a [Your Title]. 
   Help visitors learn about [Your Name]'s work and experience.`;
   ```

### Analytics Dashboard Setup

1. **Google Analytics**:
   - Create GA4 property
   - Add tracking ID to `.env.local`:

   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

2. **Firebase Setup** (for advanced analytics):
   - Create Firebase project
   - Add configuration to `.env.local`
   - Configure in `src/lib/firebase.ts`

### Email Contact Setup

1. **Resend Configuration**:
   - Sign up at [Resend](https://resend.com)
   - Get API key
   - Add to `.env.local`:

   ```env
   RESEND_API_KEY=your-api-key-here
   ```

2. **Email Templates** (`src/app/api/contact/route.ts`):
   ```typescript
   const emailContent = `
     New contact form submission from ${name}
     Email: ${email}
     Message: ${message}
   `;
   ```

## 📋 **Complete Customization Checklist**

### Basic Setup

- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured (`.env.local`)
- [ ] Development server running (`npm run dev`)

### Content Customization

- [ ] Site configuration updated (`src/config/site.ts`)
- [ ] Profile image replaced (`public/images/placeholders/`)
- [ ] Hero section customized
- [ ] About section personalized
- [ ] Skills section updated
- [ ] Projects section populated
- [ ] Experience timeline added
- [ ] Testimonials included
- [ ] Contact information updated

### Advanced Features

- [ ] AI chatbot configured (optional)
- [ ] Analytics tracking set up (optional)
- [ ] Email contact working (optional)
- [ ] Tour steps customized
- [ ] Navigation updated
- [ ] Styling personalized

### Testing & Deployment

- [ ] Local testing completed
- [ ] Mobile responsiveness verified
- [ ] Performance optimized
- [ ] Build successful (`npm run build`)
- [ ] Deployed to production
- [ ] Domain configured (optional)
- [ ] SSL certificate active

## 🎯 **Features Available**

✅ **Professional Design** - Modern, responsive interface  
✅ **AI-Powered Chatbot** - Intelligent visitor engagement  
✅ **Interactive Tour** - Guided portfolio walkthrough  
✅ **Analytics Dashboard** - Visitor tracking and insights  
✅ **Contact System** - Multi-channel contact forms  
✅ **Mobile Optimized** - Perfect on all devices  
✅ **SEO Ready** - Optimized metadata and performance  
✅ **Fast Performance** - Optimized for speed  
✅ **Accessibility** - WCAG compliant  
✅ **Customizable** - Easy to modify and extend

## 🚀 **You're Ready to Go!**

The portfolio template is now completely customized and ready for professional use.

**Next steps:**

1. Share your portfolio URL
2. Add to your LinkedIn profile
3. Include in job applications
4. Keep content updated
5. Monitor analytics (if enabled)

**Need Help?**

- Check `README.md` for comprehensive documentation
- See `QUICK_START.md` for fast setup
- Create GitHub issues for bugs
- Use GitHub Discussions for questions

---

**Built with Next.js 14, React 18, TypeScript, TailwindCSS, and modern best practices.**

_This template is designed to help you showcase your work professionally and effectively. Customize it to reflect your unique style and experience!_
