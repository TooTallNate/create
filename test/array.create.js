require('../')(Array)
var assert = require('assert')

var Array2Proto = Object.create(Array.prototype, {
  remove: {
    value: function (from, to) {
      var rest = this.slice((to || from) + 1 || this.length);
      this.length = from < 0 ? this.length + from : from;
      return this.push.apply(this, rest);
    }
  }
})

var one = Array.create(null)
// make sure we're *not* inheriting from Array
assert.ok('undefined' == typeof one.push)
assert.ok('undefined' == typeof one.slice)
assert.ok('undefined' == typeof one.splice)
assert.ok(!(one instanceof Array))
assert.ok(Array.isArray(one))
// test that indexes and 'length' still works properly
assert.equal(one.length, 0)
one[0] = true
assert.equal(one.length, 1)
one[1] = true
assert.equal(one.length, 2)
one[5] = true
assert.equal(one.length, 6)

var two = Array.create(Array2Proto)
// make sure we are inheriting from Array
assert.ok(two instanceof Array)
assert.ok(Array.isArray(two))
assert.equal(two.length, 0)
two[0] = true
assert.equal(two.length, 1)
two.push(true)
assert.equal(two.length, 2)
two.unshift(true)
assert.equal(two.length, 3)
// test that the 'remove()' function exists and works
two.remove(0)
assert.equal(two.length, 2)

var three = Array.create('foo', 'bar', 1, 3, 5, Array2Proto)
assert.equal(three.length, 5)
assert.equal(three[0], 'foo')
assert.equal(three[1], 'bar')
assert.equal(three[2], 1)
assert.equal(three[3], 3)
assert.equal(three[4], 5)
three.remove(0, 3)
assert.equal(three.length, 1)
