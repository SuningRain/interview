export class Foo {
  arr: any[]
  constructor(arr: any[]) {
      this.arr = arr;
  }
  bar(n: any) {
      return this.arr.slice(0, n);
  }
}
// var f = new Foo([0, 1, 2,  3]);
// console.log(f.bar(1)); // [0]
// console.log(f.bar(2).splice(1, 1)); // [1]
// console.log(f.arr); // [0, 1, 2, 3]