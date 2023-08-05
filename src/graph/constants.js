/*
 * @Author: zi.yang
 * @Date: 2023-07-29 17:11:25
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 18:32:54
 * @Description: 
 * @FilePath: /vue-project/src/graph/constants.js
 */
// 节点初始化大小
const NODE_SIZE = {
  WIDTH: 80,
  HEIGHT: 80
}

// 节点默认配置
const DEFAULT_OPTION = {
  tag: 'Rect',
  width: NODE_SIZE.WIDTH,
  height: NODE_SIZE.HEIGHT,
  stroke: '#333',
  fill: 'transparent',
  draggable: true,
}

export { DEFAULT_OPTION, NODE_SIZE };
