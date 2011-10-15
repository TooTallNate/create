/**
 * Ensure that this module doesn't touch the native `Object.create()`.
 */

var assert = require('assert')

assert.ok(!!Object.create)
var before = Object.create.toString()

require('../')(Object)

assert.ok(!!Object.create)
var after = Object.create.toString()

assert.equal(before, after)
