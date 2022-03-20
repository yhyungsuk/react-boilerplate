tests:
	@/usr/bin/time yarn test

local:
	@/usr/bin/time yarn dev

build-production:
	@/usr/bin/time yarn build

build-dev:
	@/usr/bin/time yarn build --mode dev
