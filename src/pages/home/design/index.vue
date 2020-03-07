<script lang="js">
    //lang必须为js，改为ts会import不了tinymce资源
    import "@/assets/css/ruler.css"
    import Toolbar from "@/components/design/Toolbar.vue"
    import tinymce from 'tinymce'
    import Editor from '@tinymce/tinymce-vue'
    import 'tinymce/themes/silver/theme'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/advlist'
    import 'tinymce/plugins/media'
    import 'tinymce/plugins/textcolor'
    import 'tinymce/plugins/print'
    import 'tinymce/plugins/preview'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/codesample'
    import 'tinymce/plugins/visualblocks'
    import 'tinymce/plugins/charmap'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/hr'
    import 'tinymce/plugins/anchor'
    import 'tinymce/plugins/imagetools'
    import 'tinymce/plugins/fullpage'
    import 'tinymce/plugins/directionality'
    import 'tinymce/plugins/insertdatetime'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/textpattern'
    import 'tinymce/plugins/pagebreak'
    import 'tinymce/plugins/wordcount' // 字数统计插件

    import 'tinymce/plugins/contextmenu';
    import 'tinymce/plugins/searchreplace';

    import '@/assets/tinymce/plugins/imagelist';

    import store from '@/store';
    import { getModule } from 'vuex-module-decorators';
    import PagesStore from '@/store/modules/design/PagesStore';
    const pagesStore = getModule(PagesStore, store);

    export default {

        data() {
            return {
                init: {
                    language_url: 'langs/zh_CN.js', //语言包的路径
                    language: 'zh_CN', //语言
                    skin_url: 'skins/ui/oxide', //skin路径
                    branding: false, //是否禁用“Powered by TinyMCE”水印
                    browser_spellcheck: true, // 拼写检查
                    elementpath: true,  //编辑器底部选中路径
                    statusbar: true, // 编辑器底部的状态栏
                    paste_data_images: true, // 允许粘贴图像
                    mode:"textarea",
                    menubar: false, //'edit insert view format table tools',
                    plugins: [
                        'advlist link charmap print preview hr anchor pagebreak imagetools ',
                        'searchreplace visualblocks code fullpage wordcount imagelist',
                        'insertdatetime media table contextmenu directionality',
                        'textcolor colorpicker textpattern imagetools codesample'
                    ],
                    toolbar: [' undo redo | styleselect | fontselect | fontsizeselect | ',
                        'textcolor forecolor backcolor bold italic textpattern | ',
                        'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ',
                        'visualblocks removeformat wordcount | table imagelist imagetools media directionality | ',
                        'anchor link insertdatetime pagebreak hr | charmap code codesample searchreplace | ',
                        'colorpicker  print fullpage contextmenu'],
                }
            }
        },
        computed: {

        },
        methods: {
            pageAttr(index, attr, value) {
                if(!this.$store.state.PagesStore.pages[index]) {
                    return;
                }

                if(typeof(value)=='undefined') {
                    return this.$store.state.PagesStore.pages[index][attr];
                }
                this.$store.state.PagesStore.pages[index][attr] = value;
            },
            onClick(path) {
                pagesStore.select(path);
            },
            onTabRemove(path) {
                pagesStore.remove(path);
            },
            resize(index, size) {
                if(!size) {
                    size = 1280;
                }
                if(this.$store.state.PagesStore.pages.length > 0) {
                    this.pageAttr(index, 'width', size);
                }

                let editor = this.getEditor(index);
                if(editor) {
                    editor.style.width = size + 'px';
                }
            },
            getEditor(index) {
                let currentIndex = index;
                for(let i=0; i<=index; i++) {
                    if(!this.$store.state.PagesStore.pages[i]) {
                        currentIndex--;
                    }
                }

                return this.$el.getElementsByClassName('tox-edit-area')[currentIndex];
            },
            onInit(index) {
                if(this.$store.state.PagesStore.pages.length > 0) {
                    this.resize(index, this.pageAttr(index, 'width'));
                }
            },
        },
        components: {
            "Toolbar": Toolbar,
            "Editor": Editor,
        }
    }
</script>

<template lang="pug" src="@/views/design/index.pug" />
<style>
    .tox-toolbar-overlord {
        margin-top: -1px !important;
    }
    .tox .tox-toolbar {
        display: inline-flex !important;
        flex-shrink: 0 !important;
        flex-wrap: wrap !important;
        margin: -1px !important;
        border-bottom: 0px solid #ccc !important;
        margin-top: 0px !important;
        border-right: 1px solid #ccc !important;
    }
</style>
