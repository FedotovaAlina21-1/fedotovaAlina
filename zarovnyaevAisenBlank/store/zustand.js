import { create } from "zustand";

export const useTasksStore = create((set) => ({
  tasks: [],
  addTask: (name) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), name, completed: false }],
    })),
  editTask: (id, newName) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, name: newName } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  toggleTaskStatus: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
}));
