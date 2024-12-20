import React, { useState } from "react"
import './App.css'
import usePasswordGenerator from "./hooks/use-password-generator";
import PasswordStrengthIndicator from "./components/StrengthChecker";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";

function App() {

  const[length,setLength] = useState(4);
  const[checkboxData,setCheckboxData] = useState([{title:"Include Uppercase Letters",state:false},
    {title:"Include Lowercase Letters",state:false},
    {title:"Include Numbers",state:false},
    {title:"Include Symbols",state:false}
  ]);
  const[copied,setCopied] = useState(false)

  const handleCopy = () =>{
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(()=>{
        setCopied(false)
    },1000)
  }

  const{password,errorMessage,generatePassword}=usePasswordGenerator()
  
  const handleCheckboxChange = (i) =>{
     const updateCheckboxData = [...checkboxData];
     updateCheckboxData[i].state = !updateCheckboxData[i].state
    setCheckboxData(updateCheckboxData);
  };

  return (
   <div className='container'>
     {/* Password Text and Copy */}
     {password && (
      <div className="header">
      <div className="title">{password}</div>
        <Button text={copied ? "Copied":"copy"} onClick={handleCopy} customClass="copyBtn"/>
      </div>
     )}    
      {/* Character Length */}
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input type="range" min='4' max='20' value={length} onChange={(e)=>setLength(e.target.value)}/>
      </div>
      {/* Checkboxes */}
      <div className="checkboxes">
        {checkboxData.map((checkbox,index)=>{
          return(
          <Checkbox key={index} title={checkbox.title} onChange={()=> handleCheckboxChange(index)} state={checkbox.state}/>
          );
        })}
      </div>
      {/* Strong Indication */}
      <PasswordStrengthIndicator password={password}/>
      {/* Error Handling */}
      {errorMessage && <div className="errorMesssage">{errorMessage}</div>
        }
      {/* Generate Password */}
      <Button text="Generate Password" onClick={()=>generatePassword(checkboxData,length)} className="generateBtn"/>
   </div>
  )
}

export default App
