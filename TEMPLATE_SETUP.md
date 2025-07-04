# 🚀 Portfolio Template Setup Guide

## ✅ What's Been Done

This repository has been successfully transformed from a personal portfolio into a reusable template:

### ✨ **Template Features Ready:**

- ✅ **All personal branding removed** (names, images, achievements replaced with placeholders)
- ✅ **Generic content structure** with TODO comments for customization
- ✅ **Comprehensive README.md** with step-by-step setup instructions
- ✅ **Environment variables template** (.env.example)
- ✅ **Clean project structure** (moved from nested portfolio/ to root level)
- ✅ **Modular React components** ready for customization

### 📁 **Current Structure:**

```
portfolio-template/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   │   ├── sections/        # Portfolio sections (Hero, About, Skills, etc.)
│   │   ├── chatbot/         # AI chatbot components
│   │   └── analytics/       # Analytics dashboard
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript definitions
├── public/                  # Static assets (needs your images)
├── .env.example            # Environment variables template
├── README.md               # Complete user guide
└── package.json            # Dependencies and scripts
```

## 🛠️ **Next Steps for Users:**

### 1. **Complete Installation:**

```bash
# Install dependencies
npm install

# Or if you prefer yarn/pnpm
yarn install
# pnpm install
```

### 2. **Environment Setup:**

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your actual values:
# - Firebase configuration
# - Resend API key for email
# - OpenAI API key for chatbot
# - Your personal information
```

### 3. **Replace Personal Content:**

#### **Images (in public/ directory):**

- `profile.jpg` → Your profile picture
- `resume.pdf` → Your resume file
- `og-image.png` → Your social media preview image
- `favicon.png` → Your website icon
- Remove personal logos from `public/logos/`

#### **Update Section Components:**

**HeroSection.tsx:**

- Replace `YOUR_FIRST_NAME`, `YOUR_LAST_NAME`
- Update `YOUR_TITLE`, `YOUR_EDUCATION`, `YOUR_EXPERTISE`
- Add your LinkedIn URL and company links

**AboutSection.tsx:**

- Replace entire professional story with your journey
- Update education, companies, and achievements
- Customize skills formula and personal interests

**SkillsSection.tsx:**

- Replace skillsData with your actual skills
- Update categories, experience levels, and endorsements

**TimelineSection.tsx:**

- Add your education and work history
- Replace company logos and dates

**ProjectsSection.tsx:**

- Showcase your projects with descriptions and links
- Add project images and tech stacks

### 4. **Test Your Setup:**

```bash
# Start development server
npm run dev

# Visit http://localhost:3000
# Customize sections step by step
```

### 5. **Deploy Your Portfolio:**

```bash
# Build for production
npm run build

# Deploy to Vercel (recommended)
vercel --prod
```

## 🔧 **Key Customization Points:**

### **Essential Updates:**

1. **Personal Information:** All `YOUR_*` placeholders throughout the codebase
2. **Tour Steps:** Update `tourSteps` array in `src/app/page.tsx`
3. **Skills Data:** Complete skills object in `src/components/sections/SkillsSection.tsx`
4. **Contact Information:** Email addresses and social links

### **Optional Enhancements:**

1. **AI Chatbot:** Add OpenAI API key for intelligent conversations
2. **Google Calendar:** Enable meeting scheduling functionality
3. **Analytics:** Configure visitor tracking and engagement monitoring
4. **Custom Styling:** Update colors and branding in `tailwind.config.ts`

## 📋 **Template Checklist:**

- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured (`.env.local`)
- [ ] Profile image replaced (`public/profile.jpg`)
- [ ] Personal information updated in all sections
- [ ] Skills and experience customized
- [ ] Projects added with your work
- [ ] Contact information updated
- [ ] Resume file uploaded (`public/resume.pdf`)
- [ ] Social media links updated
- [ ] Tour steps customized
- [ ] Development server tested (`npm run dev`)
- [ ] Production build successful (`npm run build`)
- [ ] Deployed to hosting platform

## 🎯 **Features Available:**

✅ **Professional Design** - Modern, responsive interface  
✅ **AI-Powered Chatbot** - Intelligent visitor engagement  
✅ **Interactive Tour** - Guided portfolio walkthrough  
✅ **Analytics Dashboard** - Visitor tracking and insights  
✅ **Contact System** - Multi-channel contact forms  
✅ **Mobile Optimized** - Perfect on all devices  
✅ **SEO Ready** - Optimized metadata and performance

## 🚀 **You're Ready to Go!**

The portfolio template is now completely generic and ready for customization. Follow the README.md for detailed instructions, and update each section with your personal information.

**Need Help?** Check the inline TODO comments throughout the codebase for specific guidance on what to customize.

---

_Built with Next.js 14, React 18, TypeScript, TailwindCSS, and modern best practices._

# Template Setup Guide

This guide will help you quickly customize this portfolio template for your needs.

## 🎯 Quick Setup (5 minutes)

### Step 1: Update Basic Information

1. Open `src/app/layout.tsx`
2. Change "YOUR_NAME" to your actual name
3. Change "YOUR_TITLE" to your job title
4. Update the description meta tag

### Step 2: Replace Profile Image

1. Add your photo to `public/images/placeholders/`
2. Update the image path in `src/components/sections/HeroSection.tsx` (line 25)
3. Update the OG image in `src/app/og/route.tsx` if needed

### Step 3: Update Content

1. Edit each section file in `src/components/sections/`
2. Replace placeholder text with your information
3. Update links and contact information

### Step 4: Deploy

1. Push to GitHub
2. Deploy with Vercel (recommended) or your preferred platform

## 📝 Detailed Customization

### Personal Information

#### Name and Title

**File**: `src/app/layout.tsx`

```typescript
// Lines 15-16: Update these values
const siteConfig = {
  name: "YOUR_NAME", // ← Change this
  title: "YOUR_TITLE", // ← Change this
  description: "Your portfolio description",
};
```

#### Profile Image

**File**: `src/components/sections/HeroSection.tsx`

```typescript
// Line 25: Update image path
<Image
  src="/images/placeholders/pm_happy_hour_logo.jpeg"  // ← Change this
  alt="YOUR_NAME"
  width={200}
  height={200}
  className="rounded-full"
/>
```

#### Contact Information

**File**: `src/components/sections/ContactSection.tsx`

```typescript
// Update contact details
const contactInfo = {
  email: "your.email@example.com", // ← Change this
  phone: "+1 (555) 123-4567", // ← Change this
  location: "Your City, State", // ← Change this
  linkedin: "https://linkedin.com/in/yourprofile", // ← Change this
  github: "https://github.com/yourusername", // ← Change this
};
```

### Content Sections

#### Hero Section

**File**: `src/components/sections/HeroSection.tsx`

- Update the main headline
- Change the subtitle
- Modify the call-to-action button text

#### About Section

**File**: `src/components/sections/AboutSection.tsx`

- Replace the placeholder text with your story
- Update your background and experience
- Add your personal interests and values

#### Skills Section

**File**: `src/components/sections/SkillsSection.tsx`

```typescript
// Update skills array
const skills = [
  {
    category: "Technical Skills",
    items: ["Your Skill 1", "Your Skill 2", "Your Skill 3"], // ← Change these
  },
  {
    category: "Soft Skills",
    items: ["Your Skill 1", "Your Skill 2", "Your Skill 3"], // ← Change these
  },
];
```

#### Projects Section

**File**: `src/components/sections/ProjectsSection.tsx`

```typescript
// Update projects array
const projects = [
  {
    title: "Your Project Name", // ← Change this
    description: "Project description", // ← Change this
    technologies: ["Tech1", "Tech2"], // ← Change these
    link: "https://your-project.com", // ← Change this
    image: "/images/placeholders/pm_happy_hour_logo.jpeg", // ← Change this
  },
];
```

#### Experience Timeline

**File**: `src/components/sections/TimelineSection.tsx`

```typescript
// Update experience array
const experiences = [
  {
    title: "Your Job Title", // ← Change this
    company: "Your Company", // ← Change this
    period: "2023 - Present", // ← Change this
    description: "Job description", // ← Change this
    achievements: ["Achievement 1", "Achievement 2"], // ← Change these
  },
];
```

#### Testimonials

**File**: `src/components/sections/TestimonialsSection.tsx`

```typescript
// Update testimonials array
const testimonials = [
  {
    name: "Client Name", // ← Change this
    role: "Client Role", // ← Change this
    company: "Client Company", // ← Change this
    content: "Testimonial text", // ← Change this
    image: "/images/placeholders/pm_happy_hour_logo.jpeg", // ← Change this
  },
];
```

## 🎨 Styling Customization

### Colors

**File**: `tailwind.config.ts`

```typescript
// Update color scheme
colors: {
  primary: '#000000',      // ← Change to your primary color
  secondary: '#666666',    // ← Change to your secondary color
  accent: '#ffffff',       // ← Change to your accent color
}
```

### Fonts

**File**: `src/app/globals.css`

```css
/* Add custom fonts */
@import url("https://fonts.googleapis.com/css2?family=Your+Font:wght@400;700&display=swap");

/* Update font family */
body {
  font-family: "Your Font", sans-serif; /* ← Change this */
}
```

### Layout

**File**: `src/app/page.tsx`

```typescript
// Reorder sections as needed
<HeroSection />
<AboutSection />
<SkillsSection />
<ProjectsSection />
<TimelineSection />
<TestimonialsSection />
<ContactSection />
```

## ➕ Adding New Sections

### Step 1: Create Section Component

Create `src/components/sections/NewSection.tsx`:

```typescript
import React from 'react';

const NewSection = () => {
  return (
    <section id="new-section" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-black mb-8">Section Title</h2>
        {/* Your content here */}
      </div>
    </section>
  );
};

export default NewSection;
```

### Step 2: Add to Main Page

**File**: `src/app/page.tsx`

```typescript
import NewSection from '@/components/sections/NewSection';

// Add to the page component
<NewSection />
```

### Step 3: Add Navigation Link

**File**: `src/components/layout/Navigation.tsx`

```typescript
// Add to navigation items
{ name: 'New Section', href: '#new-section' }
```

## ➖ Removing Sections

### Step 1: Remove from Main Page

**File**: `src/app/page.tsx`

- Delete the import statement
- Remove the component from the JSX

### Step 2: Remove Navigation Link

**File**: `src/components/layout/Navigation.tsx`

- Remove the navigation item

### Step 3: Delete Component File

- Delete the section file from `src/components/sections/`

## 🚀 Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy automatically

### Netlify

1. Build: `npm run build`
2. Upload `.next` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`

### GitHub Pages

1. Add to `package.json`:

```json
{
  "scripts": {
    "export": "next build && next export",
    "deploy": "npm run export && touch out/.nojekyll"
  }
}
```

2. Run `npm run deploy`
3. Push `out` folder to GitHub Pages

## 🛠️ Troubleshooting

### Common Issues

**Build Errors**

- Check for syntax errors in your customizations
- Ensure all imports are correct
- Verify file paths are accurate

**Styling Issues**

- Clear browser cache
- Restart development server
- Check Tailwind classes are valid

**Image Issues**

- Ensure images are in the correct directory
- Check file paths are correct
- Verify image formats are supported

### Getting Help

1. Check the main README.md
2. Review this setup guide
3. Create a GitHub issue
4. Consider hiring a developer for complex customizations

## 🎯 Best Practices

### Content

- Keep sections concise and scannable
- Use bullet points for easy reading
- Include metrics and results
- Tell stories about your work

### Images

- Use high-quality images
- Optimize for web (compress files)
- Use consistent aspect ratios
- Add alt text for accessibility

### Performance

- Test on mobile devices
- Check loading speeds
- Optimize images
- Monitor Core Web Vitals

---

**Need more help? Check the main README.md for additional resources and AI prompts for fast customization.**
