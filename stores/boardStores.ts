import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import boardData from "../data/board.json"
export const useBoardStore = defineStore('boardStore',()=> {
    const board = useStorage('board',boardData)
    
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
    board,
    addColumn,
    deleteColumn
}
})