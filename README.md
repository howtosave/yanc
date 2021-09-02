# yanc

Yet Another Node Configuration

`N.B.`

```txt
This package will be work only under yarn berry `node-modules` mode.
```

## usage

### use yarn berry

```sh
yarn set version berry
echo "nodeLinker: node-modules" >> .yarnrc.yml
```

### configure package.json

```json
"scripts": {
  "dev": "yanc babel exec ./src/index.ts",
  "test": "yanc babel test .",
  "lint": "yanc babel lint .",
  "lint:fix": "yarn lint --fix",
  "dist": "yanc babel build ./src -x .js,.ts --out-dir ./dist --env-name production",
  "dist:clean": "rm -rf ./dist",
  "start": "node ./dist/index.js",
  "conf": "yanc babel configure",
  "conf:reset": "yanc babel configure --reset"
}
"devDependencies": {
  "@yanc/cli": "github:aistyler/yanc#workspace=@yanc/cli&sermver:^1.0.0",
  "@yanc/env-babel": "github:aistyler/yanc#workspace=@yanc/env-babel&semver:^1.0.0"
}
```

### scripts commands description

```sh
# execute .js or .ts using babel
yarn dev

# test using jest
yarn test

# lint using eslint
yarn lint

# build using babel
yarn dist

# execute transpiled .js
yarn start

# manually export config files
yarn conf
# *CAUTION*: overwrite the existing config files
yarn conf:reset

# install @yanc/cli
yarn add -D @yanc/cli@"github:aistyler/yanc#workspace=@yanc/cli&sermver:^1.0.0"

# install @yanc/env-babel
yarn add -D @yanc/env-babel@"github:aistyler/yanc#workspace=@yanc/env-babel&sermver:^1.0.0"
```
