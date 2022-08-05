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
                            10
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

import {useStore} from '../store'

const store = useStore()
</script>