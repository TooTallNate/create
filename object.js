exports.getIsFunc = function getIsFunc (ctor) {
  return function isObject (v) {
    return Object.prototype.toString.call(v) == '[object Object]'
  }
}

exports.newInstance = function (ctor, argc, argv) {
  return new ctor
}
