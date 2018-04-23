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
* Options is an optional third argument that currently takes in one key, `strict`. If strict is true or options are null, then type strictness will be applied, otherwise key value pairs that don't match type won't be populated.

This method will return a new object with only the keys from the input object that match the model in name and type (assuming strict).

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
  // returns { c: 'testing' }
  
```

## License
MIT