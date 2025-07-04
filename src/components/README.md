# 🧩 React Components

This directory contains all React components organized by functionality:

## 📁 Directory Structure

```
components/
├── analytics/          # Analytics dashboard components
│   ├── dashboard      # Main analytics view
│   ├── charts        # Data visualization
│   └── sections      # Dashboard sections
├── chatbot/           # AI chatbot components
│   ├── interface     # Chat UI components
│   ├── messages      # Message handling
│   └── styles        # Chatbot styling
├── common/            # Shared UI components
│   ├── buttons       # Reusable buttons
│   ├── cards         # Card layouts
│   └── icons         # Custom icons
├── layout/            # Layout components
│   ├── navigation    # Site navigation
│   └── footer        # Site footer
├── providers/         # React context providers
│   ├── theme         # Theme provider
│   └── scroll        # Smooth scroll
└── sections/          # Portfolio sections
    ├── hero          # Hero section
    ├── about         # About section
    ├── skills        # Skills section
    ├── timeline      # Experience timeline
    ├── projects      # Projects showcase
    └── contact       # Contact form
```

## 🎨 Component Groups

### Analytics (`/analytics/*`)

- **Dashboard**: Main analytics interface
- **Charts**: Data visualization components
- **Metrics**: Analytics display components

### Chatbot (`/chatbot/*`)

- **Interface**: Chat window and controls
- **Messages**: Message display and input
- **Floating Button**: Chat trigger

### Common (`/common/*`)

- **UI Elements**: Reusable UI components
- **Buttons**: Custom button styles
- **Icons**: Custom icon components

### Layout (`/layout/*`)

- **Navigation**: Site header and menu
- **Footer**: Site footer
- **Container**: Layout wrappers

### Sections (`/sections/*`)

- **Portfolio Sections**: Main content areas
- **Customizable**: Easy to modify content
- **Responsive**: Mobile-friendly design

## 🔧 Customization

### Styling

- Uses Tailwind CSS for styling
- Dark/light theme support
- Responsive design patterns

### Content

- Replace placeholder text
- Update images and icons
- Modify color schemes

### Example: Section Component

```tsx
// sections/AboutSection.tsx
export function AboutSection() {
  return (
    <section id="about">
      <h2>About {/* TODO: Add your name */}</h2>
      <p>{/* TODO: Add your bio */}</p>
      {/* TODO: Add your skills */}
    </section>
  );
}
```

### Example: Common Component

```tsx
// common/Button.tsx
interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function Button({ variant = "primary", children }: ButtonProps) {
  return <button className={`btn btn-${variant}`}>{children}</button>;
}
```

## 🎯 Usage Guidelines

### Component Structure

- Keep components focused and reusable
- Use TypeScript for type safety
- Follow consistent naming patterns

### State Management

- Use React hooks for local state
- Context for shared state
- Props for component configuration

### Performance

- Implement lazy loading
- Optimize re-renders
- Use proper React patterns

## 🧪 Testing

Component tests are in `__tests__` directories:

```bash
# Run component tests
npm run test:components

# Test specific component
npm run test:components -- --grep "Button"
```

## 📚 Documentation

Each component should have:

- TypeScript interfaces
- JSDoc comments
- Usage examples
- Props documentation

## 🔄 Updates

When modifying components:

1. Update types if needed
2. Test all variants
3. Check mobile layout
4. Update documentation
5. Test accessibility

## 🎨 Theme Customization

Update theme in `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "your-color",
        secondary: "your-color",
      },
    },
  },
};
```

## 🚀 Getting Started

1. Choose section components to use
2. Customize content and styling
3. Add your own components as needed
4. Test responsive layout
5. Deploy your portfolio

## 📝 Notes

- Keep components modular
- Follow React best practices
- Maintain consistent styling
- Test cross-browser compatibility
- Consider accessibility
