const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

express.static.mime.types.wasm = 'application/wasm';

app.use(express.static(path.resolve(__dirname, '../')));
console.log('Serving on', PORT)
app.listen(PORT);
