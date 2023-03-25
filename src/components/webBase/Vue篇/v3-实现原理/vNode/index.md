#### 基本架构

监听器 Observer

订阅者 Watcher

订阅收集 Dep

解析器 Compile

#### VNode

###### 基本属性
> tag 标签属性
> data 最后渲染成真实节点后，节点上的 class style attribute 及 绑定的事件
> children 子节点
> text 文本属性
> elm VNode对应的真实的节点
> key  为diff 提高效率

###### 创建VNode
- 执行new Vue() => 文件： src/core/instance/index.js
```javascript
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```
- Vue.prototype._init => 文件：src/core/instance/init.js
```javascript
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this

    // 省略一系列其它初始化的代码

    if (vm.$options.el) {
      console.log('vm.$options.el:',vm.$options.el);
      vm.$mount(vm.$options.el)
    }
  }
```
- Vue实例挂载 Vue.prototype.$mount => 文件 src/platforms/web/entry-runtime-with-compiler.js  =>  src/platforms/web/runtime/index.js  => src/core/instance/lifecycle.js
```javascript
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

   // 省略一系列初始化以及逻辑判断代码

  return mount.call(this, el, hydrating)
}
```
```javascript
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```
```javascript
// mountComponent 核心逻辑：先实例化一个渲染watcher，在回调函数中调用updateComponent，此方法中调用vm._render()生成一个虚拟Node，最终调用vm._update更新DOM
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  // 省略一系列其它代码
  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
      // 生成虚拟 vnode
      const vnode = vm._render()
      // 更新 DOM
      vm._update(vnode, hydrating)

    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  // 实例化一个渲染Watcher，在它的回调函数中会调用 updateComponent 方法
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  return vm
}
```

```javascript
// Vue 的 _render 方法是实例的一个私有方法，它用来把实例渲染成一个虚拟 Node。它的定义在 src/core/instance/render.js 文件中
Vue.prototype._render = function (): VNode {
    const vm: Component = this
    const { render, _parentVnode } = vm.$options
    let vnode
    try {
      // 省略一系列代码
      currentRenderingInstance = vm
      // 调用 createElement 方法来返回 vnode
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {
      handleError(e, vm, `render`){}
    }
    // set parent
    vnode.parent = _parentVnode
    console.log("vnode...:",vnode);
    return vnode
  }
```

```javascript
// Vue.js 利用 _createElement 方法创建 VNode，它定义在 src/core/vdom/create-elemenet.js 中：
export function _createElement (
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
): VNode | Array<VNode> {

  // 省略一系列非主线代码

  if (normalizationType === ALWAYS_NORMALIZE) {
    // 场景是 render 函数不是编译生成的
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    // 场景是 render 函数是编译生成的
    children = simpleNormalizeChildren(children)
  }
  let vnode, ns
  if (typeof tag === 'string') {
    let Ctor
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
    if (config.isReservedTag(tag)) {
      // 创建虚拟 vnode
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      )
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
  } else {
    vnode = createComponent(tag, data, context, children)
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns)
    if (isDef(data)) registerDeepBindings(data)
    return vnode
  } else {
    return createEmptyVNode()
  }
}
```
