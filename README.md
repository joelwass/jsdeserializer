# JS Deserializer

Deserialize JSON into an object model pre-defined, removing all extraneous keys

## Usage

Install the package
```bash
$ npm install jsdeserializer
```

Call the `populate` method with the first argument being the input object and the second argument being the model you'd like to conform your data to.

This method will return a new object with only the keys from the input object that match the model in name and type.
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

  const populated = deserializer.populate(input, model)
  // returns { c: 'testing' }
  
```

## License
MIT