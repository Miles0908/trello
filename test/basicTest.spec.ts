import { describe, it, expect, beforeEach } from "vitest";
import { useBoardStore } from "#imports";
import boardData from "../data/board.json";
import { setActivePinia, createPinia } from "pinia";

describe("Should manage store correctly", async () => {
  let store = useBoardStore();

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useBoardStore();
    store.board = { ...boardData };
  });
  it("Add a new task in the boardjson correctly", async () => {
    const initialLength = store.board.columns[0].tasks.length;

    store.addTask({ columnIndex: 0, taskName: "new task" });

    expect(store.board.columns[0].tasks.length).toBe(initialLength + 1);

    expect(store.board.columns[0].tasks[initialLength].name).toBe("new task");

    expect(store.board.columns[0].tasks[initialLength].description).toBe("");
  });
  it("Delete a task in the boardjson correctly", async () => {
    const taskId = store.board.columns[0].tasks[0].id;

    const initialTaskCount = store.board.columns[0].tasks.length;

    expect(store.board.columns[0].tasks.length).toBe(initialTaskCount);

    store.deleteTask(taskId);

    expect(store.board.columns[0].tasks.length).toBe(initialTaskCount - 1);

    expect(
      store.board.columns[0].tasks.some((task) => task.id === taskId),
    ).toBe(false);
  });
  it("Should move the task between column correctly", () => {
    const fromTaskIndex = 0;
    const toTaskIndex = 1;
    const fromColumnIndex = 0;
    const task = store.board.columns[fromColumnIndex].tasks[fromTaskIndex];

    store.moveTask({
      fromTaskIndex,
      toTaskIndex,
      fromColumnIndex,
      toColumnIndex: fromColumnIndex,
    });

    expect(store.board.columns[fromColumnIndex].tasks[toTaskIndex]).toEqual(
      task,
    );
  });
  it("Should delete column", () => {
    const initialColumnCount = store.board.columns.length;
    store.deleteColumn(0);

    expect(store.board.columns.length).toBe(initialColumnCount - 1);
  });
});
