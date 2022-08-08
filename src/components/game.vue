<template>
    
    <div class='section'>
       <div class="game">
            <div class="gameDetail">
                <div class="range-state-options">
                    <div class="range">
                        <span :style="`width: ${(gameState.currentQuestionPostion*10)}%;`"></span>
                    </div>
                    <div class="counter">{{gameState.gameCountQuestion}} de {{gameState.totalQuestion}}</div>
                    <ul>
                        <li v-for="(user, index) in gameState.users" :key="index">
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
            
            <game-text :question="question" />

            <game-options  :options="options" />

            <buttonsGame @startTimeGame="startTime" />

       </div>
    </div>

</template>

<script setup>

import gameText from "./gamecomponent/questions.vue"
import gameOptions from "./gamecomponent/gameOptions.vue"
import buttonsGame from "./gamecomponent/buttonsGame.vue"

import {computed, ref} from "vue"
import {useStore} from '../store'
import { useToast } from "vue-toastification"
import io from "socket.io-client"


const socket = io('http://localhost:3030/')
const toast = useToast()
const timeGame = ref(0)
const store = useStore();
const options = ref({})
const question = ref('')
const gameState = ref([])

socket.on('userOut', (username)=>{
    toast.warning("Usuario "+username+" Saiu do jogo")    
})

socket.on('sendState', (game)=>{
    options.value = game.currentQuestion.options
    question.value = game.currentQuestion.question
    gameState.value = game
    console.log(gameState)
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
    }, 1000);
}

const startTime = (time)=>{
    console.log("recebendo evento")

    socket.emit("initGame", time)

}

socket.on("startTime", (time)=>{

    startTimer(time)
            
})

</script>