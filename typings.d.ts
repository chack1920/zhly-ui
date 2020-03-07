declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

declare module "*.iview" {
  import iview from 'Vue'
  export default iview
}

declare module 'tinymce' {
  import tinymce from 'tinymce/tinymce'
  export default tinymce;
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