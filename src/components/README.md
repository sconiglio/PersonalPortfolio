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

# Component Architecture & Modularity Guide

This document outlines the modular component structure and best practices for the portfolio template.

## 📁 Directory Structure

```
src/components/
├── analytics/                 # Analytics components
│   ├── hooks/                # Custom hooks for analytics
│   │   ├── useAnalyticsData.ts
│   │   └── index.ts
│   ├── sections/             # Analytics dashboard sections
│   │   ├── ButtonClicksSection.tsx
│   │   ├── ChatSessionsSection.tsx
│   │   ├── DeviceAnalyticsSection.tsx
│   │   ├── GeoLocationSection.tsx
│   │   ├── GraphSection.tsx
│   │   ├── OverviewSection.tsx
│   │   └── TourAnalyticsSection.tsx
│   ├── AnalyticsDashboard.tsx
│   ├── AnalyticsProvider.tsx
│   ├── AnalyticsAssistant.tsx
│   ├── VisitorTracker.tsx
│   ├── SharedTooltip.tsx
│   └── index.ts
├── chatbot/                  # Chatbot components
│   ├── ChatInterface.tsx
│   ├── MessageList.tsx
│   ├── MessageInput.tsx
│   ├── FloatingButton.tsx
│   ├── FloatingChatbot.tsx
│   ├── CalendarPicker.tsx
│   ├── Chatbot.module.css
│   ├── index.ts
│   └── README.md
├── sections/                 # Main portfolio sections
│   ├── contact/             # Contact section components
│   │   ├── ContactForm.tsx
│   │   ├── SocialLinks.tsx
│   │   └── index.ts
│   ├── skills/              # Skills section components
│   │   ├── SkillCard.tsx
│   │   ├── SkillFilter.tsx
│   │   └── index.ts
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── TimelineSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ContactSection.tsx
│   └── TestimonialsSection.tsx
├── layout/                   # Layout components
│   ├── Navigation.tsx
│   └── ModernNavigation.tsx
├── providers/                # Context providers
│   ├── ThemeProvider.tsx
│   └── SmoothScrollProvider.tsx
├── common/                   # Shared/common components
├── __tests__/               # Component tests
└── README.md
```

## 🧩 Component Modularity Principles

### 1. Single Responsibility

Each component should have one clear purpose:

- `ContactForm.tsx` - Handles contact form logic only
- `SkillCard.tsx` - Displays individual skill information
- `useAnalyticsData.ts` - Manages analytics data fetching

### 2. Proper Documentation

All components include comprehensive JSDoc comments:

````typescript
/**
 * Component Name
 *
 * Brief description of what the component does.
 *
 * Features:
 * - Feature 1
 * - Feature 2
 *
 * @param props - ComponentProps
 * @returns JSX.Element
 *
 * @example
 * ```tsx
 * <ComponentName prop1="value" />
 * ```
 */
````

### 3. Type Safety

All components use TypeScript interfaces:

```typescript
export interface ComponentProps {
  /** Description of prop */
  prop1: string;
  /** Optional prop with default */
  prop2?: number;
  /** Callback function */
  onAction?: (data: any) => void;
}
```

### 4. Modular Structure

Large components are broken down into smaller, focused components:

#### Before (Monolithic):

```typescript
// ContactSection.tsx (1155 lines)
export function ContactSection() {
  // Form logic, social links, meeting scheduling, etc.
}
```

#### After (Modular):

```typescript
// ContactSection.tsx
import { ContactForm } from './contact/ContactForm';
import { SocialLinks } from './contact/SocialLinks';

export function ContactSection() {
  return (
    <div>
      <ContactForm />
      <SocialLinks />
    </div>
  );
}
```

## 🔧 Custom Hooks

### Analytics Hooks

Located in `src/components/analytics/hooks/`:

- **`useAnalyticsData`** - Manages analytics data fetching, caching, and state
- Provides data, loading states, statistics, and data management functions
- Separates data logic from UI components

### Usage Example:

```typescript
import { useAnalyticsData } from "../hooks";

function AnalyticsComponent() {
  const { chatSessions, loading, fetchAllData, refreshData } =
    useAnalyticsData(db);

  // Component logic
}
```

## 📦 Index Files

Each module has an `index.ts` file for clean imports:

```typescript
// src/components/sections/contact/index.ts
export { ContactForm } from "./ContactForm";
export { SocialLinks } from "./SocialLinks";
export type { ContactFormData, ContactFormProps } from "./ContactForm";
```

### Benefits:

- Clean imports: `import { ContactForm } from '@/components/sections/contact'`
- Type re-exports for external use
- Centralized module exports

## 🎨 Component Categories

### 1. Section Components

Main portfolio sections in `src/components/sections/`:

- **HeroSection** - Landing page hero
- **AboutSection** - About me information
- **SkillsSection** - Skills and expertise
- **TimelineSection** - Experience timeline
- **ProjectsSection** - Project showcase
- **ContactSection** - Contact information and forms

### 2. Analytics Components

Analytics dashboard components in `src/components/analytics/`:

- **AnalyticsDashboard** - Main dashboard
- **AnalyticsProvider** - Context provider
- **AnalyticsAssistant** - AI assistant
- **Section components** - Individual analytics sections

### 3. Chatbot Components

Chatbot functionality in `src/components/chatbot/`:

- **ChatInterface** - Main chat interface
- **MessageList** - Message display
- **MessageInput** - Message input
- **FloatingChatbot** - Floating chat widget

### 4. Layout Components

Layout and navigation in `src/components/layout/`:

- **Navigation** - Main navigation
- **ModernNavigation** - Modern nav variant

### 5. Provider Components

Context providers in `src/components/providers/`:

- **ThemeProvider** - Theme management
- **SmoothScrollProvider** - Smooth scrolling

## 🚀 Best Practices

### 1. Component Naming

- Use PascalCase for component names
- Use descriptive, purpose-driven names
- Include component type in name (e.g., `ContactForm`, `SkillCard`)

### 2. File Organization

- One component per file
- Related components in subdirectories
- Index files for clean exports

### 3. Props Interface

- Export interfaces for external use
- Use descriptive prop names
- Include JSDoc comments for props

### 4. Error Handling

- Graceful error states
- Loading states
- Fallback content

### 5. Performance

- Memoization where appropriate
- Lazy loading for large components
- Efficient re-renders

## 🔄 Refactoring Guidelines

### When to Break Down Components:

1. **Size**: Component exceeds 200-300 lines
2. **Complexity**: Multiple responsibilities
3. **Reusability**: Logic can be shared
4. **Testing**: Easier to test smaller components

### Refactoring Process:

1. Identify responsibilities
2. Extract reusable logic into hooks
3. Create focused sub-components
4. Update imports and exports
5. Add comprehensive documentation

## 📝 Documentation Standards

### Component Documentation:

````typescript
/**
 * Component Name
 *
 * Detailed description of component purpose and functionality.
 *
 * Features:
 * - Feature 1: Description
 * - Feature 2: Description
 *
 * Props:
 * - prop1: Description and type
 * - prop2: Description and type
 *
 * @param props - ComponentProps
 * @returns JSX.Element
 *
 * @example
 * ```tsx
 * <ComponentName
 *   prop1="value"
 *   prop2={42}
 *   onAction={(data) => console.log(data)}
 * />
 * ```
 */
````

### Hook Documentation:

````typescript
/**
 * Hook Name
 *
 * Description of hook functionality and use cases.
 *
 * @param param1 - Description of parameter
 * @returns ReturnType - Description of return value
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useHook(param1);
 * ```
 */
````

## 🧪 Testing Strategy

### Component Testing:

- Unit tests for individual components
- Integration tests for component interactions
- Snapshot tests for UI consistency

### Hook Testing:

- Test hook logic independently
- Mock dependencies
- Test error states and edge cases

## 📚 Resources

- [React Component Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [JSDoc Documentation](https://jsdoc.app/)

---

This modular structure ensures maintainability, reusability, and clear separation of concerns throughout the portfolio template.
