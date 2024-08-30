import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch , useSelector } from 'react-redux'
import todoSlice, { addTodo, updateTodo , setTodos } from "../features/todo/todoSlice";

function AddTodo({ id , setUpdateId }) {
  // console.log(id);
  const [input, setInput] = useState('');
  
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const inputRef = useRef(null);

  // console.log(setUpdateId);

  useEffect(() => {
    if (id) {
      // console.log(id);
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        setInput(todoToUpdate.text);
        inputRef.current.focus();
      }
    }
  }, [id]);


  const addOrUpdateTodoHandler = (e) => {
    e.preventDefault();
    if (id) {
      if(!input.trim()) return alert("please provide a proper todo");
      dispatch(updateTodo({ id: id, newText: input }));
      setUpdateId(null);
    } else {
      if(!input.trim()) return alert("please provide a proper todo");
      dispatch(addTodo(input));
    }
    setInput('');
  };

  return (
    <form onSubmit={addOrUpdateTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={inputRef}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {id  ? 'Update Todo' : 'Add Todo'}
      </button>
    </form>
  )
}

export default AddTodo;