# yanc-env-babel

## usage

```sh
# this package
yarn add -D "@yanc/env-babel@github:aistyler/yanc#semver:~1.0.0&workspace=@yanc/env-babel"
# dependency packages
yarn add -D @babel/cli eslint jest
```

## configutation

- package.json

```json
"yanc": {
  "envBabel": {
    "babelConfigFile": "path/to/config",
    "jestConfigFile": "path/to/config",
    "lintConfigFile": "path/to/config",
  }
}
```
