const deepInsert = (input, model, returnObj, options = { strict: true }) => {
  const keys = Object.keys(model)
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i]
    // check to see if key exists in input
    if (typeof input[key] !== 'undefined') {
      // if they types are both objects, recurse with their child keys
      const objects = typeof model[key] === 'object' && typeof input[key] === 'object'
      // could be an array though
      const arrays = objects && Array.isArray(model[key]) && Array.isArray(input[key])
      // if the options are set to type strict, then make sure input and model are of the same type
      const sameType = typeof input[key] === typeof model[key] && options.strict
      // otherwise if strict is false, then as long as they aren't objects then populate
      const sameKey = typeof model[key] !== 'object' && typeof input[key] !== 'object' && !options.strict

      if (objects) {
        if (arrays) returnObj[key] = deepInsert(input[key], model[key], [], options)
        else returnObj[key] = deepInsert(input[key], model[key], {}, options)
      }
      else if (sameType || sameKey) returnObj[key] = input[key]
    }
  }
  return returnObj
}

module.exports = {
  populate: (input, model, options) => deepInsert(input, model, {}, options)
}
