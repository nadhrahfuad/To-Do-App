import {useState, useEffect} from "react";

export default function LittleClock(){
    const [currentTime, setCurrentTime] = useState(new Date())
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
        },[]);
        const formattedTime = currentTime.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', second:'2-digit'})
        return(

            <h3 className="mt-2 me-1">{formattedTime}</h3>
                
        )
    }