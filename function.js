exports.getIsFunc = function getIsFunc (ctor) {
  return function isFunction (v) {
    return v instanceof ctor
      || typeof v === 'function'
      || Object.prototype.toString.call(v) == '[object Function]'
  }
}

exports.newInstance = function newInstance (ctor, argc, argv) {
  var func = argv[0]
  if (typeof func === 'function') {
    var instance = function () {
      return func.apply(instance, arguments)
    }
    return instance
  } else {
    throw new Error('TODO: invoke the constructor')
  }
}
