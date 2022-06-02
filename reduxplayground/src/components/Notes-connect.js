import { connect } from 'react-redux'
import { toggleImportanceOf } from "../reducers/noteReducer"

// Presentational
const Note = ({ note, handleClick }) => (
    <li onClick={handleClick}>
        {note.content} <strong>{note.important ? 'important' : ''}</strong>
    </li>
)


//  Container = contains application logic
const Notes = (props) => {
    return (
        <ul>
            {props.notes.map(note =>
                <Note
                    handleClick={() => props.toggleImportanceOf(note.id)}
                    key={note.id}
                    note={note}
                />
            )}
        </ul>
    )
}

const mapStateToProps = (state) => {
    if (state.filter === 'ALL') {
        return {
            notes: state.notes
        }
    }

    return {
        notes:
            (state.filter === 'IMPORTANT'
                ? state.notes.filter(note => note.important)
                : state.notes.filter(note => !note.important))
    }
}

const mapDispatchToProps = {
    toggleImportanceOf,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notes)