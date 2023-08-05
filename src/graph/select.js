/*
 * @Author: zi.yang
 * @Date: 2023-08-02 23:23:00
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-04 22:32:42
 * @Description: 
 * @FilePath: /vue-project/src/graph/select.js
 */
import { DragEvent, Rect } from 'leafer-ui';

export function dragRangeSelection(leafer) {
  const rangeRectConfig = {
    strokeWidth: 2,
    stroke: 'rgba(0,0,0)',
    fill: 'rgba(0,0,0,.3)',
  }
  let rangeRect = null
  let modalRect = null
  window.addEventListener('keydown', (evt) => {
    if (evt.ctrlKey || evt.metaKey) {
      const inner = { x: 0, y: 0 }
      leafer.innerToWorld(inner);
      console.log(leafer.x, leafer.y, { ...inner });
      modalRect = new Rect({
        ...inner,
        width: leafer.width,
        height: leafer.height,
        fill: 'rgba(0,200,200,.3)',
        zIndex: 2
      });
      leafer.add(modalRect)
    }
  })

  leafer.on(DragEvent.START, (event) => {
    if (modalRect === null) return;
    rangeRectConfig.x = event.x;
    rangeRectConfig.y = event.y;
    rangeRect = new Rect(rangeRectConfig);
    leafer.add(rangeRect)
  })


  leafer.on(DragEvent.DRAG, (event) => {
    if (rangeRect === null) return
    rangeRect.width = Math.abs(event.x - rangeRect.x)
    rangeRect.height = Math.abs(event.y - rangeRect.y)
  })

  leafer.on(DragEvent.END, (event) => {
    if (rangeRect === null) return
    const leafer = event.current.leafer;
    for (const node of leafer.children) {
      const insideX = node.x >= rangeRect.x && node.x + node.width <= rangeRect.x + rangeRect.width;
      const insideY = node.y >= rangeRect.y && node.y + node.height <= rangeRect.y + rangeRect.height;
      if (insideX && insideY) {
        console.log(node);
      }
    }
    leafer.remove(rangeRect)
    rangeRect = null;
  })

  window.addEventListener('keyup', () => {
    leafer.remove(modalRect)
    modalRect = null;
  })
}