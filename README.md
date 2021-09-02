# yanc

Yet Another Node Configuration

## usage

```sh
# use yarn berry
yarn set version berry
echo "nodeLinker: node-modules" >> .yarnrc.yml

# @yanc/cli
yarn add -D @yanc/cli@"github:aistyler/yanc#workspace=@yanc/cli&sermver:^1.0.0"

# @yanc/env-babel
yarn add -D @yanc/env-babel@"github:aistyler/yanc#workspace=@yanc/env-babel&sermver:^1.0.0"

# lint using eslint
yarn yanc babel lint .

# test using jest
yarn yanc babel test

# build using babel
yarn yanc babel build

# node using babel transfile on the fly
yarn yanc babel node index.ts

# export config files
yarn yanc babel configure

# dependency packages
yarn add -D @babel/cli eslint jest
```

## configutation

- package.json

```json
"yanc": {
  "verbose": false
}
```

## scripts in package.json

```json
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
```
