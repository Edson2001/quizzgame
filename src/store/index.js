
import { defineStore } from "pinia";
import { reactive } from "vue";
import questions from "../server.js"

export const useStore = defineStore('game',()=>{

    const state = reactive({
        questions,
        currentQuestionPostion: 0,
        totalQuestion: questions.length,
        currentQuestion: questions[0]
    })

    const nextQuestion = ()=>{

        if(state.currentQuestionPostion < state.totalQuestion){

            let newQuestionPosition = state.currentQuestionPostion++

            state.currentQuestion = questions[newQuestionPosition]
            
            console.log(state.currentQuestion)

        }

    }

    return {state, nextQuestion}
})