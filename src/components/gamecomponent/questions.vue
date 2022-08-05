<template>
     <div class="game-text">
        <p>{{question.question}}</p>
    </div>
</template>
<script setup>

import {useStore} from '../../store'
import { computed, ref, watch } from 'vue';
const store = useStore()

const question = computed(()=>store.state.currentQuestion)

</script>