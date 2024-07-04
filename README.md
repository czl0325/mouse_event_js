# mouse_event_js
鼠标的单击双击事件，右键双击事件的hook
<br><br><br>

#### 支持npm安装

`npm install mouse_event_js --save`

#### useMouseEvent 鼠标左键点击和双击事件

| 参数 | 说明              | 类型 | 默认值 |
|----|-----------------| --- | --- |
| el | 需要响应鼠标事件的html元素 | HTMLElement | - |
| clickHandler | 单击事件的回调函数 | (event: MouseEvent)=>void | - |
| dbClickHandler | 双击事件的回调函数 | (event: MouseEvent)=>void | - |

<br><br>

#### useMouseRightDbClick 鼠标右键双击事件

| 参数 | 说明             | 类型 | 默认值 |
|----|----------------| --- | --- |
| el | 需要响应鼠标事件的html元素 | HTMLElement | - |
| callback | 双击事件的回调函数      | (e: MouseEvent) => void | - |
