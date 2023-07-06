/*
 * @Author: zi.yang
 * @Date: 2023-07-05 19:47:50
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-07-06 20:56:40
 * @Description: 
 * @FilePath: /vue-project/src/graph.js
 */
import { Ellipse, Leafer, usePlugin } from 'leafer-ui';

import { plugin } from './leafer-demo-plugin';

usePlugin(plugin)

const createChildNode = (leafer, masterNode, count) => {
  const baseNodeConf = {
    width: 100,
    height: 100,
    fill: "#b5f5ec",
    stroke: "#5cdbd3",
    strokeWidth: 2,
  }
  const baseAngle = 360 / count;
  const rx = masterNode.width / 2;
  const ry = masterNode.height / 2;
  const cx = masterNode.x + rx - baseNodeConf.width / 2;
  const cy = masterNode.y + ry - baseNodeConf.height / 2;
  for (let i = 0; i < count; i++) {
    // 当前角度
    const angle = baseAngle * i;
    // 将角度转换为弧度：θ
    const radian = angle * (Math.PI / 180);
    baseNodeConf.x = cx + rx * Math.cos(radian);
    baseNodeConf.y = cy + ry * Math.sin(radian);
    const circle = new Ellipse(baseNodeConf)
    leafer.add(circle)
  }
}

const createGraph = (view) => {
  // 实例应用
  const width = window.innerWidth;
  const height = window.innerHeight - 10;
  const leafer = new Leafer({
    view,
    width,
    height,
    fill: '#fff',
    wheel: { zoomMode: true },
    move: { dragEmpty: true },
    start: false
  })
  const masterNode = new Ellipse({
    width: 200,
    height: 200,
    fill: "#91caff",
    stroke: "#4096ff",
    strokeWidth: 2,
  })
  masterNode.set({
    x: width / 2 - masterNode.width / 2,
    y: height / 2 - masterNode.height / 2
  })

  leafer.add(masterNode)
  createChildNode(leafer, masterNode, 20)
  leafer.start()
}

export { createGraph };