/*
 * @Date         : 2020-03-07 17:25:59
 * @LastEditors  : HaoJie
 * @LastEditTime : 2020-04-17 10:04:32
 * @FilePath     : \typings.d.ts
 */
declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

declare module "*.json" {
  const value: any;
  export default value;
}
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.png'
declare let EZUIPlayer: any;
declare let AMap: any;