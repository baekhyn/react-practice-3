import { useState } from 'react';

function App() {
  const [toDo, setTodo] = useState('');
  const [toDos, setTodos] = useState([]);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo.trim().length === 0) {
      setError(true);
      return;
    }
    setError(false);
    setTodos((currentTodos) => [toDo, ...currentTodos]);
    setTodo('');
  };
  return (
    <div>
      <h1>Today's plan</h1>
      <h2>Lists ({toDos.length})</h2>
      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>Add to do</button>
      ) : (
        <form onSubmit={onSubmit}>
          <input type='date'></input>
          <input
            value={toDo}
            onChange={onChange}
            placeholder='Write your to do...'
            type='text'
          ></input>
          <input type='text'></input>
          <button>Add</button>
          <button
            onClick={() => {
              setIsEditing(false);
              setError(false);
            }}
          >
            Cancel
          </button>
          {error && <small>fill this out</small>}
        </form>
      )}

      <hr />
      {toDos.length === 0 ? (
        <h2>Please write your todo</h2>
      ) : (
        <ul>
          {toDos.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
