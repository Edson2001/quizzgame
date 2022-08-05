<template>
    
    <div class="game-buttons">
        <button-game>Sair</button-game>
        <button-game @click="store.nextQuestion">Próximo</button-game>
    </div>

</template>
<script setup>

import buttonGame from "./buttonGame.vue"

import {useStore} from '../../store'

const store = useStore()
</script>