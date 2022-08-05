<template>
    
    <div class='section'>
       <div class="game">
            <div class="gameDetail">
                <div class="range-state-options">
                    <div class="range">
                        <span :style="`width: ${(store.state.currentQuestionPostion*10)}%;`"></span>
                    </div>
                    <div class="counter">{{store.state.currentQuestionPostion}} de {{store.state.totalQuestion}}</div>
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
            
            <game-text />

            <game-options />

            <buttonsGame />

       </div>
    </div>

</template>

<script setup>

import gameText from "./gamecomponent/questions.vue"
import gameOptions from "./gamecomponent/gameOptions.vue"
import buttonsGame from "./gamecomponent/buttonsGame.vue"

import {ref} from "vue"
import {useStore} from '../store'

const timeGame = ref(0)
const store = useStore()

function startTimer(duration) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timeGame.value = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}


    var fiveMinutes = 60 * 5
       
    startTimer(fiveMinutes)


</script>