# React Boilerplate

## Specs

- React
- Vite
- Jest + Faker
- Prettier + Husky

## Dependencies Setup

- Optimized for Yarn
- Supports offline install

### How to Disable Offline Mode

- Remove ./.yarnrc
- Remove ./npm_packages
- Remove `reset` script from ./package.json
- Add `^` to all package versions(or other semver annotations)
- Reinstall all npm packages using `yarn install`

## Starting Guide

- Local server proxy is set up by Vite. Refer to `service_backend` in ./vite.config.js as an example.
- Environment variables can be injected using .env files and `replace` plugin in ./vite.config.js.
- Static files can be served locally by Vite by placing them under ./public directory. These files are copied to ./dist directory along with others as part of production build result.

## Build

- `vite dev` assumes Vite `MODE=dev`
- `vite build` assumes Vite `MODE=production`, `NODE_ENV=production`
- Run `yarn build` with `--mode [dev/production]` for specific build

##### Note

- Production preview server runs on port 8000 instead of 5000 due to Apple Airplay [issue](https://developer.apple.com/forums/thread/682332). Remove or change port option in `serve` script in ./package.json if needed.
