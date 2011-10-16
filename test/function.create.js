require('../')(Function)
var assert = require('assert')
  , invokeCount = 0
  , testCalled = false

function impl (a, b) {
  invokeCount++
  this.a = a
  this.b = b
}

var Function2Proto = Object.create(Function.prototype, {
  test: {
    value: function () {
      testCalled = true
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
assert.ok('undefined' == typeof one.call)
assert.ok('undefined' == typeof one.apply)
assert.equal(invokeCount, 1)
assert.equal(Object.getPrototypeOf(one), null)
assert.equal(one.a, 1)
assert.equal(one.b, 2)
assert.ok(Function.isFunction(one))

two('foo', 'bar')
assert.ok(two instanceof Function)
assert.equal(invokeCount, 2)
assert.equal(Object.getPrototypeOf(two), Function.prototype)
assert.equal(two.a, 'foo')
assert.equal(two.b, 'bar')
assert.ok(Function.isFunction(two))

three()
assert.ok(three instanceof Function)
assert.equal(invokeCount, 3)
assert.equal(Object.getPrototypeOf(three), Function2Proto)
assert.equal(three.foo, 'bar')
assert.ok('undefined' == typeof three.a)
assert.ok('undefined' == typeof three.b)
assert.ok(Function.isFunction(three))

assert.ok(!testCalled)
three.test()
assert.ok(testCalled)
