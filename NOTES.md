# What I've done
## Development environment
- TypeScript is installed and used throughout whole project to provide type safety and to leverage modern ES syntax
- There is possibility to configure front end environment through .env file (for example, API url constant)
- BrowserSync is installed to make use of several devices during development

## Optimizations
- All app styles are extracted into separate file and lazy loaded via webpack plugin
- Tree shaking was incorporated to reduce an amount of unused code (eg. lodash separate module imports)
- dayjs used instead of moment to save bundle size

## Architecture
- Redux Toolkit was used to reduce state management boilerplate code and to provide solid ground for future development

## User experience
- Adobe Spectrum UI kit was used, it provides consistent components design and rich ARIA support

# Additional features
- Color scheme switcher (dark/light)
