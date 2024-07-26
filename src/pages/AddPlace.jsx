import  { useContext, useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { PlaceContext } from "../contexts/PlaceContext";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "../components/DateRangePicker";
import TodoList from "../components/ToDoList/TodoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendarDays  } from "@fortawesome/free-regular-svg-icons";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import CustomButton from '../components/CustomBtn';

export default function AddPlace() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const { setPlaces } = useContext(PlaceContext);
  const navigate = useNavigate();

  // Add a new todo to todoList
  const addTodo = (newTodo) => {
    if (newTodo.trim() === "") return;
    const newTodoItem = {
      id: Date.now(),
      todotext: newTodo,
      completed: false,
    };
    setTodoList([newTodoItem, ...todoList,]);
  };

  // handle add place submission
  const addPlace = (event) => {
    event.preventDefault();
    const newPlace = {
      id: Date.now(),
      destination,
      startDate,
      endDate,
      todoList: [...todoList],
    };
     // YELLOW
    setPlaces((prevPlaces) => [newPlace,...prevPlaces]);
    console.log("Newly created place ID:", newPlace.id);
    navigate("/");

    // clear inputs and reset todoList after submit
    setDestination("");
    setStartDate(null);
    setEndDate(null);
    setTodoList([]);
  };

  const [newTodoText, setNewTodoText] = useState("");

  // add a new todo
  const handleAddTodo = () => {
    addTodo(newTodoText);
    //clear
    setNewTodoText(""); 
  };

  ////TESTTEST
  useEffect(() => {
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  }, [startDate, endDate]);

  // store todoList in local storage when it changes
  // YELLOW
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todoList));
  // }, [todoList]);

  return (
    <Container >
      <h1 className="my-3 d-flex justify-content-center">Where to?</h1>
      <div className="d-flex justify-content-center">
      <Form onSubmit={addPlace}>
        <Form.Group className="mb-3" controlId="destination">
          <Form.Label>Destination</Form.Label>
          <Form.Control
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Your next destination"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date Range</Form.Label>
          <DateRangePicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </Form.Group>

        <InputGroup className="mb-3">
          <FormControl
            placeholder="Enter a new todo"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={handleAddTodo}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </InputGroup>

        {/* render todolist */}

        <TodoList todoList={todoList} setTodoList={setTodoList} />
        <div className="d-flex justify-content-center mt-3">
        <CustomButton>Done!</CustomButton>
        </div>
      </Form>
      </div>
    </Container>
  );
}


