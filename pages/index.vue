<script setup>
import {useBoardStore} from "../stores/boardStores"
const boardStore = useBoardStore()
</script>
<template>
    <main>
        <h1>Home</h1>
        <p>Welcome to the home page</p>
        <pre>{{boardStore.board}}</pre>
    </main>
</template>