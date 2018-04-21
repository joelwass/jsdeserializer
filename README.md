# JS Deserializer

Deserialize JSON into an object model pre-defined, removing all extraneous keys

## Usage

Install the package
```bash
$ npm install jsdeserializer
```

Call the `populate` method with the first argument being the input object and the second argument being the model you'd like to conform your data to.

There is an optional third argument, `options`. Options currently takes in one key, `strict`. If strict is true or options are null, then type strictness will be applied, otherwise key value pairs that aren't objects will be populated.

This method will return a new object with only the keys from the input object that match the model in name and type (assuming strict).
```
  const deserializer = require('jsdeserializer')

  const input = {
    a: {
      b: 'blah'
    },
    c: 'testing'
  };

  const model = {
    a: '',
    c: ''
  }

  const options = {
    strict: true
  }

  const populated = deserializer.populate(input, model, options)
  // returns { c: 'testing' }
  
```

## License
MIT