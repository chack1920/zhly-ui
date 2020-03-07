
<style scoped src="@/styles/design/toolbar.css" />

<script lang="ts">
    import { Vue, Prop, Watch, Component } from 'vue-property-decorator';

    @Component
    export default class Toolbar extends Vue {
        public viewMode: string;
        public enums: any;
        public width: number;

        @Prop()
        public size: number;

        @Prop()
        public index: number;

        constructor() {
            super()
            this.viewMode = 'desktop'
            this.enums = {
                'desktop': 1280,
                    'std-desktop': 1024,
                    'pad': '768',
                    'phone': '320'
            }
            this.size = 1280;
            this.width = 1280;
        }

        //immediate为true的时候，会刚开始时就执行一次，比如第一次渲染该页面
        //deep为true时，代表同时监听对象内部属性情况，内部变化，也会触发该函数
        @Watch("viewMode", { immediate: false, deep: false })
        viewModeChange(val) {
            switch(val) {
                case 'desktop':
                    this.width = 1280;
                    break;
                case 'std-desktop':
                    this.width = 1024;
                    break;
                case 'pad':
                    this.width = 768;
                    break;
                case 'phone':
                    this.width = 414;
                    break;
            }
        }

        @Watch("width")
        widthChange(val: number) {
            if(val >= 1280) {
                this.viewMode = 'desktop';
            }

            if(val < 1280 && val>=1024) {
                this.viewMode = 'std-desktop';
            }

            if(val < 1024 && val>=768) {
                this.viewMode = 'pad';
            }

            if(val < 768) {
                this.viewMode = 'phone';
            }

            this.$emit('change', this.index, val); //触发外部定义的@change事件
        }

        @Watch("size")
        sizeChange(val) {
            this.width = val;
        }
    }
</script>

<template lang="pug" src="@/views/design/toolbar.pug" />
