# Modern Portfolio Template

A clean, professional portfolio template built with Next.js, React, and Tailwind CSS. Perfect for product managers, developers, designers, and anyone looking to showcase their work with a modern, minimalist design.

## ✨ Features

- **Modern Design**: Clean, professional layout with black, white, and gray color scheme
- **Responsive**: Mobile-first design that works on all devices
- **Fast**: Built with Next.js 14 for optimal performance
- **Customizable**: Easy to modify content, colors, and sections
- **SEO Optimized**: Built-in meta tags and Open Graph support
- **Analytics Ready**: Optional analytics dashboard included
- **Chatbot**: Optional AI-powered contact form

## 🚀 Quick Start

### 1. Clone the Template

```bash
git clone https://github.com/your-username/modern-portfolio-template.git
cd modern-portfolio-template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 🎨 Customization Guide

### Quick Customization (5 minutes)

1. **Update Personal Info**: Edit `src/app/layout.tsx` to change your name and title
2. **Replace Profile Image**: Add your photo to `public/images/placeholders/` and update references
3. **Update Content**: Edit the section files in `src/components/sections/`
4. **Deploy**: Push to GitHub and deploy with Vercel

### Detailed Customization

#### 1. Personal Information

- **Name & Title**: `src/app/layout.tsx` (lines 15-16)
- **Profile Image**: `src/components/sections/HeroSection.tsx` (line 25)
- **Contact Info**: `src/components/sections/ContactSection.tsx`

#### 2. Content Sections

Each section is in its own file for easy editing:

- **Hero**: `src/components/sections/HeroSection.tsx`
- **About**: `src/components/sections/AboutSection.tsx`
- **Skills**: `src/components/sections/SkillsSection.tsx`
- **Projects**: `src/components/sections/ProjectsSection.tsx`
- **Experience**: `src/components/sections/TimelineSection.tsx`
- **Testimonials**: `src/components/sections/TestimonialsSection.tsx`
- **Contact**: `src/components/sections/ContactSection.tsx`

#### 3. Adding/Removing Sections

**To Add a New Section:**

1. Create `src/components/sections/NewSection.tsx`
2. Import and add to `src/app/page.tsx`
3. Add navigation link in `src/components/layout/Navigation.tsx`

**To Remove a Section:**

1. Remove from `src/app/page.tsx`
2. Remove navigation link from `src/components/layout/Navigation.tsx`

#### 4. Styling

- **Colors**: Edit `tailwind.config.ts` for theme colors
- **Global Styles**: Modify `src/app/globals.css`
- **Component Styles**: Each component has inline Tailwind classes

### AI-Powered Customization

Use these prompts with your AI assistant for fast customization:

#### For Content Updates:

```
"Update the portfolio content in [SECTION_FILE] to reflect my background as a [YOUR_ROLE] with experience in [YOUR_SKILLS]. Include my projects [PROJECT_NAMES] and education at [SCHOOL_NAMES]."
```

#### For Styling Changes:

```
"Modify the color scheme in [COMPONENT_FILE] to use [COLOR_PALETTE] instead of the current black/white theme."
```

#### For Adding Features:

```
"Add a new section to showcase [FEATURE_TYPE] in the portfolio. Create the component and integrate it into the main page."
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Main layout with meta tags
│   ├── page.tsx           # Home page with all sections
│   └── globals.css        # Global styles
├── components/
│   ├── sections/          # Portfolio sections
│   ├── layout/            # Navigation and layout components
│   ├── chatbot/           # Optional AI chatbot
│   └── analytics/         # Optional analytics dashboard
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `.next` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`

### Deploy to GitHub Pages

1. Add to `package.json`:

```json
{
  "scripts": {
    "export": "next build && next export",
    "deploy": "npm run export && touch out/.nojekyll"
  }
}
```

2. Run `npm run deploy` and push the `out` folder to GitHub Pages

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

### Adding Dependencies

```bash
npm install package-name
```

### Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🎯 Tips for Success

### Content Strategy

- **Keep it concise**: Each section should be scannable in 30 seconds
- **Show results**: Include metrics, outcomes, and impact
- **Use visuals**: Add screenshots, diagrams, or videos
- **Tell stories**: Explain the "why" behind your work

### Technical Tips

- **Optimize images**: Use WebP format and compress images
- **Test mobile**: Always check mobile responsiveness
- **Performance**: Monitor Core Web Vitals
- **SEO**: Add meta descriptions and alt text

### Common Customizations

**Change Color Scheme:**

```typescript
// In tailwind.config.ts
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

**Add Custom Fonts:**

```css
/* In globals.css */
@import url("https://fonts.googleapis.com/css2?family=Your+Font:wght@400;700&display=swap");
```

**Modify Layout:**

```typescript
// In page.tsx - reorder sections as needed
<HeroSection />
<AboutSection />
<SkillsSection />
// ... etc
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this template for your own projects!

## 🆘 Need Help?

- **Issues**: Create a GitHub issue
- **Questions**: Check the documentation above
- **Custom Development**: Consider hiring a developer for complex customizations

---

**Made with ❤️ for the developer community**
