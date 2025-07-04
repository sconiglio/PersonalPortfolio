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

## 🚀 Quick Start Guide

### Prerequisites

- **Node.js 18+** (Latest LTS recommended)
- **pnpm** or **npm** package manager
- **Git** for version control

### Step 1: Get the Template

```bash
# Clone or download this repository
git clone [YOUR_REPO_URL]
cd portfolio-template/portfolio
```

### Step 2: Install Dependencies

```bash
pnpm install
# or
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the portfolio directory:

```env
# ==============================================================================
# PORTFOLIO TEMPLATE - ENVIRONMENT VARIABLES
# ==============================================================================

# ------------------------------------------------------------------------------
# FIREBASE CONFIGURATION (Required for analytics)
# ------------------------------------------------------------------------------
# Get these from Firebase Console > Project Settings > General > Your apps
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# ------------------------------------------------------------------------------
# EMAIL CONFIGURATION (Required for contact forms)
# ------------------------------------------------------------------------------
# Sign up at https://resend.com/ and get your API key
RESEND_API_KEY=re_your_resend_api_key_here
YOUR_EMAIL=your.email@example.com

# ------------------------------------------------------------------------------
# AI CHATBOT (Optional but recommended)
# ------------------------------------------------------------------------------
# Get your API key from https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your_openai_api_key_here

# ------------------------------------------------------------------------------
# GOOGLE CALENDAR (Optional - for meeting scheduling)
# ------------------------------------------------------------------------------
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://yourdomain.com/api/auth/callback
GOOGLE_CALENDAR_ID=your_calendar_id@gmail.com

# ------------------------------------------------------------------------------
# ANALYTICS DASHBOARD (Optional)
# ------------------------------------------------------------------------------
# Password to protect your analytics dashboard
NEXT_PUBLIC_SECRET_PASS=your_secure_password_here

# ------------------------------------------------------------------------------
# SITE CONFIGURATION
# ------------------------------------------------------------------------------
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Step 4: Start Development Server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio template.

## 📝 Customization Guide

### 1. Personal Information

**Update these key files with your information:**

#### `src/app/layout.tsx`

- Replace `YOUR_NAME`, `YOUR_TITLE`, `YOUR_DOMAIN` with your details
- Update metadata, Open Graph images, and social links

#### `src/components/sections/HeroSection.tsx`

- Replace `YOUR_FIRST_NAME`, `YOUR_LAST_NAME`, `YOUR_TITLE`
- Update `YOUR_EDUCATION`, `YOUR_EXPERTISE`, `YOUR_COMPANY_ROLE`
- Replace `YOUR_LINKEDIN_URL`, `YOUR_COMPANY_URL`

#### `src/components/sections/AboutSection.tsx`

- Replace the entire story section with your professional journey
- Update `YOUR_DEGREE`, `YOUR_UNIVERSITY`, `YOUR_ROLE`, `YOUR_COMPANY`
- Customize your skills formula and personal interests

### 2. Skills & Experience

#### `src/components/sections/SkillsSection.tsx`

Replace the `skillsData` object with your own skills:

```typescript
const skillsData: Record<string, Skill[]> = {
  business: [
    {
      name: "Product Management", // Your skill name
      level: "expert", // "expert", "proficient", or "familiar"
      category: "business",
      icon: "🎯", // Choose an emoji
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

- Replace education and work experience with your background
- Update company logos, dates, and descriptions

#### `src/components/sections/ProjectsSection.tsx`

- Showcase your projects with descriptions, tech stacks, and links
- Replace project images and achievements

### 3. Images & Assets

**Replace these files in `public/` directory:**

- `profile.jpg` - Your profile picture (square, 400x400px recommended)
- `resume.pdf` - Your resume file
- `og-image.png` - Social media preview image (1200x630px)
- `favicon.png` - Your website icon
- `logos/` - Replace with your company/project logos

**Image Optimization Tips:**

- Use WebP format for better performance
- Keep images under 500KB
- Use appropriate alt text for accessibility

### 4. Contact Information

#### Update Contact Methods:

- Email addresses in environment variables
- Social media links in HeroSection and ContactSection
- Phone number (if desired) in ContactSection
- LinkedIn, GitHub, and other professional profiles

### 5. Colors & Branding

#### `tailwind.config.ts`

Customize your brand colors:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add your brand colors
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

#### CSS Variables in `src/app/globals.css`

Update gradient and theme colors throughout the site.

## 🔧 Advanced Configuration

### Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore database
   - Get configuration from Project Settings

2. **Configure Firestore Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

### Resend Email Setup

1. **Sign up at [Resend](https://resend.com/)**
2. **Verify your domain** (recommended for production)
3. **Get your API key** from the dashboard
4. **Configure DNS records** for better deliverability

### OpenAI Integration

1. **Get API key** from [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Set usage limits** to control costs
3. **Customize chatbot prompts** in `/api/chatbot/route.ts`

### Google Calendar Integration

1. **Create Google Cloud Project**
2. **Enable Calendar API**
3. **Set up OAuth 2.0 credentials**
4. **Configure redirect URIs**

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

3. **Custom Domain**
   - Add your domain in Vercel Dashboard
   - Update DNS records as instructed

### Other Platforms

#### Netlify

```bash
# Build command
npm run build

# Publish directory
out
```

#### Railway/Render

- Configure environment variables in platform dashboard
- Set build command to `npm run build`
- Set start command to `npm start`

## 📊 Analytics Dashboard

Access your analytics at `https://yourdomain.com/analytics`

**Features:**

- **Daily Visitor Graphs**: Visual representation of site traffic
- **Geographic Data**: See where your visitors are coming from
- **Interaction Tracking**: Monitor button clicks, tour engagement
- **Chatbot Analytics**: Conversation metrics and popular topics
- **Performance Metrics**: Page load times and user engagement

## 🎯 Tour System Customization

### Modify Tour Steps

Edit the `tourSteps` array in `src/app/page.tsx`:

```typescript
const tourSteps: TourStep[] = [
  {
    id: "intro",
    title: "👋 Welcome! I'm YOUR_NAME.",
    content: "Brief introduction to your background and expertise.",
    targetSection: "hero",
    icon: <FiUser className="w-5 h-5" />,
    color: "from-purple-600 to-pink-600",
    duration: 8000,
    position: "top-right",
  },
  // Add more steps...
];
```

### Targeting Elements

Each tour step targets specific elements on your page:

- Use `targetSection` to point to section IDs
- Customize `position` for optimal arrow placement
- Adjust `duration` for step timing

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

### Getting Help

1. **Check Console Errors**: Browser DevTools > Console
2. **Review Network Tab**: Check for failed API requests
3. **Verify Environment Variables**: Ensure all required variables are set
4. **Test Individual Components**: Isolate issues to specific features

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API endpoints
│   │   │   ├── chatbot/       # AI chatbot logic
│   │   │   ├── contact/       # Contact form processing
│   │   │   ├── analytics*/    # Analytics endpoints
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
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── chatbot/           # Chatbot components
│   │   ├── analytics/         # Analytics components
│   │   └── providers/         # Context providers
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   └── types/                 # TypeScript definitions
├── public/                    # Static assets
│   ├── images/               # Project and logo images
│   ├── profile.jpg           # Your profile picture
│   ├── resume.pdf           # Your resume
│   └── favicon.png          # Site icon
├── .env.local               # Environment variables (create this)
├── .env.example            # Environment template
├── package.json            # Dependencies
└── README.md              # This file
```

## 🤝 Contributing

Want to improve this template? Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - feel free to use it for your personal or commercial projects.

## 🔗 Demo & Examples

- **Live Demo**: [View template demo](https://your-demo-url.com)
- **Example Portfolio**: See how others have customized this template

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
