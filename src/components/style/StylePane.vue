<script lang="ts">
    import StyleAttribute from "@/components/style/StyleAttribute.vue"

    export default {
        data() {
          return {
            id: '',
            width: 100,
            maxWidth: 10000,
            minWidth: 100,
          }
        },
        components: {
            "StyleAttribute" : StyleAttribute,
        }
    }
</script>

<style scoped src="@/styles/style/stylepane.css" />
<template lang="pug" src="@/views/style/stylepane.pug" />
