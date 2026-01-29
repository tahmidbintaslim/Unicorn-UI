# Contributing to Unicorn UI Components Collection

Thank you for your interest in contributing to our component library! We welcome contributions from developers of all skill levels.

## 🚀 Getting Started

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/your-username/unicorn-ui.git
   cd unicorn-ui
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📝 Component Guidelines

When creating or modifying components, please follow these guidelines:

### TypeScript

- Use comprehensive TypeScript interfaces for all props
- Include JSDoc comments for all props and functions
- Ensure type safety throughout the component

### Design

- Follow the existing design patterns and styling
- Use Tailwind CSS for all styling
- Ensure responsive design (mobile-first approach)
- Include hover and focus states

### Accessibility

- Add proper ARIA attributes
- Ensure keyboard navigation works
- Use semantic HTML elements
- Test with screen readers when possible

### Documentation

- Include comprehensive JSDoc comments
- Provide multiple usage examples
- Document all props with descriptions
- Include accessibility notes when relevant

## 🏗️ Component Structure

Each component should follow this structure:

```
src/components/custom/your-component/
├── index.ts                 # Export file
├── your-component.tsx       # Main component
└── your-component.stories.tsx  # Storybook stories (optional)
```

### Component Template

````tsx
import { cn } from "@/lib/utils";
import React from "react";

export interface YourComponentProps {
  /**
   * Component title
   */
  title: string;
  /**
   * Optional description
   */
  description?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * YourComponent description
 *
 * @example
 * ```tsx
 * <YourComponent
 *   title="Example"
 *   description="This is an example"
 *   onClick={() => console.log("clicked")}
 * />
 * ```
 */
export const YourComponent = React.memo<YourComponentProps>(
  ({ title, description, className, onClick }) => {
    return (
      <div className={cn("base-styles", className)} onClick={onClick}>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
    );
  },
);

YourComponent.displayName = "YourComponent";

export default YourComponent;
````

## 🧪 Testing

Before submitting your contribution:

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Check TypeScript**

   ```bash
   npx tsc --noEmit
   ```

3. **Run linting**

   ```bash
   npm run lint
   ```

4. **Test in browser**
   - Verify your component works in the showcase
   - Test responsive behavior
   - Check accessibility features

## 📤 Submitting Changes

1. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-component
   ```

2. **Make your changes**
   - Follow the component guidelines
   - Add your component to the showcase page
   - Update the main index.ts export file

3. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add amazing component with accessibility features"
   ```

4. **Push to your fork**

   ```bash
   git push origin feature/amazing-component
   ```

5. **Create a Pull Request**
   - Provide a clear description of your changes
   - Include screenshots or GIFs if applicable
   - Reference any related issues

## 🎯 Pull Request Guidelines

### Title Format

- `feat: add new component name`
- `fix: resolve issue with component`
- `docs: update component documentation`
- `style: improve component styling`

### Description Template

```markdown
## Changes Made

- [ ] Added new component: ComponentName
- [ ] Updated existing component
- [ ] Fixed accessibility issue
- [ ] Improved documentation

## Component Features

- Feature 1
- Feature 2
- Feature 3

## Testing

- [ ] Component builds successfully
- [ ] TypeScript checks pass
- [ ] Responsive design verified
- [ ] Accessibility tested

## Screenshots

[Add screenshots or GIFs showing your component]
```

## 🔍 Code Review Process

1. **Automated Checks**: Your PR will run automated builds and checks
2. **Manual Review**: Maintainers will review your code and provide feedback
3. **Testing**: We'll test your component across different devices and browsers
4. **Merge**: Once approved, your contribution will be merged!

## 🐛 Bug Reports

When reporting bugs, please include:

- **Component name** and version
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Browser/device** information

## 💡 Feature Requests

For new component ideas:

1. **Check existing issues** to avoid duplicates
2. **Describe the component** and its use cases
3. **Provide examples** or mockups if possible
4. **Explain the benefits** it would bring to the library

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Documentation**: Check the README and component documentation

## 🙏 Recognition

Contributors will be:

- Listed in the README
- Credited in release notes
- Invited to be maintainers (for regular contributors)

Thank you for helping make this component library better! 🎉
