# INSTALL DEPENDENCIES
FROM node:16-alpine3.15 as YARN_INSTALL

WORKDIR /app
RUN apk add --update xdg-utils

COPY ["package.json", ".yarnrc", "yarn.lock", "./"]
COPY npm_packages ./npm_packages
RUN sed -i 's/"postinstall":.*//' package.json
RUN yarn install --offline


# BUILD
FROM node:16-alpine3.15 as YARN_BUILD
WORKDIR /app

ARG MODE
ENV ENV_MODE=$MODE
ARG BACKEND_URL
ENV ENV_BACKEND_URL=$BACKEND_URL

COPY --from=YARN_INSTALL /app/node_modules /app/node_modules
COPY [".babelrc", ".env", ".env.production", ".env.stage", "index.html", "jest.config.js", "jest.setup.js", "Makefile", "package.json", "tsconfig.json", "tsconfig.node.json", "vite.config.ts", "./"]
COPY .storybook ./.storybook
COPY public ./public
COPY src ./src

RUN touch ".env.$ENV_MODE"
RUN echo "VITE_BACKEND_BASE_URL=$ENV_BACKEND_URL" > ".env.$ENV_MODE"
RUN sed -i "s/open: true,//g" vite.config.ts
RUN sed -i "s/production/${ENV_MODE}/g" vite.config.ts
RUN sed -i 's/"postinstall":.*//' package.json
RUN yarn build --mode $ENV_MODE

EXPOSE 8000
CMD ["yarn", "serve"]
