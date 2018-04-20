const deserializer = require('./deserializer')
const should = require('should')
const deepEqual = require('lodash.isequal')

const shouldDeserializeMatchingObjects = () => {
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

  const ret = deserializer.assemble(input, model)
  // return value should match the input object because all keys existed in the model
  deepEqual(ret, input).should.equal(true)
}

const shouldDeserializeNonMatching = () => {
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
}

shouldDeserializeMatchingObjects()
shouldDeserializeNonMatching()