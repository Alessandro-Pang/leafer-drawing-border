/*
 * @Author: zi.yang
 * @Date: 2023-07-06 21:02:27
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 18:05:02
 * @Description: 
 * @FilePath: /vue-project/src/graph/index.js
 */
import { Leafer } from 'leafer-ui';

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
  return leafer
}

export { createGraph };