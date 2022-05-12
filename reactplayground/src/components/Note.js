const Note = ({ note, toggleImportance, user }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  const makeImportant = () => {
    if (user)
      return ( <button onClick={toggleImportance}>{label}</button> )
  }
  return (
    <li className='note'>
      <span>{note.content}</span>
      {makeImportant()}
    </li>
  )
}

export default Note