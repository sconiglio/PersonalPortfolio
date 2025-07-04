# 🚀 Modern Portfolio Template

A sophisticated, modern portfolio website template featuring advanced AI integrations, interactive tours, beautiful animations, and comprehensive analytics. Built with cutting-edge technologies and designed to impress recruiters and potential collaborators.

**Perfect for**: Product Managers, Software Engineers, Data Scientists, Designers, and other tech professionals looking to showcase their work with a modern, AI-powered portfolio.

## ✨ Key Features

### 🏗️ **Modular Architecture**

- **Clean, Maintainable Code**: Well-organized TypeScript modules with reusable components
- **Centralized State Management**: Custom hooks managing all application state
- **Performance Optimized**: React 18 optimizations with smart loading states
- **Type Safety**: Full TypeScript coverage with strict mode

### 🤖 **AI-Powered Chatbot**

- **OpenAI GPT Integration**: Intelligent conversations about your background and projects
- **Smart Contact Intent Detection**: Automatically processes contact requests from natural conversation
- **Multi-Channel Contact**: Email, calendar scheduling, and direct messaging
- **Mobile-Optimized Interface**: Professional dark theme for mobile devices

### 🎯 **Interactive Tour System**

- **Guided Portfolio Tour**: Walks visitors through your key skills and projects
- **Advanced Analytics**: Tracks tour interactions, completion rates, and user engagement
- **Mobile Responsive**: Optimized positioning and animations for all devices
- **Customizable Steps**: Easy to modify tour content and targeting

### 📊 **Comprehensive Analytics Dashboard**

- **Real-time Visitor Tracking**: Page views, session duration, geographic data
- **Interaction Analytics**: Button clicks, chatbot conversations, tour engagement
- **Visual Charts**: Daily graphs with hourly breakdowns using Recharts
- **Password Protected**: Secure access to your analytics data

### 🎨 **Professional Design**

- **Modern Dark/Light Theme**: Automatic theme switching with manual override
- **Smooth Animations**: Framer Motion animations throughout the interface
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Customizable Color Schemes**: Easy to modify brand colors and gradients

### 🛠️ **Developer-Friendly**

- **Easy Customization**: Well-documented code with clear TODO comments
- **Environment Configuration**: Secure API key management
- **One-Click Deploy**: Ready for Vercel, Netlify, and other platforms
- **Version Management**: Automatic versioning with GitHub Actions

## 🚀 Complete Setup Guide

### Prerequisites

- **Node.js 18+** (Latest LTS recommended)
- **Git** for version control
- **A code editor** (VS Code recommended)
- **Basic knowledge** of React/Next.js (helpful but not required)

### Step 1: Get the Template

```bash
# Clone this repository
git clone https://github.com/LawrenceHua/modern-portfolio-template.git
cd modern-portfolio-template

# Or download and extract the ZIP file
# Then navigate to the extracted folder
```

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install

# Or if you prefer yarn
yarn install

# Or if you prefer pnpm
pnpm install
```

### Step 3: Set Up Environment Variables

```bash
# Copy the environment template
cp .env.example .env.local

# Edit the .env.local file with your actual values
# See detailed setup instructions below
```

## 🔧 API Setup Instructions

### 1. Firebase Setup (Required for Analytics)

**Step-by-step guide:**

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project" or "Add project"
   - Enter a project name (e.g., "my-portfolio-analytics")
   - Choose whether to enable Google Analytics (recommended)
   - Click "Create project"

2. **Add Web App**
   - In your Firebase project, click the web icon (</>)
   - Register app with a nickname (e.g., "portfolio-website")
   - Click "Register app"

3. **Get Configuration**
   - Copy the configuration object that looks like this:

   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyC...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123",
     measurementId: "G-ABC123DEF4",
   };
   ```

4. **Enable Firestore Database**
   - In Firebase Console, go to "Firestore Database"
   - Click "Create database"
   - Choose "Start in test mode" (for development)
   - Select a location close to your users
   - Click "Done"

5. **Update Environment Variables**
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123DEF4
   ```

### 2. Resend Email Setup (Required for Contact Forms)

**Step-by-step guide:**

1. **Create Resend Account**
   - Go to [Resend](https://resend.com/)
   - Click "Sign up" and create an account
   - Verify your email address

2. **Get API Key**
   - In Resend dashboard, go to "API Keys"
   - Click "Create API Key"
   - Give it a name (e.g., "Portfolio Contact Form")
   - Copy the API key (starts with `re_`)

3. **Verify Domain (Recommended for Production)**
   - Go to "Domains" in Resend dashboard
   - Click "Add Domain"
   - Enter your domain (e.g., `yourdomain.com`)
   - Add the DNS records as instructed
   - Wait for verification (can take up to 24 hours)

4. **Update Environment Variables**
   ```env
   RESEND_API_KEY=re_your_api_key_here
   YOUR_EMAIL=your.email@example.com
   ```

### 3. OpenAI API Setup (Optional but Recommended)

**Step-by-step guide:**

1. **Create OpenAI Account**
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Click "Sign up" and create an account
   - Verify your email and phone number

2. **Add Payment Method**
   - Go to "Billing" in your OpenAI account
   - Add a credit card or payment method
   - Set usage limits (recommended: $10-20/month)

3. **Create API Key**
   - Go to "API Keys" in your OpenAI account
   - Click "Create new secret key"
   - Give it a name (e.g., "Portfolio Chatbot")
   - Copy the API key (starts with `sk-`)

4. **Update Environment Variables**
   ```env
   OPENAI_API_KEY=sk-your_api_key_here
   ```

### 4. Google Calendar Setup (Optional)

**Step-by-step guide:**

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Click "Select a project" > "New Project"
   - Enter a project name (e.g., "portfolio-calendar")
   - Click "Create"

2. **Enable Google Calendar API**
   - In your project, go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click on it and click "Enable"

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback` (for development)
     - `https://yourdomain.com/api/auth/callback` (for production)
   - Click "Create"
   - Copy the Client ID and Client Secret

4. **Update Environment Variables**
   ```env
   GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_REDIRECT_URI=https://yourdomain.com/api/auth/callback
   GOOGLE_CALENDAR_ID=your_calendar_id@gmail.com
   ```

### 5. Analytics Dashboard Password

```env
NEXT_PUBLIC_SECRET_PASS=your_secure_password_here
```

### 6. Site Configuration

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 📝 Customization Guide

### 1. Personal Information

**Update these key files with your information:**

#### `src/app/layout.tsx`

Replace all `YOUR_*` placeholders:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: "Your Name - Your Title",
  description:
    "Portfolio website showcasing my work in Your Expertise and Your Field",
  // ... update all other metadata
};
```

#### `src/components/sections/HeroSection.tsx`

Update personal information:

```typescript
// Replace these placeholders
const heroData = {
  firstName: "Your",
  lastName: "Name",
  title: "Your Professional Title",
  education: "Your University",
  expertise: "Your Expertise",
  companyRole: "Your Company Role",
  linkedinUrl: "https://linkedin.com/in/yourprofile",
  companyUrl: "https://yourcompany.com",
};
```

#### `src/components/sections/AboutSection.tsx`

Replace the entire story section with your professional journey:

```typescript
const aboutData = {
  story: "Your professional story here...",
  degree: "Your Degree",
  university: "Your University",
  role: "Your Role",
  company: "Your Company",
  // ... update all other fields
};
```

### 2. Skills & Experience

#### `src/components/sections/SkillsSection.tsx`

Replace the `skillsData` object with your own skills:

```typescript
const skillsData: Record<string, Skill[]> = {
  business: [
    {
      name: "Product Management",
      level: "expert", // "expert", "proficient", or "familiar"
      category: "business",
      icon: "🎯",
      experience: "3+ years",
      projects: 8,
      achievement: "Led product strategy for 3 major launches",
      endorsements: ["Company A", "Manager B", "Client C"],
    },
    // Add more skills...
  ],
  // Add more categories...
};
```

#### `src/components/sections/TimelineSection.tsx`

Replace education and work experience:

```typescript
const timelineData: TimelineEvent[] = [
  {
    type: "education",
    year: "2024",
    title: "Your Degree",
    org: "Your University",
    date: "Aug 2023 - Dec 2024",
    logo: "/images/logos/pm_happy_hour_logo.jpeg",
    details: [
      "Your educational achievements...",
      "Relevant coursework...",
      "Awards and honors...",
    ],
  },
  // Add more education and experience...
];
```

#### `src/components/sections/ProjectsSection.tsx`

Showcase your projects:

```typescript
const projectsData = {
  all: [
    {
      title: "Your Project Name",
      description: "Detailed description of your project...",
      image: "/images/logos/pm_happy_hour_logo.jpeg",
      tags: ["Technology", "Skills", "Used"],
      link: "https://yourproject.com",
      linkText: "View Project",
      linkIcon: "external" as const,
      featured: true,
      achievements: [
        "Key achievement 1",
        "Key achievement 2",
        "Key achievement 3",
      ],
    },
    // Add more projects...
  ],
};
```

### 3. Images & Assets

**Replace these files in `public/` directory:**

- `public/images/logos/pm_happy_hour_logo.jpeg` - Replace with your own logo/image
- `public/resume.pdf` - Your resume file
- `public/og-image.png` - Social media preview image (1200x630px)
- `public/favicon.png` - Your website icon
- `public/apple-touch-icon.png` - Apple device icon

**Image Optimization Tips:**

- Use WebP format for better performance
- Keep images under 500KB
- Use appropriate alt text for accessibility

### 4. Tour System Customization

Edit the `tourSteps` array in `src/app/page.tsx`:

```typescript
const tourSteps: TourStep[] = [
  {
    id: "intro",
    title: "👋 Welcome! I'm Your Name.",
    content: "Brief introduction to your background and expertise.",
    targetSection: "hero",
    icon: <FiUser className="w-5 h-5" />,
    color: "from-gray-600 to-gray-700",
    duration: 8000,
    position: "center",
  },
  // Add more steps...
];
```

### 5. Colors & Branding

#### `tailwind.config.ts`

Customize your brand colors:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#your-light-color",
          500: "#your-main-color",
          900: "#your-dark-color",
        },
      },
    },
  },
};
```

## 🚀 Deployment Guide

### Vercel (Recommended)

1. **Connect Repository**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel --prod
   ```

2. **Configure Environment Variables**
   - Go to Vercel Dashboard > Project Settings > Environment Variables
   - Add all variables from your `.env.local` file
   - Make sure to set them for Production environment

3. **Custom Domain**
   - Add your domain in Vercel Dashboard
   - Update DNS records as instructed
   - Update `NEXT_PUBLIC_SITE_URL` in environment variables

### Netlify

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: `18` (or latest LTS)

3. **Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add all variables from your `.env.local` file

### Railway/Render

1. **Connect Repository**
   - Go to Railway/Render dashboard
   - Create new service from Git repository

2. **Configure Environment**
   - Set build command: `npm run build`
   - Set start command: `npm start`
   - Add environment variables in platform dashboard

## 📊 Analytics Dashboard

Access your analytics at `https://yourdomain.com/analytics`

**Features:**

- **Daily Visitor Graphs**: Visual representation of site traffic
- **Geographic Data**: See where your visitors are coming from
- **Interaction Tracking**: Monitor button clicks, tour engagement
- **Chatbot Analytics**: Conversation metrics and popular topics
- **Performance Metrics**: Page load times and user engagement

## 🔐 Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use different API keys for development and production
   - Regularly rotate API keys

2. **Analytics Protection**
   - Use strong passwords for analytics dashboard
   - Consider IP restrictions for sensitive data

3. **Contact Form Security**
   - Implement rate limiting
   - Validate all form inputs
   - Use CAPTCHA for public forms (if needed)

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Environment Variables Not Loading:**

- Ensure `.env.local` is in the correct directory
- Check variable names match exactly
- Restart development server after changes

**Firebase Connection Issues:**

- Verify project ID and configuration
- Check Firestore rules allow read/write
- Ensure API keys are valid

**Email Not Sending:**

- Verify Resend API key
- Check domain verification status
- Review email template formatting

**OpenAI Chatbot Not Working:**

- Verify OpenAI API key is valid
- Check API usage limits and billing
- Ensure API key has proper permissions

### Getting Help

1. **Check Console Errors**: Browser DevTools > Console
2. **Review Network Tab**: Check for failed API requests
3. **Verify Environment Variables**: Ensure all required variables are set
4. **Test Individual Components**: Isolate issues to specific features

## 📁 Project Structure

```
portfolio-template/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API endpoints
│   │   │   ├── chatbot/       # AI chatbot logic
│   │   │   ├── contact/       # Contact form processing
│   │   │   ├── analytics/     # Analytics endpoints
│   │   │   └── auth/         # Authentication flows
│   │   ├── analytics/         # Analytics dashboard
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout with metadata
│   │   └── page.tsx           # Main portfolio page
│   ├── components/            # React components
│   │   ├── sections/          # Page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── TimelineSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── chatbot/           # Chatbot components
│   │   ├── analytics/         # Analytics components
│   │   └── providers/         # Context providers
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   └── types/                 # TypeScript definitions
├── public/                    # Static assets
│   ├── images/               # Project and logo images
│   ├── resume.pdf           # Your resume
│   └── favicon.png          # Site icon
├── .env.example             # Environment variables template
├── .env.local               # Your environment variables (create this)
├── package.json            # Dependencies
└── README.md              # This file
```

## 📋 Setup Checklist

- [ ] Repository cloned/downloaded
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured (`.env.local`)
- [ ] Firebase project created and configured
- [ ] Resend account created and API key obtained
- [ ] OpenAI API key created (optional)
- [ ] Google Calendar OAuth set up (optional)
- [ ] Analytics password set (optional)
- [ ] Personal information updated in all sections
- [ ] Skills and experience customized
- [ ] Projects added with your work
- [ ] Contact information updated
- [ ] Resume file uploaded (`public/resume.pdf`)
- [ ] Social media links updated
- [ ] Tour steps customized
- [ ] Images replaced with your own
- [ ] Development server tested (`npm run dev`)
- [ ] Production build successful (`npm run build`)
- [ ] Deployed to hosting platform
- [ ] Custom domain configured
- [ ] Analytics dashboard tested

## 🤝 Contributing

Want to improve this template? Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - feel free to use it for your personal or commercial projects.

## 📞 Support

Need help setting up your portfolio?

- **Documentation**: Check this README and inline comments
- **Issues**: Report bugs or request features via GitHub Issues
- **Community**: Join discussions about customization and improvements

---

**Built with ❤️ using:**

- Next.js 14 & React 18
- TypeScript & TailwindCSS
- Framer Motion & Recharts
- OpenAI API & Firebase
- Resend & Google APIs

_Transform your professional presence with this modern, AI-powered portfolio template!_
