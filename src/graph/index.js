/*
 * @Author: zi.yang
 * @Date: 2023-07-06 21:02:27
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 21:30:54
 * @Description: 
 * @FilePath: /vue-project/src/graph/index.js
 */
import { Leafer, LeaferEvent } from 'leafer-ui';

const createGraph = (view) => {
  // 实例应用
  const leafer = new Leafer({
    view,
    fill: 'transparent',
    wheel: false,
    move: { dragEmpty: true },
  })

  // leafer.on('click', (e) => console.log(e.x, e.y))
  // dragRangeSelection(leafer);

  // 删除选中节点
  function removeSelectedNode(event) {
    if ([8, 46].includes(event.keyCode)) {
      leafer.children?.forEach(node => {
        if (node._status.isSelected) {
          leafer.remove(node);
        }
      });
    }
  }
  window.addEventListener('keydown', removeSelectedNode)
  leafer.on(LeaferEvent.END, () => {
    window.removeEventListener('keydown', removeSelectedNode)
  })

  return leafer
}

export { createGraph };
