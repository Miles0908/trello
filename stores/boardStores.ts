import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import boardData from "../data/board.json";
import { v4 as uuid } from "uuid";
export const useBoardStore = defineStore("boardStore", () => {
  const board = useStorage("board", boardData);
  /**
   * tasks
   */
  // this is a computed property that return a function that takes a taskId and return the task with that id
  const getTask = computed(() => {
    return (taskId) => {
      for (const column of board.value.columns) {
        const task = column.tasks.find((task) => task.id === taskId);
        if (task) return task;
      }
    };
  });
  const addTask = ({ columnIndex, taskName }) => {
    board.value.columns[columnIndex].tasks.push({
      id: uuid(),
      name: taskName,
      description: "",
    });
  };

  const deleteTask = (taskId) => {
    for (const column of board.value.columns) {
      const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        column.tasks.splice(taskIndex, 1);
        return;
      }
    }
  };

  const moveTask = ({ taskIndex, fromColumnIndex, toColumnIndex }) => {
    const task = board.value.columns[fromColumnIndex].tasks.splice(
      taskIndex,
      1,
    )[0];
    board.value.columns[toColumnIndex].tasks.push(task);
  };

  /**
   * columns
   */
  const addColumn = (columName) => {
    board.value.columns.push({
      name: columName,
      tasks: [],
    });
  };
  const deleteColumn = (columnIndex) => {
    board.value.columns.splice(columnIndex, 1);
  };
  const moveColumn = ({ fromColumnIndex, toColumnIndex }) => {
    // remove the column from the board and store it in a variable(the 1 means we want to remove 1 element)
    const column = board.value.columns.splice(fromColumnIndex, 1)[0];
    board.value.columns.splice(toColumnIndex, 0, column);
  };

  return {
    /* State */
    board,
    /* Getters */
    getTask,
    /* Actions*/
    addColumn,
    addTask,
    deleteColumn,
    deleteTask,
    moveColumn,
    moveTask,
  };
});
