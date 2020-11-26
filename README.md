# Schibsted frontend task app

## Development
To run Webpack dev server on `localhost:3000` and BrowserSync on `localhost:3010`:
> `npm run dev` 

## Deployment
> `npm run build`

## API Documentation
Api server can be found in `server.js` file. You should not modify this file, only use it.

To run the server do:
> `$ node server.js`

Server will start listening on port `6010`.

The server has 2 endpoints:

`/articles/sports` - returns a list of articles from `sport` category

`/articles/fashion` - returns a list of articles from `fashion` category

Be aware of backend errors!
