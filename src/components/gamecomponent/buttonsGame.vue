<template>
    
    <div class="game-buttons">
        <button @click="initGame">Inicar jogo</button>
        <button>
            Sair
        </button>
        <button @click="store.nextQuestion">Próximo</button>
    </div>

</template>
<script setup>

import {useStore} from '../../store'
import io from "socket.io-client"
import { defineEmits } from 'vue';
const socket = io('http://localhost:3030/')

const store = useStore()

const emit = defineEmits()

const newUrl = new URLSearchParams(window.location.search)
const userName = newUrl.get('name')

socket.emit('setUser', {
    score: 0,
    totalQuestionsCorret: 0,
    timedGame: 0,
    name: userName,
})

socket.on('setUser', (users) =>{
    store.state.users = users
})

const initGame = ()=>{
    console.log("emitindo evento")
    emit('startTimeGame', 20)
}


</script>