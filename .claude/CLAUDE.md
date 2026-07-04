# CLAUDE.md

Project-specific guidance for AI coding agents.

This project uses shadcn/ui with Tailwind CSS v4 and Next.js App Router.

## UI Components

- Use shadcn/ui components from `@/components/ui/`
- Import utility function `cn` from `@/lib/utils` for merging classes
- Follow shadcn/ui conventions for styling

## Styling

- Use Tailwind CSS utility classes
- Use CSS variables for theming (see globals.css)
- Use the `cn()` utility to merge class names

## Project Structure

- Components in `src/components/ui/` for shadcn/ui
- Custom components in `src/_components/`
- Pages in `src/app/`