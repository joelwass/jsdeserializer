const deepInsert = (input, model, returnObj) => {
  const keys = Object.keys(model)
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i]
    // check to see if key exists in input
    if (input[key]) {
      // need to look inside, can't just set them equal, need to make sure child keys are also in the model
      if (typeof model[key] === 'object' && typeof input[key] === 'object') {
        // recurse
        returnObj[key] = {}
        returnObj[key] = deepInsert(input[key], model[key], returnObj[key])
      }
      else if (typeof model[key] !== 'object' && typeof input[key] !== 'object') {
        returnObj[key] = input[key]
        return returnObj
      }
    }
  }
}

module.exports = {
  assemble: (input, model) => deepInsert(input, model, {})
}
