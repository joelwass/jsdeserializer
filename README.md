# Tailorr 

Conform a data object to a pre-defined pattern/model, trimming all extraneous keys

Motivated by GoLang Marshall

## Usage

Install the package
```bash
$ npm install tailorr
```
#### trim(input, model [, options])

* input is the object desired to be trimmed
* model is the object that describes the pattern you'd like to trim to
* options is an optional third argument that currently takes in one key, `strict`. If strict is true or options are null, then type strictness will be applied, otherwise key value pairs that don't match type won't be populated.

This method will return a new object with all of the keys of the model with the values populated from the input object, effectively trimming the input into the model.

*If the input object does not contain the corresponding model key or the types do not match (assuming strict), the value in the return object will be set to null*

## Example
```
  const tailorr = require('tailorr')

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

  const populated = tailorr.trim(input, model, options)
  // returns { a: null, c: 'testing' }
  
```

## License
MIT