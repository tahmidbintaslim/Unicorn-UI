# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Context

This is a Unicorn UI components library project built with Next.js, TypeScript, and Tailwind CSS. The goal is to create reusable, accessible, and beautifully designed components that can be shared with the open-source community.

## Code Standards

- Use TypeScript for all components with proper type definitions
- Follow React best practices and modern patterns
- Use Tailwind CSS for styling with the Unicorn UI design system
- Ensure all components are accessible (ARIA attributes, keyboard navigation)
- Write comprehensive JSDoc comments for all components
- Use consistent naming conventions (PascalCase for components, camelCase for props)

## Component Structure

- Create components in `src/components/custom/` directory
- Each component should have its own folder with:
  - `index.ts` - Main component export
  - `component-name.tsx` - Component implementation
  - `component-name.stories.tsx` - Storybook stories (if applicable)
  - `component-name.test.tsx` - Unit tests (if applicable)

## Documentation

- Include comprehensive README.md files
- Add inline documentation for complex logic
- Provide usage examples for each component
- Include prop tables and API documentation

## Performance

- Use React.memo for components that don't need frequent re-renders
- Implement proper prop destructuring and default values
- Use lazy loading for heavy components
- Optimize bundle size with tree-shaking friendly exports
