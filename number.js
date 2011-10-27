exports.getIsFunc = function getIsFunc (ctor) {
  return function isNumber (v) {
    return typeof v === 'number'
      || Object.prototype.toString.call(v) == '[object Number]'
  }
}

exports.newInstance = function newInstance (ctor, argc, argv) {
  if (argc === 0)
    return new ctor()
  else
    return new ctor(argv[0])
}
