
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
// import { faPlus} from "@fortawesome/free-solid-svg-icons";
import LoadingGIF from "../assets/inprogress.gif"
import AppLogoRed from "../assets/applogored.png"


const CalculateDaysLeft = ({ startDate }) => {
  const currentDate = new Date();
  const startDateTime = new Date(startDate);

  const differenceInMs = startDateTime.getTime() - currentDate.getTime()
  //days left formula, round up, whole days
  const daysLeft = Math.ceil((differenceInMs) / (1000 * 3600 * 24)); 

  if (daysLeft > 0) {
    // return <span> <FontAwesomeIcon className="me-2"icon={faCircleCheck} />Travel Goal Met!</span>; 
    return <span className ="px-2" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{daysLeft} {daysLeft === 1 ? "day":"days"} left</span>;
  } else if(daysLeft === 0){
    return<div className="  d-flex  justify-content-center align-items-center ">

      {LoadingGIF ?(<img src={LoadingGIF} style={{ width: '40px', height: '40px' }} alt=""/>):(<img style={{ width: '40px', height: '40px' }} src={AppLogoRed}></img>)}

{/* FIXXXFIXX */}
      <p className="mt-3 mx-2"  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>In progress</p>
      </div>
  }else{
    return <span> <FontAwesomeIcon className="px-2"icon={faCircleCheck} />Travel Goal Met!</span>; 
  }
};

export default CalculateDaysLeft;
