# hpp-clean

An up-to-date alternative to the deprecated [hpp](https://www.npmjs.com/package/hpp) package.  
Express 5+ middleware to protect against HTTP Parameter Pollution (HPP).

## Installation

```bash
npm install hpp-clean
```
 ## Usage
```js
const express = require('express');
const hpp = require('hpp-clean');
const qs = require('qs');

const app = express();

app.use(express.json());
app.use(hpp());
app.set('query parser', (str) => qs.parse(str));

app.get('/', (req, res) => {
  res.json({
    query: req.query,
    queryPolluted: req.queryPolluted,
  });
});

app.post('/', (req, res) => {
  res.json({
    body: req.body,
    bodyPolluted: req.bodyPolluted,
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```
## Options
- whitelist: string[] → keys allowed to keep multiple values.
- keepFirst: boolean → if true, keeps the first value instead of the last.
```js
app.use(hpp({
  whitelist: ["tags"],  // allow multiple values for "tags"
  keepFirst: true      // keep the first value (by default it keeps the last one)
}))
```
## Why?
- hpp is deprecated and doesn’t work with Express 5.
- hpp-clean is a modern drop-in replacement.
## License
MIT © 2025 Mohammad Kalhor