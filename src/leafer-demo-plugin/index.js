/*
 * @Author: zi.yang
 * @Date: 2023-07-06 00:12:13
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-07-06 11:23:59
 * @Description: 
 * @FilePath: /vue-project/src/leafer-demo-plugin/index.js
 */
export const plugin = {
  importVersion: '1.0.0-beta.3',
  import: ['Leafer'],
  run(LeaferUI) {
    console.log(LeaferUI) // { Leafer }
  }
}