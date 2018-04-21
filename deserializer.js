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
      // model contains type, make sure input matches
      else if (typeof input[key] === typeof model[key]) {
        returnObj[key] = input[key]
      }
    }
  }
  return returnObj
}

module.exports = {
  populate: (input, model) => deepInsert(input, model, {})
}
