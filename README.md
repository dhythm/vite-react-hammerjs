# Getting started

```
npm init vite@latest vite-react-hammerjs -- --template react-ts
```

# Install Hammer.js

```
npm i hammerjs
```

CAVEAT: react-hammerjs gets error if you use react@17.

# Run app

```
npm run dev
```

hammer.js seems to have an issue for pinching with chrome emulator.
https://github.com/hammerjs/hammer.js/issues/1123

It would be better to debug with iPhone / iPad in the same local network.
Thus, the running command is,

```
npm run dev -- --host
```

Then, other device can access to app.
