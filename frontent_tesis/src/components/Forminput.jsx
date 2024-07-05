
import { useState } from "react";
function Forminput({place,valor,setvalor}) {


  return (
  
        <input type="text" placeholder={place} value={valor} onChange={(e) => {
          e.preventDefault()
          setvalor(e.target.value)
        }}/>
   
   
  )
}

export default Forminput;