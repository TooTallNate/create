create
=========
### The missing Native.create() functions that ECMA forgot.

`create` is a module for node.js (and someday the browser too) that implements the
*"missing"* `.create()` functions on the rest of the native data types in
JavaScript.

There's already `Object.create()`. So why not `Array.create()`? Or
`Function.create()`? Well that's exactly what this module adds functionality for.

In essense, this gives you a clean interface for subclassing the native classes,
and also gets all the same benefits that `Object.create()` gives you, like setting
the prototype at creation-time, and being able to pass an object descriptor in to
define additional properties.

When you require the module, you invoke it as a function and pass in any native
classes you want extended with a `.create()` function. This can be done with
*any* of the native types.


Installation
------------

Install with `npm`:

``` bash
$ npm install create
```


Example
-------

Let's make a subclass of `Array`, that includes a `remove()` function:

``` js
require('create')(Array)

// `Array2` is the prototype of our subclass
var Array2 = Object.create(Array.prototype)

// remove() impl from http://ejohn.org/blog/javascript-array-remove
Array2.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
}


// now we can create an instance of Array2
var a = Array.create(Array2)

// add some items to it
a.push(1, 2, 3)
a.push('foo', 'bar')
// [1, 2, 3, 'foo', 'bar']

a.remove(1)
// [1, 3, 'foo', 'bar']
```


Limitations
-----------

This module depends on the writability of the `__proto__` property on objects.
From a browser standpoint, this module will only work in browsers where that is
true (`__proto__` *MAY* be changed). In node this will _always_ work.
