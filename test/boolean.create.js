require('../')(Boolean)
var assert = require('assert')

var BoolProto = Object.create(Boolean.prototype)

// Negating function
BoolProto.not = function not () {
  return !Boolean.prototype.valueOf.call(this)
}


var one = Boolean.create(false, null)
assert.throws(function () {
  one + 0
})


var two = Boolean.create(false, BoolProto)
assert.ok(two instanceof Boolean)
assert.equal(two, false)
assert.equal(two.valueOf(), false)
assert.equal(two.not(), true)

var three = Boolean.create(true, BoolProto)
assert.ok(three instanceof Boolean)
assert.equal(three, true)
assert.equal(three.valueOf(), true)
assert.equal(three.not(), false)
