exports.getIsFunc = function getIsFunc (ctor) {
  return function isDate (v) {
    return typeof v == 'object'
      && Object.prototype.toString.call(v) == '[object Date]'
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
    case 3:
      return new ctor(argv[0], argv[1], argv[2])
    case 4:
      return new ctor(argv[0], argv[1], argv[2], argv[3])
    case 5:
      return new ctor(argv[0], argv[1], argv[2], argv[3], argv[4])
    case 6:
      return new ctor(argv[0], argv[1], argv[2], argv[3], argv[4], argv[5])
    case 7:
      return new ctor(argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6])
  }
}
