import { connect } from "react-redux"
import { useDispatch } from "react-redux"
import { createNote } from "../reducers/noteReducer"

const NewNote = (props) => {
    const dispatch = useDispatch()
    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        // props.createNote(content) WITH CONNECT
        dispatch(createNote(content))
        event.target.note.value = ''
    }

    return (
        <form onSubmit={addNote}>
            <input name="note" />
            <button type="submit">add</button>
        </form>
    )
}




export default NewNote

//ALSO CAN USE CONNECT:

// export default connect(
//     null,
//     {createNote}
// )(NewNote)


//  to ref own props sans connect
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         createNote: value => {
//             dispatch(createNote(value))
//         }
//     }
// }