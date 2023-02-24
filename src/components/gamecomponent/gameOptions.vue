<template>
    <ul class="game-options ">
        <li v-for="(item, key) in options" @click="selectQuestion(key)" :class="selected.index == key ? selected.class : ''" :key="key">
            <div class="check-option "></div>
            <div class="text-option">{{item}} </div>
        </li>
    </ul>
</template>

<script setup>

import {ref, defineProps } from 'vue'
import io from "socket.io-client"

const socket = io(import.meta.env.VITE_SERVER_HOST)

const props = defineProps({
    options:{}
})

const selected = ref({
    class: '',
    index: null
})

function selectQuestion(index){
    selected.value.class = 'selected'
    selected.value.index = index
    socket.emit('selectedQuestion', index)
}

</script>