# What I've done
## Development environment
- TypeScript is installed and used throughout whole project to provide type safety and to leverage modern ES syntax
- Webpack loads constants from .env file in order to configure front end environment conveniently (for example, API url constant)
- BrowserSync is installed to make use of several devices during development

## Optimizations
- All app styles are extracted into separate file and lazy loaded via webpack plugin
- Tree shaking was incorporated to reduce an amount of unused code (eg. lodash separate module imports)
- dayjs used instead of moment to save bundle size
- Articles are fetched from API only when not present in app state, or when fetched some time ago (time defined in .env) to save requests

## Architecture
- Redux Toolkit was used to reduce state management boilerplate code and to provide solid ground for future development and testing
- All language strings stored in JSON file for easy modification and addition of new languages
- Sorting and filtering: it is easy to add new sorting and filtering types, also logic is written in way to be reusable for new Redux slices

## User experience
- Adobe Spectrum UI kit was used, it provides consistent components design and rich ARIA support
- Because articles images are loaded dynamically, loader is shown to indicate process of fetching them

# Extra features
- Sorting by title
- Color scheme switcher (dark/light)
- Saving basic app data in local storage
- i18n support
- Hello Tour popup

# What can be improved
- If real API will be connected, logic should be written for caching/paginating server response. Right now this logic is really simple and assumes that every call to api fetches all articles
- Store's subscribe method updates local storage on every change, this needs to be changed when store will grow
- Development environment: husky, prettier, etc
- Tests - app is testable but there are no tests yet :)
