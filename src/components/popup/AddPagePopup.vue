<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import * as Config from '../../../package.json'

    @Component
    export default class AddPagePopup extends Vue {

        visible = false;
        state = this.$store.state.TreeNodeStore;
        openDirDialog() {
            if(this.state.currentDirInfo && this.state.currentDirInfo.path != ((<any>Config).root + '/localhost')) {
                this.state.createTitle = '[' + this.state.currentDirInfo.name + ']下';
            }
            else {
                this.state.createTitle = '';
            }
            this.state.showDirDialog = true;
            this.state.showPageDialog = false;
            this.visible = !this.state.showDirDialog;
        }

        openPageDialog() {
            if(this.state.currentDirInfo && this.state.currentDirInfo.path != ((<any>Config).root + '/localhost')) {
                this.state.createTitle = '[' + this.state.currentDirInfo.name + ']下';
            }
            else {
                this.state.createTitle = '';
            }
            this.state.showDirDialog = false;
            this.state.showPageDialog = true;
            this.visible = !this.state.showPageDialog;
        }
    }
</script>

<template lang="pug" src="@/views/popup/addpagepopup.pug" />
<style scoped src="@/styles/popup/addpagepopup.css" />
