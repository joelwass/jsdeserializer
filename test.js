const test = require('ava')
const deserializer = require('./deserializer')

test('deserialize objects that match a model', (t) => {
  const input = {
    a: {
      b: 'blah'
    },
    c: 'testing'
  };

  const model = {
    a: {
      b: ''
    },
    c: ''
  }

  const populated = deserializer.populate(input, model)
  // return value should match the input object
  // because all keys existed in the model and were the same type
  t.deepEqual(input, populated)
})

test('deserialize objects that do not match a model', (t) => {
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

  const ret = deserializer.populate(input, model)
  // return value won't have b because it wasn't in the model
  // and it won't have a because the model type for a was a string
  t.deepEqual(ret, { c: 'testing' })
})

test('deserialize deep objects that do not match a model', (t) => {
  const input = {
    a: {
      b: {
        hello: 'world'
      }
    },
    c: 'testing',
    d: 0
  };

  const model = {
    a: {
      b: {
        hello: ''
      }
    },
    c: '',
    d: ''
  }

  const ret = deserializer.populate(input, model)
  // return value won't have b because it wasn't in the model
  // and it won't have a because the model type for a was a string
  t.deepEqual(ret, { 
    a: {
      b: {
        hello: 'world'
      }
    },
    c: 'testing'
   })
})

test('deserialize object that differ from model by type only', (t) => {
  const input = {
    a: {
      b: 'blah'
    },
    c: 'testing',
    d: 'not a number',
    e: 'a string'
  };

  const model = {
    a: {
      b: ''
    },
    c: '',
    d: 0,
    e: ''
  }

  const options = { strict: true }

  const ret = deserializer.populate(input, model, options)
  // d's type doesn't match the model, so it will be left out
  t.deepEqual(ret, {
    a: {
      b: 'blah'
    },
    c: 'testing',
    e: 'a string'
  })
})

test('deserialize object that differ from model by type but strict is set to false', (t) => {
  const input = {
    a: {
      b: 'blah'
    },
    c: 'testing',
    d: 'not a number',
    e: 'a string'
  };

  const model = {
    a: {
      b: ''
    },
    c: '',
    d: 0,
    e: ''
  }

  const options = { strict: false }

  const ret = deserializer.populate(input, model, options)
  // d's type doesn't match the model but it will be left in (strict:false)
  t.deepEqual(ret, {
    a: {
      b: 'blah'
    },
    c: 'testing',
    d: 'not a number',
    e: 'a string'
  })
})

test('deserialize object that contains arrays', (t) => {
  const input = {
    a: {
      b: ['blah', ['a nested array']]
    },
    c: 'testing',
    d: [ { x: 'object in array' }, { y: 'another one' } ],
    e: 'a string'
  };

  const model = {
    a: {
      b: ['', ['']]
    },
    c: '',
    d: [ { x: '', }, { y: '' } ],
  }

  const options = { strict: true }

  const ret = deserializer.populate(input, model, options)
  // should remove e but nothing else
  t.deepEqual(ret, {
    a: {
      b: ['blah', ['a nested array']]
    },
    c: 'testing',
    d: [ { x: 'object in array' }, { y: 'another one' } ]
  })
})