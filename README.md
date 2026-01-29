# 🎨 Unicorn UI Components Collection

A curated collection of **6 beautiful, accessible, and reusable components** built with React, TypeScript, and Tailwind CSS. Each component includes live interactive previews and copy-paste ready code examples.

![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)
![npm](https://img.shields.io/npm/v/unicorn-ui?style=for-the-badge&logo=npm)

## 🌟 Why Choose Unicorn UI?

Unicorn UI provides a modern, accessible, and highly customizable component library designed for developers who want to build beautiful user interfaces quickly. Inspired by the success of Tailwind CSS and DaisyUI, we offer a free open-source core with premium commercial options.

### 🚀 Key Benefits

- **Developer Experience**: Intuitive API with full TypeScript support and comprehensive documentation
- **Accessibility First**: All components follow WCAG guidelines with proper ARIA attributes
- **Performance Optimized**: Tree-shakeable exports and minimal bundle size impact
- **Themeable**: Built-in light/dark mode support with easy customization
- **Copy-Paste Ready**: One-click code copying for instant integration

## 🌟 Open Source & Commercial

Unicorn UI is **free and open source** under the MIT license. We believe in empowering developers with high-quality UI components.

For teams and businesses looking for additional features, premium support, or custom components, we offer commercial solutions. Similar to Tailwind CSS, the core library is free, while advanced tools and services are available commercially.

## ✨ Features

- 🎯 **6 Production-Ready Components**: Interactive Card, Pricing Card, Statistics Card, Testimonial Card, Feature Card, Blog Card
- 🔧 **Full TypeScript Support**: Complete type definitions with IntelliSense
- 📱 **Responsive Design**: Mobile-first approach with responsive layouts
- ♿ **Accessible**: Built with ARIA attributes and keyboard navigation
- 🎨 **Highly Customizable**: Easy to customize with Tailwind CSS and component props
- 🚀 **Performance Optimized**: Tree-shakeable exports and minimal bundle impact
- 📋 **Copy-Paste Ready**: One-click code copying with complete examples
- 🔄 **Live Previews**: Interactive component demonstrations
- 📖 **Comprehensive Documentation**: JSDoc comments and prop tables

## 🚀 Quick Start

1. **Clone the repository:**

```bash
git clone https://github.com/tahmidbintaslim/unicorn-ui.git
cd unicorn-ui
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the development server:**

```bash
npm run dev
```

4. **Open your browser:**

Visit [http://localhost:3000](http://localhost:3000) to explore the component library.

## 📦 Available Components

### ⚡ Interactive Card

A beautiful card component with hover effects, animations, and flexible content layout.

**Key Features:**

- Customizable hover animations
- Badge support with multiple variants
- Flexible content areas
- Click handlers and actions

```tsx
import { InteractiveCard } from "@/components/custom/interactive-card";

<InteractiveCard
  title="Product Launch"
  description="Join us for the biggest tech event of the year!"
  badge="Live"
  badgeVariant="destructive"
  hoverEffect={true}
  actionText="Register Now"
  onAction={() => alert("Registration clicked!")}
/>;
```

### 💰 Pricing Card

Professional pricing cards with features list, call-to-action buttons, and responsive design.

**Key Features:**

- Popular plan highlighting
- Feature lists with included/excluded items
- Flexible pricing display
- Custom CTA buttons

```tsx
import { PricingCard } from "@/components/custom/pricing-card";

<PricingCard
  name="Pro Plan"
  description="Perfect for growing teams"
  price={29}
  currency="$"
  period="month"
  features={[
    { text: "Unlimited projects", included: true },
    { text: "Priority support", included: true },
    { text: "Advanced analytics", included: true },
    { text: "Custom integrations", included: false },
  ]}
  ctaText="Start Free Trial"
  popular={true}
  onSelect={() => alert("Plan selected!")}
/>;
```

### 📈 Statistics Card

Display key metrics and statistics with beautiful icons and trend indicators.

**Key Features:**

- Trend indicators (up/down/neutral)
- Custom icons with colors
- Formatted number display
- Responsive layouts

```tsx
import { StatisticsCard } from "@/components/custom/statistics-card";
import { DollarSign } from "lucide-react";

<StatisticsCard
  title="Total Revenue"
  value={45231}
  prefix="$"
  change={20.1}
  changePeriod="from last month"
  icon={DollarSign}
  iconColor="text-green-600"
/>;
```

### 💬 Testimonial Card

Beautiful testimonial cards with ratings, user avatars, and authentic customer feedback.

**Key Features:**

- 5-star rating system
- Avatar support with fallbacks
- Multiple card variants
- Quote styling

```tsx
import { TestimonialCard } from "@/components/custom/testimonial-card";

<TestimonialCard
  testimonial="This component library has saved our team countless hours!"
  author="Alex Chen"
  role="Frontend Developer"
  company="InnovateTech"
  rating={5}
  variant="elevated"
/>;
```

### 💡 Feature Card

Showcase product features with icons, descriptions, and call-to-action elements.

**Key Features:**

- Vertical and horizontal layouts
- Custom icon backgrounds
- Badge support
- Hover animations

```tsx
import { FeatureCard } from "@/components/custom/feature-card";
import { BarChart3 } from "lucide-react";

<FeatureCard
  title="Advanced Analytics"
  description="Get detailed insights with our powerful analytics dashboard"
  icon={BarChart3}
  iconColor="text-blue-600"
  iconBg="bg-blue-100"
  badge="Popular"
  ctaText="Explore Analytics"
  onCtaClick={() => alert("Analytics clicked!")}
  hoverEffect={true}
/>;
```

### 📖 Blog Card

Perfect for blog posts, articles, and news content with images, metadata, and multiple layout variants.

**Key Features:**

- Multiple layout variants (default, horizontal, minimal)
- Rich metadata support
- Category tags
- Like counters and read time

```tsx
import { BlogCard } from "@/components/custom/blog-card";

<BlogCard
  title="Building Modern UI Components"
  excerpt="Learn how to create beautiful, reusable UI components..."
  author="Sarah Wilson"
  date="2024-01-15"
  readTime="8 min read"
  category="React"
  categoryColor="bg-blue-100 text-blue-800"
  likes={127}
  variant="default"
/>;
```

## 🎨 Customization

All components are built with Tailwind CSS and can be easily customized using the `className` prop:

```tsx
<InteractiveCard
  title="Custom Styled Card"
  description="This card has custom styling"
  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0"
  hoverEffect={true}
/>
```

### Component Props

Each component accepts a comprehensive set of props for customization:

- **Styling**: `className`, variant-specific props
- **Content**: titles, descriptions, custom content areas
- **Interactions**: click handlers, hover effects
- **Accessibility**: ARIA labels, keyboard navigation
- **Theming**: color variants, size options

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Components showcase page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Homepage
└── components/
    ├── custom/            # Custom component library
    │   ├── interactive-card/
    │   ├── pricing-card/
    │   ├── statistics-card/
    │   ├── testimonial-card/
    │   ├── feature-card/
    │   ├── blog-card/
    │   └── index.ts       # Component exports
    └── ui/               # Base UI components
```

## 🚀 Production Deployment

This project is optimized for deployment on Vercel, Netlify, or any modern hosting platform:

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy automatically - Vercel will detect Next.js and configure everything

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

### Environment Variables

No environment variables required for basic functionality.

## 🧪 Development

### Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Components

1. Create a new directory in `src/components/custom/`
2. Create the component file with TypeScript interfaces
3. Add comprehensive JSDoc documentation
4. Export from `index.ts`
5. Add to the showcase page

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-component`)
3. **Add your component** following the existing patterns
4. **Include documentation and examples**
5. **Test thoroughly**
6. **Submit a pull request**

### Component Guidelines

- Use TypeScript with comprehensive interfaces
- Include JSDoc documentation
- Follow accessibility best practices
- Add multiple usage examples
- Ensure responsive design

## 📊 Performance

- **Bundle Size**: Optimized with tree-shaking
- **Runtime**: React 19 with concurrent features
- **Build Time**: Enhanced with Turbopack
- **SEO**: Next.js with proper metadata

## 🔧 Tech Stack

- **Framework**: Next.js 15.3.5
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **UI Primitives**: Radix UI
- **Icons**: Lucide React
- **Build**: Turbopack

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Open-source component systems and libraries that inspired this project
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Next.js](https://nextjs.org/) for the React framework

## 🌟 Support

If you find this project helpful, please consider:

- ⭐ **Starring the repository**
- 🐛 **Reporting bugs**
- 💡 **Suggesting new components**
- 🔄 **Contributing code**

---

**Made with ❤️ by the open-source community**

_Ready to build amazing UIs? [Get started now](http://localhost:3000/components)!_
