# yanc-env-babel

Node configuration using babel

## package stack

- babel
- eslint/prettier
- jest
- typescript

## usage

```sh
# this package
yarn add -D @yanc/env-babel@"github:aistyler/yanc#workspace=@yanc/env-babel&semver:^1.0.0"
# dependency packages
yarn add -D @yanc/cli@"github:aistyler/yanc#workspace=@yanc/cli&sermver:^1.0.0"
```

## configutation in package.json

```json
"yanc": {
  "envBabel": {
    "babelConfigFile": "path/to/config",
    "jestConfigFile": "path/to/config",
    "lintConfigFile": "path/to/config",
  }
},
"scripts": {
  "dev": "yanc babel exec ./src/index.js",
  "lint": "yanc babel lint .",
  "lint:fix": "yarn lint --fix",
  "test": "yanc babel test ./src",
  "dist": "yanc babel build ./src --out-dir ./dist --env-name production",
  "dist:clean": "rm -rf ./dist",
  "conf": "yanc babel configure",
  "conf:reset": "yanc babel configure --reset",
}
"devDependencies": {
  "@yanc/cli": "github:aistyler/yanc#workspace=@yanc/cli&sermver:^1.0.0",
  "@yanc/env-babel": "github:aistyler/yanc#workspace=@yanc/env-babel&semver:^1.0.0"
}
```
