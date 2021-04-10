##### hook 是什么

- 如果一个函数组件(Function Component)需要某些外部的功能或副作用, 就用钩子把外部代码钩进来, React Hook 就是些这钩子, `简而言之就是能让函数组件也能拥有自己的 状态 以及 生命周期`

##### 为什么用 hook

- 从代码层面上避免了组件嵌套的问题
  - 例如: 如果项目中使用了 react-redux, 用 class 写法就必须在外部包一层(HOC), 用 hook 的写法则不需要包一层, 只需要将 redux 相关的代码钩进来用即可, 这里只是举一个例子, 实际项目中肯定不止像 react-redux 这种一层的嵌套

##### hook 规则

- 只能在函数的最顶层使用 hook, 不能再 if for switch 这些条件语句中使用 hook
- 只能在函数中调用 hook, class 中不能调用 hook

##### 参考自

- https://www.ruanyifeng.com/blog/2019/09/react-hooks.html
