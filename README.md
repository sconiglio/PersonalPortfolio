# 🚀 Complete Portfolio Setup Guide

**Build and deploy your professional portfolio in under 1 hour using this modern template.**

This guide walks you through every step from initial setup to live deployment, including API integrations, customization, and best practices.

## 📋 Table of Contents

- [🚀 Quick Start (5 minutes)](#-quick-start-5-minutes)
- [🔐 API Keys Setup](#-api-keys-setup)
- [🎨 Complete Customization](#-complete-customization)
- [💻 Using Cursor AI Editor](#-using-cursor-ai-editor)
- [🚀 Deployment](#-deployment)
- [📊 Advanced Features](#-advanced-features)
- [🛠️ Troubleshooting](#️-troubleshooting)

---

## 🚀 Quick Start (5 minutes)

### Prerequisites

- **Node.js 18+** ([Download here](https://nodejs.org))
- **Git** ([Download here](https://git-scm.com))
- **GitHub account** (for deployment)
- **Cursor AI Editor** ([Download here](https://cursor.com/downloads)) - AI-powered code editor for faster development

#### **Required API Accounts & Keys**

You'll need to sign up for these services to enable full functionality:

- **Firebase Account** ([Sign up here](https://console.firebase.google.com)) - For analytics and visitor tracking
- **Resend Account** ([Sign up here](https://resend.com)) - For email contact forms
- **OpenAI Account** ([Sign up here](https://platform.openai.com)) - For AI chatbot functionality
- **Google Cloud Account** ([Sign up here](https://console.cloud.google.com)) - For Google Calendar integration
- **Vercel Account** ([Sign up here](https://vercel.com)) - For deployment (optional but recommended)

### Step 1: Get the Template

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
   };
   ```

2. **Add your profile image**:
   - Place your photo in `public/images/placeholders/`
   - Update the path in `src/config/site.ts`

### Step 3: Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

---

## 🔐 API Keys Setup

Create a `.env.local` file using `.env.example` as a template. **Make sure you've signed up for all the required accounts listed in the prerequisites section above.** These services are **optional** but recommended for full functionality.

### **Firebase (Analytics & Tracking)** 🔥

Used for visitor analytics and hit counters.

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project → Register a web app
3. Copy the config values to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### **Resend (Email Service)** 📧

Used to send emails from the contact form.

1. Sign up at [Resend.com](https://resend.com)
2. Verify your sending domain
3. Copy your API key to `.env.local`:

```env
RESEND_API_KEY=your_resend_api_key_here
YOUR_EMAIL=your_verified_email@domain.com
```

### **OpenAI (AI Chatbot)** 🤖

Optional but recommended for the AI-powered contact assistant.

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Generate a new API key
3. Add to `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### **Google Calendar (Meeting Scheduler)** 📅

Used for scheduling meetings via Google Calendar.

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create/select a project and enable **Google Calendar API**
3. Go to "APIs & Services" → "Credentials"
4. Create an OAuth 2.0 Client ID (Web application)
5. Set authorized redirect URI to `https://yourdomain.com/api/auth/callback`
6. Copy credentials to `.env.local`:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_CALENDAR_ID=your_email@gmail.com
```

### **Vercel (Deployment)** ☁️

No API keys needed here. You'll add the above environment variables in Vercel's dashboard during deployment.

---

## 🎨 Complete Customization

### **Team Roles for 1-Hour Completion**

Assign these roles to your team for parallel work:

- **🎨 Frontend Lead**: Update layout, styling, and components
- **📝 Content Manager**: Replace all placeholder text and content
- **🎯 Styling Lead**: Customize colors, fonts, and visual design
- **🧪 QA Tester**: Test functionality, responsiveness, and links

### **Key Files to Edit**

| Section        | File Path                                     | What to Update                              |
| -------------- | --------------------------------------------- | ------------------------------------------- |
| **Hero**       | `src/components/sections/HeroSection.tsx`     | Name, title, profile image, CTA buttons     |
| **About**      | `src/components/sections/AboutSection.tsx`    | Your story, background, achievements        |
| **Skills**     | `src/components/sections/SkillsSection.tsx`   | Your expertise, tools, experience levels    |
| **Projects**   | `src/components/sections/ProjectsSection.tsx` | Your work, descriptions, links, screenshots |
| **Experience** | `src/components/sections/TimelineSection.tsx` | Work history, education, company logos      |
| **Contact**    | `src/components/sections/ContactSection.tsx`  | Contact methods, form fields                |

### **Site Configuration**

Update `src/config/site.ts` with your information:

```typescript
export const siteConfig = {
  name: "Your Full Name",
  title: "Your Professional Title",
  description: "Your portfolio description for SEO",
  contact: {
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    location: "Your City, State",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourhandle",
  },
  images: {
    profile: "/images/placeholders/your-photo.jpg",
    og: "/og-image.png",
  },
};
```

### **Styling Customization**

#### **Change Colors**

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

#### **Add Custom Fonts**

Edit `src/app/globals.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Your+Font:wght@400;700&display=swap");

body {
  font-family: "Your Font", sans-serif;
}
```

### **AI-Powered Customization Prompts**

Use these prompts with your AI assistant for rapid customization:

#### **Content Updates**

```
"Update the portfolio content in [SECTION_FILE] to reflect my background as a [YOUR_ROLE] with experience in [YOUR_SKILLS]. Include my projects [PROJECT_NAMES] and education at [SCHOOL_NAMES]."
```

#### **Styling Changes**

```
"Modify the color scheme in [COMPONENT_FILE] to use [COLOR_PALETTE] instead of the current black/white theme."
```

#### **Adding Features**

```
"Add a new section to showcase [FEATURE_TYPE] in the portfolio. Create the component and integrate it into the main page."
```

---

## 💻 Using Cursor AI Editor

[Cursor](https://cursor.com) is an AI-powered code editor that can accelerate your development. **Make sure you've installed Cursor from the prerequisites section above.**

### **Setup Cursor**

1. **Download Cursor**: Visit [cursor.com/downloads](https://www.cursor.com/downloads) (if not already installed)
2. **Verify Student Status**: Go to [cursor.com/students](https://cursor.com/students) for free Pro access
3. **Open Project**: File → Open Folder → Select your portfolio folder

### **AI Commands in Cursor**

After opening your project, use these commands:

```bash
# Analyze entire codebase
/analyze

# Ask questions about your code
"How do I change the hero section background color?"

# Make specific changes
"Update the hero section to include my name 'John Doe' and title 'Product Manager'"
```

### **Example Cursor Prompts**

- _"Add a hero section welcome message for a product manager named Alice, using bullet points."_
- _"Change the color scheme from black/white to blue/gray theme."_
- _"Add a new testimonials section with 3 customer reviews."_

---

## 🚀 Deployment

### **Deploy to Vercel (Recommended)**

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and deploy

3. **Add Environment Variables**:
   - In Vercel dashboard → Project Settings → Environment Variables
   - Add all your `.env.local` variables (Firebase, Resend, OpenAI, Google)

4. **Deploy**:
   - Vercel will automatically deploy your site
   - Your portfolio will be live at `https://your-portfolio.vercel.app`

### **Alternative Deployments**

#### **Netlify**

```bash
npm run build
# Connect GitHub repo to Netlify
# Set build command: npm run build
# Set publish directory: .next
```

#### **GitHub Pages**

```bash
# Add to package.json
"export": "next build && next export",
"deploy": "npm run export && touch out/.nojekyll"

npm run deploy
```

---

## 📊 Advanced Features

### **Analytics Dashboard**

Access at `/analytics` after setting up Firebase:

- Visitor tracking
- Page views
- Geographic data
- Device analytics

### **AI Chatbot**

Configure in `src/app/api/chatbot/route.ts`:

- Custom responses
- Personality settings
- Integration with contact form

### **Meeting Scheduler**

Set up Google Calendar integration:

- Automatic meeting scheduling
- Calendar availability
- Email confirmations

### **SEO Optimization**

Update in `src/app/layout.tsx`:

```typescript
export const metadata = {
  title: "Your Name - Your Title",
  description: "Your portfolio description",
  keywords: ["your", "keywords", "here"],
  openGraph: {
    title: "Your Name - Portfolio",
    description: "Your description",
    images: ["/og-image.png"],
  },
};
```

---

## 🛠️ Troubleshooting

### **Common Issues**

#### **Portfolio Not Loading**

```bash
# Check dependencies
npm install

# Verify Node.js version
node --version  # Should be 18+

# Clear cache
rm -rf .next && npm run dev
```

#### **Styling Issues**

```bash
# Check Tailwind
npm run build

# Verify CSS imports in globals.css
# Check browser console for errors
```

#### **API Errors**

- Verify all environment variables are set in `.env.local`
- Check API key permissions and quotas
- Ensure services are properly configured

#### **Deployment Problems**

- Check build logs in Vercel dashboard
- Verify all environment variables are set in Vercel
- Ensure domain and SSL settings are correct

### **Development Commands**

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

### **Pre-Launch Checklist**

- [ ] **Personal Information**: All placeholders replaced
- [ ] **Profile Image**: Professional photo uploaded
- [ ] **Content**: All sections updated with your info
- [ ] **Links**: All social and project links working
- [ ] **Contact**: Contact form tested and working
- [ ] **Mobile**: Portfolio looks good on mobile
- [ ] **Performance**: Page loads quickly (Lighthouse)
- [ ] **SEO**: Meta tags and descriptions updated
- [ ] **Analytics**: Tracking configured (if using)
- [ ] **Domain**: Custom domain configured (optional)
- [ ] **SSL**: HTTPS enabled
- [ ] **Testing**: All features tested thoroughly

---

## 📚 Resources & Support

### **Documentation**

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

### **Getting Help**

- **GitHub Issues**: Create detailed issue descriptions
- **GitHub Discussions**: Ask questions and share solutions
- **Community**: Join developer communities for support

### **Best Practices**

#### **Content Strategy**

- Keep sections scannable in 30 seconds
- Show results, metrics, and impact
- Use visuals (screenshots, diagrams, videos)
- Tell stories behind your work
- Update content regularly

#### **Technical Optimization**

- Optimize images (WebP format, compression)
- Monitor Core Web Vitals
- Ensure mobile-first design
- Follow accessibility guidelines (WCAG)
- Add proper meta descriptions and alt text

---

## 🎯 Success Metrics

After deployment, track these metrics:

- **Page Load Speed**: < 3 seconds (Lighthouse)
- **Mobile Performance**: 90+ score
- **SEO Score**: 90+ score
- **Accessibility**: 90+ score
- **Contact Form**: 100% working
- **All Links**: 0 broken links

---

**Made with ❤️ for the developer community**

_This template is designed to help you showcase your work professionally and effectively. Customize it to reflect your unique style and experience!_

---

## 📄 License

MIT License - feel free to use this template for your own projects!

**Happy building! 🚀**
