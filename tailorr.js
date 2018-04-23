const populate = (input, model, returnObj, options = { strict: true }) => {
  const keys = Object.keys(model)
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i]
    returnObj[key] = null
    // if they types are both objects, recurse with their child keys
    const objects = typeof model[key] === 'object'
    // could be an array though
    const arrays = objects && Array.isArray(model[key])
    // if the options are set to type strict, then make sure input and model are of the same type
    const sameKeyStrict = typeof input[key] === typeof model[key] && options.strict
    // otherwise if strict is false, then as long as they aren't objects then populate
    const sameKey = typeof model[key] !== 'object' && typeof input[key] !== 'object' && !options.strict

    if (objects) {
      if (arrays) returnObj[key] = populate(input[key] || [], model[key], [], options)
      else returnObj[key] = populate(input[key] || {}, model[key], {}, options)
    }
    else if (sameKeyStrict || sameKey) returnObj[key] = input[key]
  }
  return returnObj
}

module.exports = {
  trim: (input, model, options) => populate(input, model, {}, options)
}
