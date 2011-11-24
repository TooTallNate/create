require('../')(Array)

var assert = require('assert')
  , Array2Proto = Object.create(Array.prototype)

function Array2 () {
  return Array.create(Array2Proto)
}
Array2.prototype = Array2Proto;

var a = new Array2()
  , b = Array2()
assert.ok(a instanceof Array) // true
assert.ok(a instanceof Array2) // true
assert.ok(b instanceof Array) // true
assert.ok(b instanceof Array2) // true
