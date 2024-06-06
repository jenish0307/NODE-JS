import React, { useEffect, useRef } from "react";
import TodoList from "./components/TodoList";
import { useDispatch } from "react-redux";
import { fetchData } from "./Toolkit/Slices/todoslice";
function App() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="App">
      <TodoList />
    </div>
  );
}
export default App;
