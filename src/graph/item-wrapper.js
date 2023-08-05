/*
 * @Author: zi.yang
 * @Date: 2023-07-29 17:08:36
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 19:39:57
 * @Description: 
 * @FilePath: /vue-project/src/graph/item-wrapper.js
 */
import { Box, DragEvent, Ellipse, Line, PointerEvent, UI } from 'leafer-ui';

import { uniqueId } from '../utils';
import { DEFAULT_OPTION } from './constants';
import { findInsideNode, getWrapperBox } from './utils';

const toRaw = (val) => Object.prototype.toString.call(val).slice(8, -1).toLowerCase();

function getDefaultCustomProps(props) {
  return Object.assign({}, {
    _isDrawGraph: true,
    _drawConfig: { type: 'BBox' },
    _status: {}
  }, props)
}

// 拦截节点属性配置
function interceptNodeConfig(config) {
  return Object.assign({}, config, { x: 1, y: 1, draggable: false, })
}

/**
 * 
 * @param {*} wrapperBox 
 * @param {*} color 
 */
function setWrapperBoxStyle(wrapperBox, color) {
  if (wrapperBox && wrapperBox?._isDrawGraph) {
    wrapperBox.stroke = color
    wrapperBox.children?.forEach((child) => {
      if (child._isDrawGraph) {
        child.fill = color
      }
    })
  }
}

/**
 * 
 * @param {*} leafer 
 * @param {*} box 
 */
function addWrapperEvent(leafer, box) {
  leafer.on(PointerEvent.TAP, () => {
    leafer.children.forEach((leaf) => {
      setWrapperBoxStyle(leaf, 'transparent')
    })
  })
  box.on(PointerEvent.TAP, (event) => {
    event.stop()
    if (!event.target) return;
    const wrapperBox = getWrapperBox(event.target)
    leafer.children.forEach((leaf) => {
      setWrapperBoxStyle(leaf, 'transparent')
    })
    setWrapperBoxStyle(wrapperBox, 'blue')
  })
}

function createResizePoint(leafer, box) {
  const pointPosition = [[0, 0], [1, 1], [0, 1], [1, 0]]

  pointPosition.forEach(([x, y]) => {
    const id = uniqueId(`box-resize`)
    const anchor = new Ellipse({
      id,
      width: 12,
      height: 12,
      x: box.width * x - 6,
      y: box.height * y - 6,
      zIndex: 1,
      draggable: false,
      ...getDefaultCustomProps({ _drawConfig: { type: 'ResizePoint', pos: [x, y] }, }),
    })
    let dragPrevBox = {};
    anchor.on(DragEvent.START, (event) => {
      const item = event.target;
      if (!item) return
      const box = item.parent;
      // box.draggable = false;
      dragPrevBox.x = box.x
      dragPrevBox.y = box.y
      dragPrevBox.width = box.width
      dragPrevBox.height = box.height
    })

    anchor.on(DragEvent.DRAG, (event) => {
      const item = event.target;
      if (!item) return
      const box = item.parent;
      const p1 = (dragPrevBox.x) / event.x;
      const p2 = (dragPrevBox.y) / event.y;
      box.width = Math.abs(dragPrevBox.width * p1) + 3;
      box.height = Math.abs(dragPrevBox.height * p2) + 3;
      box.children.forEach((child) => {
        if (!child._isDrawGraph) {
          child.width = box.width - 3;
          child.height = box.height - 3;
        }
      })
    })

    anchor.on(DragEvent.END, () => {
      // box.draggable = true;
      dragPrevBox = {}
    })
    box.add(anchor)
  })
}

// 连接锚点
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

// 创建节点包装器
function createItemWrapper(leafer, config) {
  const wrapper = new Box({
    id: uniqueId('wrapper-box'),
    x: config.x + leafer.x * -1,
    y: config.y + leafer.y * -1,
    width: config.width + 2,
    height: config.height + 2,
    strokeWidth: 2,
    dashPattern: [4, 4],
    zIndex: 0,
    draggable: config.draggable,
    ...getDefaultCustomProps({ _drawConfig: { type: 'BBox' }, })
  })

  wrapper.add(UI.one(interceptNodeConfig(config)));
  // createAnchorPoint(leafer, wrapper)
  // createResizePoint(leafer, wrapper)
  addWrapperEvent(leafer, wrapper)
  leafer.add(wrapper);
}

// 创建节点
function createNodeItem(leafer, options) {
  const mergeOptions = Object.assign({}, DEFAULT_OPTION, options);
  createItemWrapper(leafer, mergeOptions)
}

export { createNodeItem, getWrapperBox };