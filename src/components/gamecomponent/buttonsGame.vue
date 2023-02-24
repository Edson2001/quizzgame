<template>
    
    <div class="game-buttons">
        <button @click="initGame">Inicar jogo</button>
        <button>
            Sair
        </button>
        <button @click="nextQuestion">Próximo</button>
    </div>

</template>
<script setup>


import io from "socket.io-client"

import { defineEmits } from 'vue'

const socket = io(import.meta.env.VITE_SERVER_HOST)

const emit = defineEmits()

const newUrl = new URLSearchParams(window.location.search)

const userName = newUrl.get('name')

socket.emit('setUser', {
    score: 0,
    totalQuestionsCorret: 0,
    timedGame: 0,
    name: userName,
})

const nextQuestion = ()=>{
    socket.emit('nextQuestion', userName)
}

const initGame = ()=>{
    
    emit('startTimeGame', 20)

}

</script>