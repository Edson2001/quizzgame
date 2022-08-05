<template>
    <ul class="game-options">
        <li v-for="item in question.options" :key="item">
            <div class="check-option"></div>
            <div class="text-option">{{item}} </div>
        </li>
    </ul>
</template>

<script setup>

import {useStore} from '../../store'
import { computed, ref } from 'vue';
const store = useStore()
const question = computed(()=>store.state.currentQuestion)


</script>