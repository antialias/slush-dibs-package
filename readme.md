## description
slush-dibs-package is a [`slush`](https://www.npmjs.com/package/slush) scaffold for 1stdibs npm packages. Use it to quickly instantiate a standard npm package for 1stdibs.

## installation
requires global install of `slush`:
```bash
npm install -g slush
```

### for usage:
`slush-dibs-package` has not yet been published as an npm package. Please see the instructions under "for development" to get going for now.

### for development:
```bash
git clone https://github.com/antialias/slush-dibs-package
cd slush-dibs-package
npm link # exposes slush-dibs-package as a globally-installed package so slush can find it
```

## usage
```bash
mkdir my-new-package
cd my-new-package
slush dibs-package
 # you will be prompted for your package name and description
 # scaffold template is instantiated into the current directory and npm pacakges are installed according to package.json
 # now you are ready to start coding!
```

## development
The scaffolding files are located in `templates/app` and are interperited as underscore templates as they are instantiated into the new pacakge directory. Template variables are computed inside of the slushfile.

### now you can do some nice things:
```bash
npm run lint
 # dibslint lints your source according to dibs-eslint-config

npm test
 # mocha runs all specs inside of `./test`
```

## scaffold structure
```bash
% tree -a templates/app
templates/app
├── .gitignore
├── .npmrc
├── index.js
├── package.json
└── test
    └── specs.js
```
