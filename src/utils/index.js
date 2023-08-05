/*
 * @Author: zi.yang
 * @Date: 2023-08-02 22:10:13
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-05 19:55:27
 * @Description: 
 * @FilePath: /vue-project/src/utils/index.js
 */

export function salt(len = 10) {
  return Math.random().toString(32).slice(2, 2 + len);
}

export function uniqueId(prefix, len = 10) {
  return `${prefix}--${salt(len)}`
}

export function svg(name) {
  return new URL(`../assets/svg/${name.toLowerCase()}.svg`, import.meta.url)
    .href;
}