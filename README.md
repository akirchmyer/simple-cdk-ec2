# npm-base

Base npm package template with the following:
- TypeScript
- Jest
- Eslint
- Publish to registry via CircleCi

## To build compiled js

````
npm run build
````

## To run unit lint & unit tests

````
npm run unit
npm run lint
npm run lint:fix // clean up files per eslint config
npm test // run lint & unit tests
````

## To deploy to the npm registry via CircleCi

````
git push origin main
````
