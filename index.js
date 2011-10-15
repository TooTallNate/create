/**
 * Extends a variable number of native constructors (i.e. `Function`, `Array`,
 * `Number`, etc.) with the `create()` function
 */

exports = module.exports = function () {
  for (var i=0, l=arguments.length; i<l; i++) {
    setup(arguments[i])
  }
}

/**
 * Internal function that does that actual extending. You normally just invoke
 * this module's exports as a function instead. These are equivalent:
 *
 * ```
 * require('create')(Function)
 * require('create').setup(Function)
 * ```
 *
 * @private true
 */

function setup (ctor) {
  //console.error('Setting Up: %s', ctor.name)
  if (ctor.create) {
    //console.error('create() already exists; bail')
    return
  }

  switch (ctor.name) {
    case 'Function':
      setupFunction(ctor)
      break;

    case 'RegExp':
      setupRegexp(ctor)
      break;

    default:
      throw new Error('unknown constructor: ' + ctor.name)
  }

  return ctor
}
exports.setup = setup

/**
 * Extends the Function constructor
 */

function setupFunction (ctor) {

  function create () {
    console.error(arguments)
    var argv = arguments.length
    if (argv < 2) {
      throw new Error('Function.create() requires at least 2 arguments.')
    }
    var objectDescriptor = arguments[argv - 1]
      , instance = null
      , proto = null
    if (exports.isObjectDescriptor(objectDescriptor)) {
      proto = arguments[argv - 2]
    } else {
      proto = objectDescriptor
      objectDescriptor = null
    }

    // This is the actual instance
    var instance = null
    instance = function () {

    }
    return instance
  }
  ctor.create = create
}



function isObjectDescriptor (o) {
  if (typeof o !== 'object' || o === null)
    return false
  for (var i in o) {
    if (!Object.prototype.hasOwnProperty.call(o, i))
      continue
    if (!exports.isPropertyDescriptor(o[i]))
      return false
  }
  if (!i) return false
  return true
}
exports.isObjectDescriptor = isObjectDescriptor


function isPropertyDescriptor (o) {
  if (typeof o !== 'object')
    return false
  return 'value' in o
      || 'writable' in o
      || 'get' in o
      || 'set' in o
      || 'configurable' in o
      || 'enumerable' in o
}
exports.isPropertyDescriptor = isPropertyDescriptor
