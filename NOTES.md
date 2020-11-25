# What I've done
## Development environment
- TypeScript is installed and used throughout whole project to provide type safety and to leverage modern ES syntax
- There is possibility to configure front end environment through .env file (app url and API url are stored there for now)
- BrowserSync is installed to make use of several devices during development

## Optimizations
- All app styles are extracted into separate file and lazy loaded
- Tree shaking was incorporated to reduce an amount of unused code
- dayjs used instead of moment to save bundle size
