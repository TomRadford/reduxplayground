import { useDispatch, useSelector } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducer"


// Presentational
const Note = ({ note, handleClick }) => (
    <li onClick={handleClick}>
        {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
)


//  Container = contains application logic
const Notes = (props) => {
    const dispatch = useDispatch()
    
    const notes = useSelector(({ filter, notes }) => {
        if (filter === 'ALL') {
            return notes
        }
        return (filter === 'IMPORTANT')
            ? notes.filter(note => note.important)
            : notes.filter(note => !note.important)
    })

    // const notes = useSelector(state => {
    //     if (state.filter === 'ALL') {
    //         return state.notes
    //     }
    //     return (state.filter === 'IMPORTANT')
    //         ? state.notes.filter(note => note.important)
    //         : state.notes.filter(note => !note.important)
    // })

    return (
        <div>
            <ul>
                {notes.map(note =>
                    <Note
                        handleClick={() => dispatch(toggleImportanceOf(note.id))}
                        key={note.id}
                        note={note}
                    />
                )}
            </ul>
        </div>
    )

}

export default Notes