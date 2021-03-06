- web 图标的历史

  - 雪碧图
    - 优点
      - 将多个 icon 整合在一个图片上, 只需请求一次即可
    - 缺点
      - 不能随意变换 icon 的大小, 强行变化了会丢帧
      - icon 的颜色不可控制, 变换 icon 颜色必须提供新的图片
      - 使用起来起来太麻烦, 必须用 css 获取 icon 对应的位置(因为是将多个 icon 整合在一个图片里面, 用的时候需要获取 icon 的位置)
  - font icon
    - 优点
      - 优点就是解决了雪碧图的缺点, 大小随意变化也不会丢帧, 颜色随意切换, 不需要进行定位因为本身就是个字体
    - 缺点
      - 因为是字体, 一次性需要加载整个字体文件, 如果文件太大速度会很慢
      - 如果字体加载失败, 浏览器会渲染各种一些奇怪的字符, 例如 ? 之类的
  - svg icon

    - 优点
      - 优点就是解决了 font icon 的缺点, 用的时候引入需要的 icon 即可, 不需要像 font icon 那样需要把全部 icon 引入, 也不会有加载失败出现奇怪字符的情况

- Fetch 的缺点

  - 400 500 状态码当作请求成功
  - 默认不带 cookie
  - 没办法监听进度
  - 不支持 abort，无法超时控制

- 模块化标准历史

  - CMD(Common Module Definition)，是 Nodejs 提出的一套模块化标准, 也是目前 Nodejs 正在使用的模块化标准
  - AMD(Asynchronous Module Definition), 早期民间推出的一套模块化标准, requirejs 库实现了 AMD 的标准, 主要用于浏览器中
  - ES Module, 此标准是 ECMA2015 简称 ES6 推出的一套模块化标准, 目前主流的前端模块化标准

- CI - 持续集成(continuous integration) 是什么？

  - 频繁的将代码继承到主干(master)
  - 快速发现错误
  - 防止分支大幅偏离集成

- CD - 持续部署(continuous deploy) 是什么？
  - 频繁的将软件的最新版本，交付给团队或者用户
  - 代码通过评审，自动部署到生产环境
