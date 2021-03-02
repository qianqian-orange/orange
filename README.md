### 可视化构建表单


### 踩坑
1. 子组件的`mounted`执行时机优先于父组件的`mounted`,所以父组件需要在`created`钩子执行`Bus.$on`,这样子组件在`mounted`执行`Bus.$emit`的时候才会触发绑定的事件
2. class原型上拓展方法，不能直接调用`class.prototype.xxx`的方式，应该使用`Object.defineProperty`, 原因可能是因为
class的原型方法都是不可枚举的，所以需要拓展的方法也需要是不可枚举的
3. `R.mergeDeepRight`方法回到对象的原型方法丢失，使用时需要注意
4. 富文本复制的字符串中带有`...`会出现问题，所以改用实体字符的方式解决，例如：`&hellip;`
5. 手动派发事件的时候创建的event对象上有很多属性都是没有的，如`pageX`,`pageY`等，那么`a-modal`组件会因为拿不到这些属性而报错，所以需要手动加上这些属性

### 优化
1. 标线距离显示待优化
2. 吸附逻辑待优化，目前是根据线的`isAdsorb`决定是否进行吸附，这样会导致当有两个相邻节点时，与其中一个吸附之后，那么另一个很可能就不会触发吸附效果了, 另一个是鼠标的位置看是否能更改
3. 快捷键
4. 悬浮菜单子菜单过渡效果与主菜单保持一致
5. 标尺位置迁移到画布中
6. 富文本组件当字体大小大于行高时会出现滚动条问题，参考墨刀的解决方案时在`p`标签添加一个`span`标签
8. 编译模块使用jsx语法，目的是优化代码和更灵活的事件绑定机制

### 待开发功能
1. 组件旋转，涉及resizer, markline等功能逻辑调整
2. 画布拖拽移动
3. 线条组件开发
4. 更多可选缩放因子

### 遗留问题
1. hoverMenu下的config.js中声明的变量看是否需要在指定时机销毁
2. 检查代码编辑器和a-modal弹窗是否又在组件destroy的时候销毁
3. dropdownmenu的配置数据和material store的数据需要销毁

### 内存泄漏问题
1. `screen`的`bootstrap`方法通过闭包的方式把`target`指向的对象保留了下来，在快照的重做撤销操作会用到，快照的保留的历史记录是有限制的，另外当快照队列是`[a, b, c, d]`时，我们回退两次，`step`指向`b`，这时候我们进行操作`e`，这时候`c`,`d`会被弹出，然后在插入`e`,这两种情况下我们应该需要手动把闭包变量的指向置为`null`，避免内存泄漏。
解决方案：给快照添加一个`free`方法，当快照被删除的时候调用这个方法就行。
2. 当快照是拖入组件产生的，那么需要注意手动调用组件的`$destroy`的方法将其释放掉。
解决方案：当`mouseWidget`组件`mounted`的时候，会派发`bootstrap`方法，将`vm`实例作为参数传出去，当快照的`free`方法被调用时，会执行`vm.$destroy`方法将其释放掉

### 脚本
1. 文件格式化：`orange/node_modules/ant-design-vue/scripts/prettier.js`

### ant-design配置
1. `a-sub-menu`可以通过配置`popup-offset`属性更改子菜单弹窗的位置，值是一个数组，如`[0, -4]`
2. `a-dropmenu`可以通过配置`overlay-class-name`属性给悬浮弹窗的容器添加类名

### 知识点
1. 如果判断鼠标右键事件
  监听`mousedown`,根据`evt.button`或者`evt.which`的值进行判断
2. 禁用鼠标右键弹窗
  监听`contextmenu`事件，调用`evt.preventDefault()`即可
3. 利用`el.contains(target)`方法判断目标节点是否在el中，取代用`identification`验证方式
4. `document.elementFromPoint(x, y)`方法可以获取处于坐标位置的最顶层节点
5. `JSON.stringify`格式化`json`代码:`JSON.stringify(data, null, 4)`

### 正则
1. `/scale\((.+?)\)/`

### 方案抉择
1. 画布缩放不使用`transform: scale(1)`是因为鼠标移动组件，组件会脱离鼠标位置，另外就是计算的时候需要时刻注意缩放因子是否有影响
