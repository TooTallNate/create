exports.getIsFunc = function getIsFunc (ctor) {
  return Array.isArray
}

exports.newInstance = function newInstance (ctor, argc, argv) {
  var len = argv[0]
  if ('number' == typeof len) {
    return new ctor(len)
  } else {
    var instance = new ctor
    for (var i=0; i<argc; i++) {
      instance[i] = argv[i]
    }
    return instance
  }
}
