FROM node:17-alpine3.14

ARG MODE
ENV ENV_MODE=$MODE

ARG BACKEND_URL
ENV ENV_BACKEND_URL=$BACKEND_URL

WORKDIR /app
RUN apk add --update xdg-utils

COPY . .
RUN sed -i 's/"postinstall":.*/"postinstall": ""/' package.json
RUN rm -rf node_modules coverage dist *.iml
RUN yarn install

RUN touch ".env.$ENV_MODE"
RUN echo "VITE_BACKEND_BASE_URL=$ENV_BACKEND_URL" > ".env.$ENV_MODE"
RUN sed -i "s/production/${ENV_MODE}/g" vite.config.js
RUN yarn build --mode $ENV_MODE

EXPOSE 8000
CMD ["yarn", "serve"]
