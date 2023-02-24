<template>
    
    <div class='section'>
       <div class="game">
            <div class="gameDetail">
                <div class="range-state-options">
                    <div class="range">
                        <span :style="`width: ${(game.gameState.currentQuestionPostion*10)}%;`"></span>
                    </div>
                    <div class="counter">{{game.gameState.gameCountQuestion}} de {{game.gameState.totalQuestion}}</div>
                    <ul>
                        <li v-for="(user, index) in game.gameState.users" :key="index">
                            <p>{{user.name}}</p> Pontos: {{user.score}} | Perguntas certas: {{user.totalQuestionsCorret}} 
                        </li>
                        
                    </ul>
                </div>
                <div class="game-counter">
                    <span>Tempo restante</span>
                    <div class="counter-time">
                        <div class="range">
                            {{timeGame}}
                        </div>
                    </div>
                </div>
            </div>
            
            <game-text :question="game.question" />

            <game-options  :options="game.options" />

            <buttonsGame @startTimeGame="startTime" />

       </div>
    </div>

</template>

<script setup>

import gameText from "./gamecomponent/questions.vue"
import gameOptions from "./gamecomponent/gameOptions.vue"
import buttonsGame from "./gamecomponent/buttonsGame.vue"

import {ref, onMounted} from "vue"

import { useToast } from "vue-toastification"
import io from "socket.io-client"

const socket = io(import.meta.env.VITE_SERVER_HOST)

const toast = useToast()

const game = ref({
    options: {},
    question: '',
    gameState: []
})
const timeGame = ref(0)

onMounted(()=>{
    socket.on('userOut', (username)=>{
        toast.warning("Usuario "+username+" Saiu do jogo")    
    })

    socket.on('sendState', (game)=>{
        game.value.options = game.currentQuestion.options
        game.value.question = game.currentQuestion.question
        game.value.gameState = game
        console.log(game.value.gameState)
    })

})

function startTimer(duration) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timeGame.value = minutes + ":" + seconds;

        if (--timer < 0) {
            socket.emit('endGame', '')
            console.log('is end')
            timer = duration;
        }
    }, 1000)
}

const startTime = (time)=>{
    console.log("recebendo evento")
    socket.emit("initGame", time)

}

socket.on("startTime", (time)=>{
    startTimer(time)
})

</script>