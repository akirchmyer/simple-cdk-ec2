# npm-base

This is a base template that can be used to rapidly create and publish npm packages to a registry.

Includes the following:
- TypeScript
- Jest
- Eslint
- Publish to registry via CircleCi (using secure CircleCi ENV values)

## To start a new project based on this repo

- Clone the repo
````
git clone git@github.com:akirchmyer/npm-base.git reponame
````
- Make updates to the package.json
- Create a project for the repo in CircleCi: https://circleci.com/docs/create-project
- Add the following secret environment variables for the project in CircleCi: https://circleci.com/docs/env-vars#setting-an-environment-variable-in-a-project
  - NPM_REGISTRY_URL: the url of a private NPM registry 
  - NPM_REGISTRY_DOMAIN: the domain name of the same private NPM registry
  - NPM_PUSH_TOKEN: The push token for the same npm registry

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

Once CircleCi is enabled and registry env values are configured, deployment to an npm registry is done automatically via CircleCi for all updates to the main branch.

````
git push origin main
````
