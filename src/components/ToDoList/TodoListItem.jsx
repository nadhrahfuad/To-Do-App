// RED
// UPDATE THE SAME LIST almostalms
//prob to do item shows on all cards
// import { Button, InputGroup, FormControl, Form, ListGroup } from "react-bootstrap";
// import { useLocation } from "react-router-dom";
// import "../css/custom.css"

// const TodoListItem = ({ todo, deleteTodo, editTodo, clickTodoComplete }) => {
//   const location = useLocation();

//   const onDeleteClick = () => {
//     deleteTodo(todo.id);
//   };

//   const onCheckboxChange = () => {
//     clickTodoComplete(todo.id);
//     console.log("click")
//   };
  
//   const onTextChange = (e) => {
//     // if not on home, allow edit
//     if (location.pathname !== "/") { 
//       editTodo(todo.id, e.target.value);
//     }
//   };

//   return (
//     <ListGroup.Item key={todo.id}>
//       <InputGroup>
//         <FormControl
//           value={todo.text}
//           onChange={onTextChange}
//           //disable inout
//           disabled={location.pathname === "/"}
//         />
//         {/* dont show del button on home /*/}
//         {location.pathname !== "/" && ( 
//           <Button variant="outline-danger" onClick={onDeleteClick}>
//             Delete
//           </Button>
//         )}
//         {/* but allow checking on home */}
//         <InputGroup.Text>
//           <Form.Check 
//           type="checkbox"
//             checked={todo.completed}
//             onChange={onCheckboxChange} 
//           />
//         </InputGroup.Text>
//       </InputGroup>
//     </ListGroup.Item>
//   );
// };

// export default TodoListItem;


//FIXFIXIFX kindaworks=======================================================

import { Button, InputGroup, FormControl, Form, ListGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../css/custom.css"

const TodoListItem = ({ todo, deleteTodo, editTodo, clickTodoComplete }) => {
  const location = useLocation();

  const onDeleteClick = () => {
    deleteTodo(todo.id);
  };

  const onCheckboxChange = () => {
    clickTodoComplete(todo.id);
    console.log("click")
  };
  
  const onTextChange = (e) => {
    // if not on home, allow edit
    if (location.pathname !== "/") { 
      editTodo(todo.id, e.target.value);
    }
  };

  return (
    <ListGroup.Item key={todo.id}>
      <InputGroup>
        <FormControl
          value={todo.todotext}
          onChange={onTextChange}
          //disable inout if path is home
          disabled={location.pathname === "/"}
        />
        {/* dont show del button on home /*/}
        {location.pathname !== "/" && ( 
          <Button variant="outline-danger" onClick={onDeleteClick}>
            Delete
          </Button>
        )}
        {/* but allow checking on home */}
        <InputGroup.Text>
          <Form.Check 
          type="checkbox"
            checked={todo.completed}
            onChange={onCheckboxChange} 
          />
        </InputGroup.Text>
      </InputGroup>
    </ListGroup.Item>
  );
};

export default TodoListItem;