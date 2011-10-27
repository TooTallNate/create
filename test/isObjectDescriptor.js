var create = require('../')
  , assert = require('assert')

var true1 = {
  foo: {
    value: 'bar'
  }
}
assert.ok(create.isObjectDescriptor(true1))

var true2 = {
  another: {
      enumerable: true
    , get: function () {}
  }
}
assert.ok(create.isObjectDescriptor(true2))


var false1 = Object.create(null)
assert.ok(!create.isObjectDescriptor(false1))

var false2 = Object.create(Object.prototype)
assert.ok(!create.isObjectDescriptor(false2))

var false3 = null
assert.ok(!create.isObjectDescriptor(false3))

var false4 = false
assert.ok(!create.isObjectDescriptor(false4))
