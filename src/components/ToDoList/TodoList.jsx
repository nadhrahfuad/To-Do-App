// //RED
// import { ListGroup } from "react-bootstrap";
// import TodoListItem from "./TodoListItem";
// // import {Link} from "react-router-dom"
// // import {useContext} from "react"
// // import { PlaceContext } from "../../contexts/PlaceContext";
// // import LittleClock from "../LittleClock";
// import { TodoContext } from "../../contexts/TodoContext";
// import { useContext } from "react";


// const TodoList = () => {
//  const {todos, setTodos} = useContext(TodoContext)
  
//   //diff id keep
//   const deleteTodo = (id) => {
//     const updatedTodos = todos.filter((todo) => todo.id !== id);
//     setTodos(updatedTodos);
//   };

//   //copy, update text if same id
//   const editTodo = (id, updatedText) => {
//     const updatedTodos = todos.map((todo) =>
//       todo.id === id ? { ...todo, text: updatedText } : todo
//     );
//     setTodos(updatedTodos);
    
//   };
  

//   const clickTodoComplete = (id) => {
//     const updatedTodos = todos.map((todo) =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     );
//     console.log("THIS IS RUNNING")
//     setTodos(updatedTodos);
//   };

//   // const { places } = useContext(PlaceContext);
//   // const placeIds = places.map(place => place.id);
//   //  const { places } = useContext(PlaceContext);
//   // console.log("Places:", places); 
  
 
 
//   return (
//     <div>
//   {todos.length > 0 ? (
//     <>
//       <h5>Things to do:</h5>
//       <ListGroup>
//         {todos.map((todo) => (
//           <TodoListItem
//             key={todo.id}
//             todo={todo}
//             deleteTodo={() => deleteTodo(todo.id)}
//             editTodo={editTodo}
//             clickTodoComplete={clickTodoComplete}
//           />
//         ))}
//       </ListGroup>
//     </>
//   ) : (
//     <div className="d-flex align-items-center justify-content-center">
//     {location.pathname !== "/" && ( // Render message if not on home page
//       <p className="my-2 align-items">So many things to do! So little time...</p>
//     )}
//   </div>
//   )}
// </div>
//   );
// };

// export default TodoList;

//FIXFIXIFX kindaworks=======================================================

import { ListGroup } from "react-bootstrap";
import TodoListItem from "./TodoListItem";
// import {Link} from "react-router-dom"
// import {useContext} from "react"
// import { PlaceContext } from "../../contexts/PlaceContext";
// import LittleClock from "../LittleClock";



const TodoList = ({ todoList, setTodoList }) => {

  
  //diff id keep
  const deleteTodo = (id) => {
    const updatedTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodos);
  };

  //copy, update text, if not leave it the same 
  const editTodo = (id, updatedText) => {
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, todotext: updatedText } : todo
    );
    setTodoList(updatedTodos);
    
  };
  
  //
  const clickTodoComplete = (id) => {
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    console.log("THIS IS RUNNING")
    setTodoList(updatedTodos);
  };

  // const { places } = useContext(PlaceContext);
  // const placeIds = places.map(place => place.id);
  //  const { places } = useContext(PlaceContext);
  // console.log("Places:", places); 
  
 
 
  return (
    <div>
      {/* if list exists, render list */}
  {todoList.length > 0 ? (
    <>
      <h5>Things to do:</h5>
      <ListGroup>
        {todoList.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            deleteTodo={() => deleteTodo(todo.id)}
            editTodo={editTodo}
            clickTodoComplete={clickTodoComplete}
          />
        ))}
      </ListGroup>
    </>
  ) : (
    // if no list render phrase instead
  <div className="d-flex align-items-center justify-content-center">
    <p className="my-2 align-items">So many things to do! So little time...</p>
    </div>
  )}
</div>
  );
};

export default TodoList;
