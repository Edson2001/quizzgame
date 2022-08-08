
import { defineStore } from "pinia"
import { reactive } from "vue"
import questions from "../server.js"
import { useToast } from "vue-toastification";

const toast = useToast();

import io from "socket.io-client"
const socket = io('http://localhost:3030/')

const newUrl = new URLSearchParams(window.location.search)
const userName = newUrl.get('name')

export const useStore = defineStore('game',()=>{

    const state = reactive({
        questions,
        gameCountQuestion: 1,
        currentQuestionPostion: 0,
        totalQuestion: questions.length,
        currentQuestion: questions[0],
        selectedQuestion: null,
        users:[]
    })

    const nextQuestion = ()=>{
        
        if(state.currentQuestionPostion < state.totalQuestion){

            if(state.selectedQuestion && state.selectedQuestion == state.currentQuestion.rightoption){
                toast.success('Boa! continua assim.')
                socket.emit("setScore", {name: userName, score: 5, totalQuestionsCorret: 1})
            }else{
                toast.error('Resposta errada, pode tentar denovo no final do jogo .')
            }

            state.currentQuestionPostion =  state.currentQuestionPostion + 1
            
            let newQuestionPosition = state.currentQuestionPostion

            if(state.currentQuestionPostion == state.totalQuestion){
                toast.success('fim do jogo') 
                return
            }

            state.currentQuestion = questions[newQuestionPosition]
            
            state.gameCountQuestion++
        }

    }

    return {state, nextQuestion}
})