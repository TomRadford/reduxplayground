import { connect } from "react-redux"
import { createNote } from "../reducers/noteReducer"


const NewNote = (props) => {
    console.log(createNote)
    console.log(props.createNote)
    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        props.createNote(content)
        event.target.note.value = ''
    }

    return (
        <form onSubmit={addNote}>
            <input name="note" />
            <button type="submit">add</button>
        </form>
    )
}

export default connect(
    null,
    { createNote }
)(NewNote)