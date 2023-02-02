export default class Example_ES6 {
  constructor (name) {
    this.name = name
  }
  init () {
    const fun = () => {
      return this.name
    }
    return fun()
  }
}