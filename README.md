### JS Deserializer

Deserialize json into an object model pre defined, removing all extraneous information

# Usage

Install the package
* `$ npm -i --save jsdeserializer`

Call deserializer.assemble with the first argument being the input JSON object and the second argument being the model you'd like to conform your data to.

This method will return a JSON object
```
  const deserializer = require('./deserializer')

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

  const ret = deserializer.assemble(input, model)
  // return value should not match the input object because keys in the model existed, but were not the same type of the input
  deepEqual(ret, {c: 'testing'}).should.equal(true)
```

# License
MIT