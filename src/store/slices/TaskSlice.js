import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "todo",

    initialState: {
        tasks: [],
    },

    reducers: {
        addTask: (state, action) => {
            state.tasks.push({
                id:Date.now().toString(),
                ...action.payload
            });
        },

        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(
                task => task.id !== action.payload
            );
        },

        updateTask: (state, action) => {
            state.tasks = state.tasks.map(task =>
                task.id === action.payload.id
                    ? action.payload
                    : task
            );
        },

        markAsRead: (state, action) => {
            const task = state.tasks.find(
                task => task.id === action.payload
            );

            if (task) {
                task.isRead = !task.isRead;
            }
        }
    }
});

export const {
    addTask,
    deleteTask,
    updateTask,
    markAsRead
} = taskSlice.actions;

export default taskSlice.reducer;