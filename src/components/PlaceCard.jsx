
import { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { PlaceContext } from "../contexts/PlaceContext";
import { Link } from "react-router-dom";
import CalculateDaysLeft from "./CalculateDaysLeft"; // Import the CalculateDaysLeft component
import TodoList from "./ToDoList/TodoList"; 
// import "./css/custom.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare  } from "@fortawesome/free-regular-svg-icons";
import {  faToggleOn, faToggleOff, faPlus, faPlaneDeparture  } from "@fortawesome/free-solid-svg-icons";


export default function PlaceCard({ place }) {
  
  //call setPlaces directly from context to update
  const setPlaces = useContext(PlaceContext).setPlaces;
  // toggle todolist to show or not
  const [showTodoList, setShowTodoList] = useState(false); 
  const [todoList, setTodoList] = useState(place.todoList || []); 
  // const [newTodoText, setNewTodoText] = useState(""); 
  
  const todosLeftToDo = todoList.filter((todo) => !todo.completed).length;

  const deletePlace = () => {
    setPlaces((prevPlaces) =>
      prevPlaces.filter((prevPlace) => prevPlace.id !== place.id)
    );
  };

  const border = todoList.every((todo) => todo.completed) ? "success" : "danger";


  const toggleTodo = () => {
    //swap the state, to true or false, if true, show, if false hide
    setShowTodoList((isVisible) => {
      const newVisibility = !isVisible; 
      console.log("isVisible:", newVisibility); 
      return newVisibility;
    });
  
    console.log("placecardID:", place.id);
  };

  return (
    <>
      <Card border={border} className="my-3">
        <Card.Header className="d-flex justify-content-between align-items-center">

          {/* RENDER COMPLETE IF 0 todos */}
          <div className=" no-wrap">
          <CalculateDaysLeft startDate={place.startDate}/>
</div>

          <div className="d-flex" >
            {/* edit button on place card link to specific place card id URL */}
        <Button variant="none" href={`/place/${place.id}`} className="ms-2 border-0">
        <FontAwesomeIcon className="fa-xl" icon={faPenToSquare} />
        </Button>
        <Button variant ="none" onClick={deletePlace} className="ms-2 border-0">
        <FontAwesomeIcon className="fa-xl" icon={faTrashCan} />
        </Button>
      </div>
        </Card.Header>
        
        <Card.Body>
          <Card.Title>
          <FontAwesomeIcon className="me-3 ms-1" icon={faPlaneDeparture} />
            {place.destination}
            </Card.Title>
          <Card.Text className="mt-4">{`${new Date(place.startDate).toLocaleDateString()} - ${new Date(
            place.endDate
          ).toLocaleDateString()}`}</Card.Text>
          

        <div className="d-flex">
        <Card.Text className="mt-3 border rounded-pill px-2 ">
          {todosLeftToDo > 0
          ?`${todosLeftToDo} ${todosLeftToDo === 1 ? " to do left":" to dos left"}`
          :"Nothing left to do!"
          }
          
          </Card.Text>
          {/* toggle  */}
          <Button variant="none" onClick={toggleTodo} className="ms-auto border-0">
            {/* if showTodo == true, toggle on icon, else toggle off icon  */}
            <FontAwesomeIcon className="fa-2xl"icon={showTodoList ? faToggleOn : faToggleOff} />
          </Button>
          </div>
        </Card.Body>
        
        
        {/* render TodoList if showTodoList is true and todoList is not empty */}
        {showTodoList && todoList.length > 0 && (
          <Card.Footer>
            <TodoList todoList={todoList} setTodoList={setTodoList} />
          </Card.Footer>
        )}

        {/* render "Add a todo" link if showTodoList is true and todoList is empty only if on specific card */}
        {showTodoList && todoList.length === 0 && (
          <Card.Footer  className="d-flex justify-content-center">
            <div className="d-flex justify-content-center align-items-center">
            {/* render "Add a todo +" linked to specific place card only on home page */}
      {location.pathname === "/" && ( 
      // link to specific place card's edit page via url
        <Link to={`/place/${place.id}`} className="link-dark text-decoration-none">
          <span className="me-2">Add a todo</span>
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      )}
    </div>
          </Card.Footer>
        )}
      </Card>
    </>
  );
}

