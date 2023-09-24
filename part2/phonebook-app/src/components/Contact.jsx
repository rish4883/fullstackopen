const Contact = ({id, name, number, handleDelete}) => {
  return <p>
    {name} {number} <button onClick={() => handleDelete(id)}>delete</button>
  </p>
}

export default Contact