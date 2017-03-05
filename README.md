# Per file attributes

Just a simple per-file attributes system

```js
var kv = require('file-attributes');

var attributes = kv("/path/to/disk"); // where to store

attributes.set("/home/user/documents/file.txt", JSON.stringify({
  ready: true,
  signed: false
}), function(err, data) {
  // on success/failure
});

attributes.get("/home/user/documents/file.txt", (err, data) => {
  if (err) {
    // fail
  }

  data = JSON.parse(data);
});
```

