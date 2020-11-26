# What I've done
## Development environment
- TypeScript is installed and used throughout whole project to provide type safety and to leverage modern ES syntax
- Webpack loads constants from .env file in order to configure front end environment conveniently (for example, API url constant)
- BrowserSync is installed to make use of several devices during development

## Optimizations
- All app styles are extracted into separate file and lazy loaded via webpack plugin
- Tree shaking was incorporated to reduce an amount of unused code (eg. lodash separate module imports)
- dayjs used instead of moment to save bundle size
- Articles are fetched from API only when not present in app state to save requests

## Architecture
- Redux Toolkit was used to reduce state management boilerplate code and to provide solid ground for future development

## User experience
- Adobe Spectrum UI kit was used, it provides consistent components design and rich ARIA support
- Because articles images are loaded dynamically, loader is shown to indicate process of fetching them

# Extra features
- Sorting by title
- Color scheme switcher (dark/light)

# What can be improved
- If real API will be connected, logic should be written for caching/paginating server response. Right now this logic is really simple and assumes that every call to api fetches all articles
