require('../')(Function)
var assert = require('assert')
  , invokeCount = 0

function impl (a, b) {
  invokeCount++
  this.a = a
  this.b = b
}

var Function2Proto = Object.create(Function.prototype, {
  test: {
    value: function () {
      console.log('test() being called')
    }
  }
})

var one = Function.create(impl, null)
  , two = Function.create(impl, Function.prototype)
  , three = Function.create(impl, Function2Proto, {
      foo: {
        value: 'bar'
      }
    })

one(1, 2)
assert.equal(invokeCount, 1)
assert.equal(Object.getPrototypeOf(one), null)
assert.equal(one.a, 1)
assert.equal(one.b, 2)

two('foo', 'bar')
assert.equal(invokeCount, 2)
assert.equal(Object.getPrototypeOf(two), Function.prototype)
assert.equal(two.a, 'foo')
assert.equal(two.b, 'bar')

three()
assert.equal(invokeCount, 3)
assert.equal(Object.getPrototypeOf(three), Function2Proto)
assert.ok('undefined' == typeof three.a)
assert.ok('undefined' == typeof three.b)
