# Isomorphic ReactJS application
This repository demonstrates a simple web-application:
* single-page (SPA)
* isomorphic (pages come from the server pre-rendered; then pages get rendered on the client side by the same code)

The example demonstrates the use of
* Typescript
* ReactJS
* Webpack
* NPM
* Node.js

## Build and Run

Restore all packages in your project:
```
npm install
```

Build:
```
npm run build
```

Start:
```
cd build
node webserver.js
```

To see in use open `http://127.0.0.1/` in your browser on the same machine.

To change default TCP port, edit `src/webserver.tsx`:
```
// change TCP port
var Port: number = 80;
```
