exports.getIsFunc = function getIsFunc (ctor) {
  return function isRegExp (v) {
    return typeof v == 'object'
      && Object.prototype.toString.call(v) == '[object RegExp]'
  }
}

exports.newInstance = function newInstance (ctor, argc, argv) {
  switch (argc) {
    case 0:
      return new ctor()
    case 1:
      return new ctor(argv[0])
    case 2:
      return new ctor(argv[0], argv[1])
  }
}
