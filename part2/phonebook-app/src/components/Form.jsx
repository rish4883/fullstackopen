const Form = ({addPerson, handleName, newName, handleNumber, newNumber}) => {
  return (
    <form onSubmit={addPerson}>
        <Input title='Name' handler={handleName} value={newName} />
        <Input title='Number' handler={handleNumber} value={newNumber} />
        <div><button type="submit">add</button></div>
    </form>
  )
}

export const Input = ({title, handler, value}) => {
  return (
    <div>
      <label htmlFor={title.toLowerCase()}>{title}: </label>
      <input type="text" id={title.toLowerCase()} onChange={handler} value={value}/>
    </div>
  )
}

export default Form;