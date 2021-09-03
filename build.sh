#!/bin/bash
set -eo pipefail
ENV=$1
APP_NAME="submission-review-ui"
UPDATE_CACHE=""
echo $ENV
echo "NODE_ENV=$ENV" >docker/api.env
docker build -f docker/Dockerfile -t $APP_NAME:latest \
  --build-arg NODE_ENV=${ENV} \
  --build-arg AUTH0_CLIENT_ID=$AUTH0_CLIENT_ID \
  --build-arg FORCE_DEV=${FORCE_DEV} \
  --build-arg BABEL_ENV=${BABEL_ENV} \
  --build-arg NODE_ENV_CONFIG=${NODE_ENV_CONFIG} \
  --build-arg ACCOUNTS_APP_CONNECTOR_URL=${ACCOUNTS_APP_CONNECTOR_URL} \
  --build-arg ACCOUNTS_APP_LOGIN_URL=${ACCOUNTS_APP_LOGIN_URL} \
  --build-arg COMMUNITY_APP_URL=${COMMUNITY_APP_URL} \
  --build-arg MEMBER_API_URL=${MEMBER_API_URL} \
  --build-arg MEMBER_API_V3_URL=${MEMBER_API_V3_URL} \
  --build-arg ARENA_URL=${ARENA_URL} \
  --build-arg DEV_APP_URL=${DEV_APP_URL} \
  --build-arg CHALLENGE_API_URL=${CHALLENGE_API_URL} \
  --build-arg FILESTACK_API_KEY=${FILESTACK_API_KEY} \
  --build-arg FILESTACK_SUBMISSION_CONTAINER=${FILESTACK_SUBMISSION_CONTAINER} \
  --build-arg SUBMISSION_REVIEW_API_URL=${SUBMISSION_REVIEW_API_URL} \
  --build-arg REACT_APP_FILESTACK_API_KEY=${REACT_APP_FILESTACK_API_KEY} \
  .

docker create --name app $APP_NAME:latest

if [ -d node_modules ]
then
  mv package-lock.json old-package-lock.json
  docker cp app:/$APP_NAME/package-lock.json package-lock.json
  set +eo pipefail
  UPDATE_CACHE=$(cmp package-lock.json old-package-lock.json)
  set -eo pipefail
else
  UPDATE_CACHE=1
fi

if [ "$UPDATE_CACHE" == 1 ]
then
  docker cp app:/$APP_NAME/node_modules .
fi
