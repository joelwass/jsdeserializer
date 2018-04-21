const populate = (input, model, options = { strict: true }) => {
  const returnObj = {}
  const keys = Object.keys(model)
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i]
    // check to see if key exists in input
    if (input[key]) {
      // if they types are both objects, recurse with their child keys
      const strictObjectEquals = typeof model[key] === 'object' && typeof input[key] === 'object'
      // if the options are set to type strict, then make sure input and model are of the same type
      const strictTypeEquals = typeof input[key] === typeof model[key] && options.strict
      // otherwise if strict is false, then as long as they aren't objects then populate
      const looseTypeEquals = typeof model[key] !== 'object' && typeof input[key] !== 'object' && !options.strict

      if (strictObjectEquals) returnObj[key] = populate(input[key], model[key], options)
      else if (strictTypeEquals || looseTypeEquals) returnObj[key] = input[key]
    }
  }
  return returnObj
}

module.exports = {
  populate
}
