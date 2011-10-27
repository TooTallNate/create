exports.getIsFunc = function getIsFunc (ctor) {
  return function isBoolean (v) {
    return typeof v == 'boolean'
      || Object.prototype.toString.call(v) == '[object Boolean]'
  }
}

exports.newInstance = function newInstance (ctor, argc, argv) {
  if (argc === 0)
    return new ctor()
  else
    return new ctor(argv[0])
}
