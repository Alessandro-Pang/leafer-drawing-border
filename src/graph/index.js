/*
 * @Author: zi.yang
 * @Date: 2023-07-06 21:02:27
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-06 14:34:01
 * @Description: 
 * @FilePath: /vue-project/src/graph/index.js
 */
import { Leafer, LeaferEvent } from 'leafer-ui';

let ctrlDown = false;
const ctrlKey = 17;
const cmdKey = 91;
const vKey = 86;
const cKey = 67;

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

  function addCtrlDownListener(event) {
    if (event.keyCode == ctrlKey || event.keyCode == cmdKey) ctrlDown = true;
  }

  function removeCtrlDownListener(event) {
    if (event.keyCode == ctrlKey || event.keyCode == cmdKey) ctrlDown = false;
  }

  // TODO: copy 功能实现
  let selectedNodes = null;
  function copySelectedNode(event) {
    if (ctrlDown && (event.keyCode == cKey)) {
      selectedNodes = leafer.children.filter((node) => node?._status?.isSelected);
    }
    console.log(selectedNodes);
    if (ctrlDown && (event.keyCode == vKey)) {
      if (selectedNodes === null) return
      selectedNodes.forEach((node) => {
        leafer.children.push(node)
      })
      console.log(leafer.children);
      selectedNodes = null
    }
  }
  if (leafer.view) {
    leafer.view.setAttribute('tabindex', 0)
    leafer.view.style.outline = 0;

    leafer.view.addEventListener('keydown', addCtrlDownListener);
    leafer.view.addEventListener('keyup', removeCtrlDownListener);

    // 删除事件
    leafer.view.addEventListener('keydown', removeSelectedNode)
    // 复制事件
    // leafer.view.addEventListener('keydown', copySelectedNode);

    leafer.on(LeaferEvent.END, () => {
      leafer.view.removeEventListener('keydown', removeSelectedNode)
      // leafer.view.removeEventListener('keydown', copySelectedNode)
      leafer.view.removeEventListener('keydown', addCtrlDownListener)
      leafer.view.removeEventListener('keyup', removeCtrlDownListener)
    })
  }

  return leafer
}

export { createGraph };
