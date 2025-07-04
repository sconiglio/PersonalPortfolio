# 🚀 Quick Start Guide

Get your portfolio up and running in 5 minutes!

## Step 1: Update Your Information

Open `src/config/site.ts` and update these key fields:

```typescript
// Basic Information
name: "YOUR_NAME",           // ← Your full name
title: "YOUR_TITLE",         // ← Your job title
description: "Your portfolio description",

// Contact Information
contact: {
  email: "your.email@example.com",     // ← Your email
  phone: "+1 (555) 123-4567",          // ← Your phone
  location: "Your City, State",        // ← Your location
  linkedin: "https://linkedin.com/in/yourprofile",  // ← Your LinkedIn
  github: "https://github.com/yourusername",        // ← Your GitHub
},
```

## Step 2: Add Your Photo

1. Add your photo to `public/images/placeholders/`
2. Update the image path in `src/config/site.ts`:

```typescript
images: {
  profile: "/images/placeholders/your-photo.jpg",  // ← Your photo
},
```

## Step 3: Update Content

Edit these sections in `src/config/site.ts`:

- **Hero Section**: Update headline and description
- **About Section**: Write your story
- **Skills**: List your skills
- **Projects**: Add your projects
- **Experience**: Add your work history
- **Testimonials**: Add client testimonials

## Step 4: Test Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio!

## Step 5: Deploy

1. Push to GitHub
2. Deploy with [Vercel](https://vercel.com) (recommended)

## 🎯 Pro Tips

- **Keep it simple**: Start with basic info, add details later
- **Use real metrics**: Include numbers and results in your projects
- **Test on mobile**: Make sure it looks good on phones
- **Add your personality**: Make it uniquely yours

## 🆘 Need Help?

- Check `TEMPLATE_SETUP.md` for detailed instructions
- Read the main `README.md` for full documentation
- Use the AI prompts in the README for fast customization

---

**That's it! Your portfolio is ready to go! 🎉**
