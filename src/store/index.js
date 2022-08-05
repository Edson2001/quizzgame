
import { defineStore } from "pinia";
import { reactive } from "vue";
import questions from "../server.js"
import { useToast } from "vue-toastification";
const toast = useToast();

export const useStore = defineStore('game',()=>{

    const state = reactive({
        questions,
        currentQuestionPostion: 0,
        totalQuestion: questions.length,
        currentQuestion: questions[0],
        selectedQuestion: null,
        user:{
            //número de perguntas acetadas
            score: 0,
            //o tempo que levou a responder as perguntas
            timedGame: 0,
            name: ''
        }
    })

    const nextQuestion = ()=>{
        
        if(state.currentQuestionPostion < state.totalQuestion){

            let newQuestionPosition = state.currentQuestionPostion++

            state.currentQuestion = questions[newQuestionPosition]

            if(state.selectedQuestion && state.selectedQuestion == state.currentQuestion.rightoption){
                
                toast.success('Boa! continua assim.') 

                return
            }

            toast.error('Resposta errada, pode tentar denovo no final do jogo .') 
            
            console.log(state.currentQuestion)

        }

    }

    return {state, nextQuestion}
})