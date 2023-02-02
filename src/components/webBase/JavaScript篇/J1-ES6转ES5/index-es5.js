export default function Example_ES5 (name) {
  'use strict'
  if (!new.target) {
    throw new TypeError('Class constructor cannot be invoked without new')
  }
  this.name = name
}

Object.defineProperty(Example_ES5.prototype, 'init', {
  enumerable: false,
  value: function () {
    'use strict'
    if (new.target) {
      throw new TypeError('init is not a constructor')
    }
    var fun = function () {
      return this.name
    }
    return fun.call(this)
  }
})
