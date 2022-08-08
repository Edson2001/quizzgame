<template>
     <div class="game-text">
        <p>{{question}}</p>
    </div>
</template>
<script setup>

import { computed, defineProps } from 'vue';

const props = defineProps({
    question: String
})

</script>