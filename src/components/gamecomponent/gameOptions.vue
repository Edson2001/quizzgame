<template>
    <ul class="game-options ">
        <li v-for="(item, key) in question.options" @click="selectQuestion(key)" :class="selected.index == key ? selected.class : ''" :key="key">
            <div class="check-option "></div>
            <div class="text-option">{{item}} </div>
        </li>
    </ul>
</template>

<script setup>

import {useStore} from '../../store'
import { computed, ref } from 'vue'

const store = useStore()

const selected = ref({
    class: '',
    index: null
})

function selectQuestion(index){

    selected.value.class = 'selected'
    selected.value.index = index

    store.state.selectedQuestion = index 

}

const question = computed(()=>store.state.currentQuestion)

</script>