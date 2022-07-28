#!/bin/bash

PUSH_TOKEN="TOKEN GOES HERE"
echo "Setting auth token: $PUSH_TOKEN"
npm set registry REGISTRY_URL
npm set //REGISTRY_DOMAIN/:_authToken $PUSH_TOKEN
npm publish \
  && echo "Publish Complete!" \
  || echo "Publish Failed - see error messages for more info!"