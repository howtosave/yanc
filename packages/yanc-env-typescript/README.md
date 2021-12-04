# yanc-env-typescript

Node configuration using typescript

## package stack

- eslint/prettier
- typescript

## usage

```sh
# this package
yarn add -D @yanc/env-typescript@"github:aistyler/yanc#workspace=@yanc/env-typescript&semver:^1.0.0"
# dependency packages
yarn add -D @yanc/cli@"github:aistyler/yanc#workspace=@yanc/cli&sermver:^1.0.0"
```

## configutation in package.json

```json
"scripts": {
  "dev": "yanc typescript tsc --build && node ./.cache/index.js",
  "dev:watch": "nodemon --watch ./src --ext js,ts --delay 1000ms --exec 'yarn dev'",
  "test": "echo 'NOT SUPPORTED'",
  "lint": "yanc typescript lint .",
  "lint:fix": "yarn lint --fix",
  "dist": "yanc typescript tsc -p ./tsconfig.production.json && yarn dist:type",
  "dist:type": "yanc typescript tsc --declaration --emitDeclarationOnly --outFile ./dist/types.d.ts -p ./tsconfig.production.json",
  "clean": "rm -rf ./dist ./.cache",
  "start": "node ./dist/index.js",
  "conf": "yanc typescript configure",
  "conf:reset": "yanc typescript configure --reset"
}
"devDependencies": {
  "@yanc/cli": "github:aistyler/yanc#workspace=@yanc/cli&sermver:^1.0.0",
  "@yanc/env-typescript": "github:aistyler/yanc#workspace=@yanc/env-typescript&semver:^1.0.0",
  "nodemon": "~2.0.12"
}
```
