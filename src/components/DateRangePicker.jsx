import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays  } from "@fortawesome/free-regular-svg-icons";
import {useRef} from "react"

export default function DateRangePicker({ startDate, endDate, setStartDate, setEndDate }) {
  
  const startDateFocus = useRef(null)
  const endDateFocus = useRef(null)

    return (
    <div className="d-flex align-items-center ">
      <FontAwesomeIcon 
      className="fa-xl me-2 " 
      icon={faCalendarDays}
      onClick={() => startDateFocus.current.setFocus()} 
       />
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        dateFormat="dd/MM/yyyy"
        placeholderText="Start Date"
        className="form-control mr-2"
        onKeyDown={(e) => {
            e.preventDefault()}}
        required
        ref={startDateFocus}
      />

      <FontAwesomeIcon className="fa-xl mx-2" 
      icon={faCalendarDays} 
      onClick={() => endDateFocus.current.setFocus()} 
      />

      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate || new Date()}
        dateFormat="dd/MM/yyyy"
        placeholderText="End Date"
        className="form-control"
        onKeyDown={(e) => {
            e.preventDefault()}}
        required
        ref={endDateFocus}
      />
    </div>
  );
}


