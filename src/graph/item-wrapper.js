/*
 * @Author: zi.yang
 * @Date: 2023-07-29 17:08:36
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 21:21:00
 * @Description: 节点包装器
 * @FilePath: /vue-project/src/graph/item-wrapper.js
 */
import { Box, DragEvent, Ellipse, Line, PointerEvent, UI } from 'leafer-ui';

import { uniqueId } from '@/utils';
import { DEFAULT_OPTION } from './constants';
import { findInsideNode, getWrapperBox } from './utils';

/**
 * 自定义属性
 * @param {*} props
 * @returns
 */
function getDefaultCustomProps(props = {}) {
  return Object.assign({}, {
    _isDrawGraph: true,
    _drawConfig: { type: 'BBox' },
    _status: { isSelected: false }
  }, props)
}

/**
 * TODO: 连接锚点 功能开发
 * @param {*} leafer
 * @param {*} box
 */
function createAnchorPoint(leafer, box) {
  const pointPosition = [[0, 0.5], [0.5, 0], [1, 0.5], [0.5, 1]]

  box.on(DragEvent.DRAG, (event) => {
    const leafer = event.current.leafer;
    const points = event.current.children;
    const edges = leafer.children.filter(({ tag, source }) => source && tag === 'Line')
    edges.forEach((node) => {
      for (const point of points) {
        if (point.id === node.source) {
          const inner = { x: point.x, y: point.y };
          box.innerToWorld(inner);
          node.x = inner.x + 3;
          node.y = inner.y + 3;

        }
      }
    })
  })

  pointPosition.forEach(([x, y]) => {
    const id = uniqueId(`box-anchor`)
    const anchor = new Ellipse({
      id,
      width: 12,
      height: 12,
      x: box.width * x - 6,
      y: box.height * y - 6,
      zIndex: 1,
      draggable: false,
      ...getDefaultCustomProps({ _drawConfig: { type: 'Anchor', pos: [x, y] }, }),
    })

    let line = null;
    let dragItem = null;
    anchor.on(DragEvent.START, (event) => {
      event.stop()
      const { x, y } = event.current.leafer
      dragItem = getWrapperBox(event.current);
      dragItem.draggable = false;
      line = new Line({ x: event.x - x, y: event.y - y, stroke: '#333', strokeWidth: 2, source: id })
      leafer.add(line)
    })

    anchor.on(DragEvent.DRAG, (event) => {
      event.stop()
      if (line) {
        const inner = { x: event.x, y: event.y }
        line.worldToInner(inner)
        line.toPoint = inner
      }
    })

    anchor.on(DragEvent.END, (event) => {
      const node = findInsideNode(event);
      if (node === null) {
        leafer.remove(line)
      }
      line = null
      if (dragItem) {
        dragItem.draggable = true;
      }
    })
    box.add(anchor)
  })
}

// 创建节点
function createNodeItem(app, options) {
  const nodeOpt = {...DEFAULT_OPTION, ...options, ...getDefaultCustomProps()}
  app.tree.add(UI.one(nodeOpt))
}

export { createNodeItem, getWrapperBox };
