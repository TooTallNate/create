exports.getIsFunc = function getIsFunc (ctor) {
  return function isObject (v) {
    return typeof v == 'object'
      && Object.prototype.toString.call(v) == '[object Object]'
  }
}

exports.newInstance = function (ctor, argc, argv) {
  return new ctor
}
