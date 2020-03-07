<script lang="ts">

    import AddPagePopup from "@/components/popup/AddPagePopup.vue"
    import PageTree from "@/components/tree/PageTree.vue"
    import StylePane from "@/components/style/StylePane.vue"
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component({
        components: {
            AddPagePopup,
            PageTree,
            StylePane
        }
    })
    export default class Navigation extends Vue {

        tab = 'page';

        choseTab (name) {
            if(name == 'add') {
                name = 'page';
            }

            this.tab = name;
        }
    }
</script>

<template lang="pug" src="@/views/navigation.pug" />
<style scoped src="@/styles/navigation.css" />
