exports.getIsFunc = function getIsFunc (ctor) {
  return function isFunction (v) {
    return typeof v === 'function'
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
    return ctor.apply(null, Array.prototype.slice.call(argv, 0, argc))
  }
}
