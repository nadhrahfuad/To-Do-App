// EditPlace.jsx
import { useContext, useState, useEffect } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { PlaceContext } from '../contexts/PlaceContext';
import { useNavigate, useParams } from 'react-router-dom';
import DateRangePicker from '../components/DateRangePicker';
import TodoList from '../components/ToDoList/TodoList';
import { TodoContext } from '../contexts/TodoContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendarDays  } from "@fortawesome/free-regular-svg-icons";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import CustomButton from '../components/CustomBtn';

export default function EditPlace() {
  //extract values needed ffrom context
  const { places, setPlaces } = useContext(PlaceContext);
  const { todos, setTodos } = useContext(TodoContext);
  const navigate = useNavigate();
  //extract the id from URL
  const { id } = useParams();

  // if current both id of current place match the url id give me this place and, initialize fields and run
  const currentPlaceIndex = places.findIndex((place) => place.id === parseInt(id));
  const currentPlace = places[currentPlaceIndex];

  // initialize form fields
  const [destination, setDestination] = useState(currentPlace?.destination || '');
  const [startDate, setStartDate] = useState(currentPlace?.startDate || '');
  const [endDate, setEndDate] = useState(currentPlace?.endDate || '');
  const [todoList, setTodoList] = useState(currentPlace?.todoList || []);
 const [newTodoText, setNewTodoText] = useState('');
 
  
  const updatePlace = (event) => {
    event.preventDefault();

    // update places array with the new values
    const updatedPlaces = [...places];
    updatedPlaces[currentPlaceIndex] = { ...currentPlace, destination, startDate, endDate, todoList };
    setPlaces(updatedPlaces);

     // YELLOW
    navigate('/');
  };


  const addTodo = (newTodo) => {
    //if nothing exit
    if (newTodo.trim() === '') return;

    //new todo
    const newTodoItem = { id: Date.now(), todotext: newTodo, completed: false };

    //copy, add new item
    const updatedTodoList = [...todoList, newTodoItem];
    setTodoList(updatedTodoList);

    // copy, update todos context state (if needed)
    const updatedTodos = [...todos, newTodoItem];
    setTodos(updatedTodos);
    // console.log(todos)
    // console.log(newTodoItem)

    setNewTodoText('');
  };


  // call add
  const handleAddTodo = () => {
    addTodo(newTodoText);
  };

//start end dates
  useEffect(() => {
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  }, [startDate, endDate]);

  return (
    <Container>
      <h1 className="my-3 d-flex justify-content-center">Change of Plans?</h1>
      <div className="d-flex justify-content-center">
      <Form onSubmit={updatePlace}>
        <Form.Group className="mb-3" controlId="destination">
          <Form.Label>Destination</Form.Label>
          <Form.Control
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Enter destination"
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

        <TodoList todoList={todoList} setTodoList={setTodoList} placeId={id} />
        <div className="d-flex justify-content-center mt-3">
        <CustomButton>Done!</CustomButton>
        </div>
      </Form>
      </div>
    </Container>
  );
}
