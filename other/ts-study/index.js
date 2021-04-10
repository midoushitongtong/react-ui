// const isDone: boolean = true;
// const nOrStr: number | string = 1;
// const nArr: number[] = [1];
// // tuple 元组, 规定数组中数据的类型
// const tuple: [number, string] = [0, '0'];
// // 函数声明
// function add(x: number, y: number, z?: number): number {
//   if (typeof z === 'number') {
//     return x + y + z;
//   }
//   return x + y;
// }
// // 函数表达式
// const add2: (x: number, y: number, z?: number) => number = add;
// // class
// // 类: 定义了事物的特点
// // 对象: 类的实例化
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
var Week;
(function (Week) {
    Week[Week["MONDAY"] = 0] = "MONDAY";
    Week[Week["TUESDAY"] = 1] = "TUESDAY";
    Week[Week["WEDNESDAY"] = 2] = "WEDNESDAY";
    Week[Week["THURSDAY"] = 3] = "THURSDAY";
    Week[Week["FRIDAY"] = 4] = "FRIDAY";
    Week[Week["SATURDAY"] = 5] = "SATURDAY";
    Week[Week["SUNDAY"] = 6] = "SUNDAY";
})(Week || (Week = {}));
console.log(Week.MONDAY); // 0
console.log(Week[1]); // TUESDAY
console.log(0 /* MONDAY */); // Monday
console.log("1" /* TUESDAY */); // Tuesday
