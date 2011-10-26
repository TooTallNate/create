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

  var m;
  try {
    m = require('./' + ctor.name.toLowerCase())
  } catch (e) {
    throw new Error('Constructor is unknown or unimplemented: ' + ctor.name + '\n' + e)
  }

  if (!ctor.create) {

    function create () {
      var argc = arguments.length
      if (argc < 1) {
        throw new TypeError(ctor.name + ' prototype may only be an Object or null')
      }
      var objectDescriptor = arguments[--argc]
        , instance = null
        , proto = null
      if (exports.isObjectDescriptor(objectDescriptor)) {
        proto = arguments[--argc]
      } else {
        proto = objectDescriptor
        objectDescriptor = null
      }
      var instance = m.newInstance(ctor, argc, arguments)
      // Set the instance's `prototype`
      instance.__proto__ = proto
      if (objectDescriptor) {
        // If an object descriptor was passed in, define those
        Object.defineProperties(instance, objectDescriptor)
      }
      return instance
    }
    ctor.create = create
  }

  var is = 'is' + ctor.name
  if (!ctor[is]) {
    //console.error('Setting up %s.%s()', ctor.name, is)
    ctor[is] = m.getIsFunc(ctor)
  }
  return ctor
}
exports.setup = setup


/**
 * Setup getters for extending the regular natives
 */

;[Array, Boolean, Date, Function, Number, Object, RegExp, String].forEach(
function (c) {
  Object.defineProperty(exports, c.name, {
      enumerable: true
    , configurable: true
    , get: function () {
        return exports[c.name] = exports.setup(c)
      }
    , set: function (v) {
        Object.defineProperty(exports, c.name, {
            enumerable: true
          , configurable: true
          , writable: true
          , value: v
        })
      }
  })
})


/**
 * Tests for an Object Descriptor.
 * For example:
 *
 *   {
 *     foo: {
 *         enumerable: false
 *       , configurable: true
 *       , value: 'bar'
 *     }
 *   }
 */

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


/**
 * Tests for a Property Descriptor.
 * For example:
 *
 *   {
 *       enumerable: false
 *     , configurable: true
 *     , get: function () {
 *         return Math.random()
 *       }
 *   }
 */

function isPropertyDescriptor (o) {
  if (typeof o !== 'object')
  //if (typeof o !== 'object' || o === null)
    return false
  return 'value' in o
      || 'writable' in o
      || 'get' in o
      || 'set' in o
      || 'configurable' in o
      || 'enumerable' in o
}
exports.isPropertyDescriptor = isPropertyDescriptor
