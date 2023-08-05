/*
 * @Author: zi.yang
 * @Date: 2023-08-02 23:23:58
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 20:53:09
 * @Description: 
 * @FilePath: /vue-project/src/graph/utils.js
 */

export function toRaw(val) {
  return Object.prototype.toString.call(val)
}

export function getType(val) {
  return toRaw(val).slice(8, -1).toLowerCase();
}

/**
 * 
 * @param {*} event 
 * @returns 
 */
export function findInsideNode(event) {
  const leafer = event?.current?.leafer;
  if (!leafer || !Array.isArray(leafer.children)) return null
  for (const node of leafer.children) {
    const insideX = node.x <= event.x && node.x + node.width >= event.x;
    const insideY = node.y <= event.y && node.y + node.height >= event.y;
    if (insideX && insideY) return node;
  }
  return null
}

/**
 * 
 * @param {*} node 
 * @returns 
 */
export function getWrapperBox(node) {
  if (!node) return null;
  let wrapperBox = null;
  while (node) {
    if (node?._drawConfig?.type === 'BBox') {
      wrapperBox = node;
    }
    node = node.parent;
  }
  return wrapperBox;
}
