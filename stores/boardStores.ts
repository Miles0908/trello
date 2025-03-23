import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import boardData from "../data/board.json"
export const useBoardStore = defineStore('boardStore',()=> {
    const board = useStorage('board',boardData)
    // this is a computed property that return a function that takes a taskId and return the task with that id
    const getTask = computed(()=>{
        return taskId => {
            for(const column of board.value.columns){
            const task = column.tasks.find(task=>task.id === taskId)
            if(task) return task
            }
        }
    })
    
    const addColumn = (columName)=>{
        board.value.columns.push({
            name:columName,
            tasks:[]
        })
    }
    const deleteColumn = (columnIndex)=>{
        board.value.columns.splice(columnIndex, 1)
    }
    
return {
    /* State */
    board,
    /* Getters */
    getTask,
    /* Actions*/
    addColumn,
    deleteColumn,
}
})