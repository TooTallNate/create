create
=========
### The missing Native.create() functions that ECMA forgot.

`create` is a module or node.js (and someday the browser too) that implements the
*"missing"* `.create()` functions on the rest of the native data types in
JavaScript.

There's already `Object.create()`. So why not `Array.create()`? Or
`Function.create()`? Well that's exactly what this module adds functionality for.

In essense, this gives you a clean way to subclass the native classes, and get
all the same benefits that `Object.create()` gives you.


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
Array2.remove = function (index) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
}


// now we can create an instance of Array2
var a = Array.create(Array2)

// add some items to it
a.push(1, 2, 3, 'foo', 'bar')
// [1, 2, 3, 'foo', 'bar']

a.remove(2, 3)
// [1, 2, 'bar']
```
