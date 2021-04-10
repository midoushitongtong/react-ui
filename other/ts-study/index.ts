// const isDone: boolean = true;

// const nOrStr: number | string = 1;

// const nArr: number[] = [1];

// tuple 元组, 规定数组中数据的类型
// const tuple: [number, string] = [0, '0'];

// 函数声明
// function add(x: number, y: number, z?: number): number {
//   if (typeof z === 'number') {
//     return x + y + z;
//   }
//   return x + y;
// }

// 函数表达式
// const add2: (x: number, y: number, z?: number) => number = add;

// class
// 类: 定义了事物的特点
// 对象: 类的实例化
// class Parent {
//   // 访问修饰符(默认是 public)
//   protected name: string;

//   // 只读
//   readonly age = 1;

//   // 静态(无需实例化就能访问)
//   static sex = 'man';

//   constructor(name: string) {
//     this.name = name;
//   }

//   run() {
//     return this.name;
//   }
// }

// class Children extends Parent {
//   run() {
//     return this.name + 'bbb';
//   }

//   run2() {
//     return super.run() + this.name;
//   }
// }

// console.log(new Children('aaa').run2());
// console.log(new Children('aaa').run());
// console.log(new Children('aaa').age);
// console.log(Children.sex);

// interface MailSend {
//   send: (mail: string) => void;
// }

// interface MailReceive {
//   receive: (mail: string) => void;
// }

// class Provider1Mail implements MailSend {
//   send = (mail: string): void => {
//     console.log(mail);
//   };
// }

// class Provider2Mail implements MailSend, MailReceive {
//   send = (mail: string) => {
//     console.log(mail);
//   };

//   receive = (mail: string) => {
//     console.log(mail);
//   };
// }

// new Provider1Mail().send('1');
// new Provider2Mail().send('2');
// new Provider2Mail().receive('2');

// 枚举(一定范围内不可变的值)

// enum Week {
//   MONDAY,
//   TUESDAY,
//   WEDNESDAY,
//   THURSDAY,
//   FRIDAY,
//   SATURDAY,
//   SUNDAY,
// }

// console.log(Week.MONDAY); // 0
// console.log(Week[1]); // TUESDAY

// const enum Week2 {
//   MONDAY = 'Monday',
//   TUESDAY = 'Tuesday',
//   WEDNESDAY = 'Wednesday',
//   THURSDAY = 'Thursday',
//   FRIDAY = 'Friday',
//   SATURDAY = 'Saturday',
//   SUNDAY = 'Sunday',
// }

// console.log(Week2.MONDAY); // Monday
// console.log(Week2.TUESDAY); // Tuesday

// function echo<T>(arg: T): T {
//   return arg;
// }

// console.log(echo(1));

// function swap<T, U>(tuple: [T, U]): [U, T] {
//   return [tuple[1], tuple[0]];
// }

// console.log(
//   swap<number, string>([1, '2'])
// );

// 约束
// function echo<
//   T extends {
//     length: number;
//   }
// >(arg: T): T {
//   console.log(arg.length);
//   return arg;
// }

// echo('1');

// class Queue<T> {
//   private data: T[] = [];

//   push(item: T) {
//     return this.data.push(item);
//   }

//   pop(): T {
//     return this.data.shift();
//   }
// }

// const q = new Queue<string>();

// console.log(q.push('1'));
// console.log(q.push('2'));
// console.log(q.pop());

// interface KeyPair<T, U> {
//   key: T;
//   value: U;
// }

// let kp1: KeyPair<number, string> = {
//   key: 1,
//   value: '2',
// };

// 用 Array interface 来约束数组
// const arr: Array<number> = [];

// const arr2: number[] = [];

// interface Plus<T> {
//   (a: T, b: T): T;
// }

// const a: Plus<number> = function plus(a, b) {
//   return a + b;
// };

// const b: Plus<string> = (a, b) => {
//   return a + b;
// };

// console.log(a(1, 2));
// console.log(b('a', 'b'));

// interface Person {
//   readonly id: number;
//   name: string;
// }

// const p: Person = {
//   id: 1,
//   name: '1',
// };

// console.log(p);

// 类型别名
// type Sum = (x: number, y: number) => number;

// const sum: Sum = (x: number, y: number): number => {
//   return x + y;
// };

// const sum2: Sum = sum;

// 联合类型
// type Sex = '电脑' | '手机';

// const s: Sex = '电脑';

// 断言
// function getLength(arg: string | number): number {
// const str = arg as String;
// if (str.length) {
//   return str.length;
// } else {
//   return arg.toString().length;
// }

// 简化的写法
//   if ((<string>arg).length) {
//     return (<string>arg).length;
//   } else {
//     return arg.toString().length;
//   }
// }

// console.log(getLength(''));

// jQuery('1');
