import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/notes'

// const initialState = [
//     {
//         content: 'reducer defines how redux store works',
//         important: true,
//         id: 1,
//     },
//     {
//         content: 'state of store can contain any data',
//         important: false,
//         id: 2,
//     },
// ]


// const generateID = () => Number((Math.random() * 10000000).toFixed(0))

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = state.find(note => note.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(note => 
                note.id !== id ? note : changedNote)
        },
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload
        }
    }
})

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

// alt = https://redux-toolkit.js.org/rtk-query/overview
export const initializeNotes = () => {
    return async dispatch => {
        const notes = await noteService.getAll()
        dispatch(setNotes(notes))
    }
}

export const createNote = content => {
   return async dispatch => {
       const response = await noteService.createNew(content)
       dispatch(appendNote(response))
   }
}

export default noteSlice.reducer

// const noteReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'NEW_NOTE':
//             return [...state, action.data]

//         case 'TOGGLE_IMPORTANCE': {
//             const id = action.data.id
//             const noteToChange = state.find(note => note.id === id)
//             const newNote = {
//                 ...noteToChange,
//                 important: !noteToChange.important
//             }
//             return state.map(note =>
//                 note.id !== id ? note : newNote
//             )
//         }
//         default:
//             return state
//     }
// }



// export const createNote = (content) => {
//     return {
//         type: 'NEW_NOTE',
//         data: {
//             content,
//             important: false,
//             id: generateID()
//         }
//     }
// }

// export const toggleImportanceOf = (id) => {
//     return {
//         type: 'TOGGLE_IMPORTANCE',
//         data: { id }
//     }
// }

// export default noteReducer