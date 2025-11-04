# Gift Horse Project Documentation

This directory contains documentation and context about the Gift Horse project.

## Documentation Files

### Setup & Structure
1. **[Project Overview](./01-project-overview.md)** - High-level project information, status, and setup
2. **[Codebase Structure](./02-codebase-structure.md)** - Detailed information about the codebase architecture, file structure, and dependencies
3. **[Features and Implementations](./03-features-and-implementations.md)** - Log of implemented features, components, and implementation notes

### Product Plan
4. **[Product Vision](./04-product-vision.md)** - Problem statement, solution philosophy, and value propositions
5. **[Core Features](./05-core-features.md)** - MVP feature set with detailed descriptions
6. **[Full Feature List](./06-full-feature-list.md)** - Complete feature inventory with MVP status
7. **[Technical Stack](./07-technical-stack.md)** - Technology choices and architecture decisions
8. **[Data Model](./08-data-model.md)** - High-level data structure and relationships
9. **[User Experience Principles](./09-user-experience-principles.md)** - UX guidelines and interaction patterns
10. **[UX Flow and Screens](./10-ux-flow-and-screens.md)** - Screen inventory, navigation structure, and user flows
11. **[Implementation Plan](./11-implementation-plan.md)** - Step-by-step implementation guide and technical details
12. **[Troubleshooting](./12-troubleshooting.md)** - Common issues and solutions
13. **[Resetting Emulators](./14-resetting-emulators.md)** - Guide for clearing app data on emulators for testing

### Design System
14. **[Design Philosophy](./12-design-philosophy.md)** - Design principles and guidelines learned from top apps like Flighty, Daylio, and Instant. Reference when making component, typography, animation, and interaction design decisions.
    - **[Research Summary](./DESIGN-RESEARCH-SUMMARY.md)** - Quick overview of the research conducted and key takeaways
15. **[Tamagui Implementation Plan](./13-tamagui-implementation-plan.md)** - Comprehensive plan for implementing Tamagui UI framework, including design system tokens, component creation, and migration strategy for all existing screens
16. **[Tamagui Setup Complete](./15-tamagui-setup-complete.md)** - ✅ COMPLETE: Summary of Tamagui installation, configuration, and design system components created. Reference for component usage and next steps.

## Purpose

These documents serve as a reference point for:
- Understanding the project structure and setup
- Referencing implementation patterns and decisions
- Tracking feature development over time
- Onboarding new developers or providing context for AI assistants

## How to Use

- **When starting a new feature**: Check the codebase structure document to understand existing patterns
- **When making design decisions**: Reference the Design Philosophy (doc 12) for principles, measurements, and patterns learned from top apps
- **When implementing UI components**: Follow the Tamagui Implementation Plan (doc 13) for design system tokens, component patterns, and migration guidelines
- **When choosing typography, spacing, or animations**: Use the reference tables in Design Philosophy and corresponding Tamagui tokens in the implementation plan
- **When making architectural decisions**: Update relevant documentation files
- **When stuck**: Refer to `app-example/` for implementation patterns or the Design Philosophy for design guidance

## Updating Documentation

Please update these documents as the project evolves:
- Add new features to `03-features-and-implementations.md`
- Update codebase structure if the architecture changes significantly
- Keep project overview current with status and key information

