<template lang="pug">
    #app
        router-view
</template>
<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    @Component({
        components: {
        }
    })
    export default class App extends Vue {}
</script>
