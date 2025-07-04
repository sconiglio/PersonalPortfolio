# 🚀 Quick Start Guide

Get your portfolio up and running in **5 minutes** with this step-by-step guide!

## ⚡ Prerequisites

Before you start, make sure you have:

- ✅ Node.js 18+ installed (`node --version`)
- ✅ Git installed (`git --version`)
- ✅ A GitHub account (for deployment)

## 📋 Step-by-Step Setup

### Step 1: Clone and Install

```bash
# Clone the template
git clone https://github.com/LawrenceHua/modern-portfolio-template.git
cd modern-portfolio-template

# Install dependencies
npm install
```

### Step 2: Update Your Basic Information

Open `src/config/site.ts` and update these essential fields:

```typescript
export const siteConfig = {
  // Basic Information
  name: "Your Full Name", // ← Replace with your name
  title: "Your Job Title", // ← Replace with your title
  description: "Your portfolio description here",

  // Contact Information
  contact: {
    email: "your.email@example.com", // ← Your email
    phone: "+1 (555) 123-4567", // ← Your phone
    location: "Your City, State", // ← Your location
    linkedin: "https://linkedin.com/in/yourprofile", // ← Your LinkedIn
    github: "https://github.com/yourusername", // ← Your GitHub
    twitter: "https://twitter.com/yourhandle", // ← Your Twitter
  },

  // Social Media
  social: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourhandle",
    instagram: "https://instagram.com/yourhandle",
    youtube: "https://youtube.com/@yourchannel",
  },
};
```

### Step 3: Add Your Profile Image

1. **Add your photo** to `public/images/placeholders/`
2. **Update the image path** in `src/config/site.ts`:

```typescript
images: {
  profile: "/images/placeholders/your-photo.jpg",  // ← Your photo filename
  og: "/og-image.png",
  favicon: "/favicon.png",
},
```

**Recommended image specifications:**

- **Format**: JPG or PNG
- **Size**: 400x400 pixels minimum
- **File size**: Under 500KB
- **Style**: Professional headshot with good lighting

### Step 4: Update Content Sections

Edit these sections in `src/config/site.ts`:

#### Hero Section

```typescript
hero: {
  headline: "Hi, I'm Your Name",
  subtitle: "I help companies build better products",
  description: "Your professional summary here",
  ctaText: "View My Work",
  ctaLink: "#projects",
},
```

#### About Section

```typescript
about: {
  title: "About Me",
  content: `Your professional story here...`,
  highlights: [
    "5+ years in your field",
    "Led teams of 10+ people",
    "Increased efficiency by 40%",
    "Launched 3 successful projects",
  ],
},
```

#### Skills Section

```typescript
skills: [
  {
    category: "Technical Skills",
    items: [
      "Your Skill 1",
      "Your Skill 2",
      "Your Skill 3",
    ],
  },
  {
    category: "Soft Skills",
    items: [
      "Leadership",
      "Communication",
      "Problem Solving",
    ],
  },
],
```

#### Projects Section

```typescript
projects: [
  {
    title: "Your Project Name",
    description: "Description of your project and its impact",
    technologies: ["Tech 1", "Tech 2", "Tech 3"],
    link: "https://your-project.com",
    image: "/images/placeholders/pm_happy_hour_logo.jpeg",
  },
  // Add more projects...
],
```

#### Experience Timeline

```typescript
experience: [
  {
    title: "Your Job Title",
    company: "Company Name",
    period: "2023 - Present",
    description: "Your role description",
    achievements: [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3",
    ],
  },
  // Add more experience...
],
```

### Step 5: Test Your Portfolio

```bash
# Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio!

**What to check:**

- ✅ Your name and title appear correctly
- ✅ Profile image loads properly
- ✅ All sections display your content
- ✅ Links work correctly
- ✅ Mobile view looks good

### Step 6: Deploy Your Portfolio

#### Option A: Deploy to Vercel (Recommended)

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Deploy with Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - Click "New Project"
   - Import your repository
   - Deploy automatically

#### Option B: Deploy to Netlify

1. **Build the project**:

   ```bash
   npm run build
   ```

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `.next` folder
   - Or connect your GitHub repository

## 🎯 Pro Tips for Success

### Content Best Practices

- **Keep it concise**: Each section should be scannable in 30 seconds
- **Show results**: Include metrics, outcomes, and impact in your projects
- **Use action verbs**: "Led", "Developed", "Increased", "Launched"
- **Add your personality**: Make it uniquely yours
- **Include visuals**: Add project screenshots when possible

### Technical Tips

- **Test on mobile**: Make sure it looks great on phones
- **Optimize images**: Compress photos to reduce load time
- **Check links**: Ensure all social and project links work
- **Update regularly**: Keep your portfolio current

### Common Customizations

#### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

#### Add Custom Fonts

Edit `src/app/globals.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Your+Font:wght@400;700&display=swap");
```

#### Reorder Sections

Edit `src/app/page.tsx` to change the order of sections:

```typescript
<HeroSection />
<AboutSection />
<SkillsSection />
<ProjectsSection />
// ... etc
```

## 🔧 Advanced Features (Optional)

### AI Chatbot Setup

1. Get OpenAI API key from [OpenAI](https://platform.openai.com)
2. Create `.env.local` file:
   ```env
   OPENAI_API_KEY=your-api-key-here
   ```
3. Customize chatbot responses in `src/app/api/chatbot/route.ts`

### Analytics Setup

1. Set up Google Analytics
2. Configure tracking in `src/lib/analytics.ts`
3. Access dashboard at `/analytics`

### Email Contact Setup

1. Get Resend API key from [Resend](https://resend.com)
2. Add to `.env.local`:
   ```env
   RESEND_API_KEY=your-api-key-here
   ```

## 🆘 Troubleshooting

### Common Issues

**Portfolio not loading**:

```bash
# Clear cache and restart
rm -rf .next
npm run dev
```

**Styling issues**:

```bash
# Rebuild Tailwind CSS
npm run build
```

**Image not showing**:

- Check file path in `src/config/site.ts`
- Ensure image is in `public/images/placeholders/`
- Verify file extension matches exactly

**Deployment problems**:

- Check build logs for errors
- Ensure all environment variables are set
- Verify domain settings

### Getting Help

- **Documentation**: Check the main `README.md` for detailed instructions
- **Template Setup**: See `TEMPLATE_SETUP.md` for advanced customization
- **Issues**: Create a GitHub issue with detailed description
- **Questions**: Use GitHub Discussions

## 📋 Quick Checklist

Before launching, verify:

- [ ] Your name and title are updated
- [ ] Profile image is uploaded and linked
- [ ] All sections have your content
- [ ] Social media links work
- [ ] Contact information is correct
- [ ] Mobile view looks good
- [ ] All links are working
- [ ] Portfolio loads quickly
- [ ] You've tested the contact form

## 🚀 You're Ready!

Your portfolio is now live and ready to showcase your work!

**Next steps:**

1. Share your portfolio URL
2. Add it to your LinkedIn profile
3. Include it in job applications
4. Keep it updated with new projects

---

**Need more help?** Check the main `README.md` for comprehensive documentation and advanced customization options.

**Made with ❤️ for the developer community**
