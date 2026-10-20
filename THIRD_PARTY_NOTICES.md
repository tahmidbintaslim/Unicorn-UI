# Third-party notices

This project includes code from the projects below. Their licenses apply to
that code.

## shadcn/ui

- Source: https://github.com/shadcn-ui/ui
- License: MIT
- Files: the primitives in `src/components/ui/` (`badge.tsx`, `button.tsx`,
  `card.tsx`, `dialog.tsx`, `input.tsx`, `label.tsx`, `tabs.tsx`,
  `textarea.tsx`), the `cn` helper in `src/lib/utils.ts`, and the theme
  variables in `src/app/globals.css`. They were generated with the shadcn CLI
  (new-york style, neutral base color, see `components.json`). The six cards in
  `src/components/custom/` are built on these primitives.

```
MIT License

Copyright (c) 2023 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Dependencies installed from npm (Next.js, React, Radix UI, Tailwind CSS,
lucide-react, GSAP and others in `package.json`) are not copied into this
repository; each ships with its own license in `node_modules`.
