import { onBeforeUnmount } from "vue"

export const useMouseEvent = (el: HTMLElement, clickHandler: (event: MouseEvent)=>void, dbClickHandler: (event: MouseEvent)=>void) => {
  let clickCount = 0
  let startX: number = 0
  let startY: number = 0
  const onMouseDown = (event: MouseEvent) => {
    if (event.button !== 0) {
      return
    }
    startX = event.clientX
    startY = event.clientY
  }
  const onMouseUp = (event: MouseEvent) => {
    if (event.button !== 0) {
      return
    }
    const endX = event.clientX;
    const endY = event.clientY;
    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    if (distance < 10) {
      clickCount++;
      setTimeout(function() {
        if (clickCount === 1) {
          clickHandler(event)
        }
        clickCount = 0
      }, 500)
    }
  }
  const onDoubleClick = (event: MouseEvent) => {
    clickCount = 0
    dbClickHandler(event)
  }
  el.addEventListener("mousedown", onMouseDown)
  el.addEventListener("mouseup", onMouseUp)
  el.addEventListener("dblclick", onDoubleClick)
  onBeforeUnmount(() => {
    el.removeEventListener("mousedown", onMouseDown)
    el.removeEventListener("mouseup", onMouseUp)
    el.removeEventListener("dblclick", onDoubleClick)
  })
}

export default function useMouseRightDbClick(el: HTMLElement, callback: (e: MouseEvent) => void) {
  let lastClickTime = 0
  let clickCount = 0
  const mouseUpEvent = new MouseEvent('mouseup', {
    button: 2, // 2 表示右键
    bubbles: true,
    cancelable: true,
  });
  const rightDbClick = (event: MouseEvent) => {
    if (event.button === 2) { // 检测右键
      const currentTime = new Date().getTime();
      if (currentTime - lastClickTime < 300) {
        clickCount += 1;
        if (clickCount === 2) {
          if (callback) {
            callback(event)
          }
        }
      } else {
        clickCount = 1;
      }
      lastClickTime = currentTime;
    }
  }
  el.dispatchEvent(mouseUpEvent);
  el.addEventListener('mouseup', rightDbClick)
  el.addEventListener("contextmenu", (event) => {
    event.preventDefault()
  })
  onBeforeUnmount(() => {
    el.dispatchEvent(mouseUpEvent)
    el.removeEventListener('mouseup', rightDbClick)
  })
}
