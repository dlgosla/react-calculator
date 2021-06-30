
import React, { useState } from 'react';
import "./Calculator.css";
//import History  from './History';

function Calculator() { 

  const [outputs, setOutputs] = useState({
    current: '', 
    previous: '',
  });



  const [historyList, setHistoryList] = useState([]);

  const { current, previous} = outputs; 

  const evaluation = () => {
    console.log(current)
    //setHistoryList(historyList => [...historyList, current])
    setHistoryList(historyList => [...historyList, {sic: outputs.current, result: String(eval(outputs.current)) }])
    console.log(historyList)

    setOutputs({
      ...outputs,
      previous: current,
      current: String(eval(current)) ,
      
    });

  };
  
      return (
        
      <div className="row-wrapper">
        <div className="name">
          <span>React Calculator</span>
        </div>
        <div className="display">
          <div >{previous} =</div>
          <div>{current}</div>
        </div>
        <div className="row">
          <button onClick={()=>setOutputs({...outputs, current:current+"9"} )}>9</button>
          <button onClick={()=>setOutputs({...outputs, current:current+"8"} )}>8</button>
          <button onClick={()=>setOutputs({...outputs, current:current+"7"} )}>7</button>
          <button onClick={()=>setOutputs({...outputs, current:current.slice(0,-1)} )}>CE</button>
    
        </div>
        <div className="row">
          <button onClick={()=>setOutputs({...outputs, current:current+"6"} )}>6</button>
          <button onClick={()=>setOutputs({...outputs, current:current+"5"} )}>5</button>
          <button onClick={()=>setOutputs({...outputs, current:current+"4"} )}>4</button>
          <button onClick={()=>setOutputs({...outputs, current:current+" + "} )}>+</button>
        </div>

        <div className="row">
          <button onClick={()=>setOutputs({...outputs, current:current+"3"} )}>3</button>
          <button onClick={()=>setOutputs({...outputs, current:current+"2"} )}>2</button>
          <button onClick={()=>setOutputs({...outputs, current:current+"1"} )}>1</button>
          <button onClick={()=>setOutputs({...outputs, current:current+" - "} )}>-</button>
        </div>

        <div className="row">
          <button onClick={()=>setOutputs({...outputs, current:current+"0"} )}>0</button>
          <button onClick={()=>setOutputs({...outputs, current:current+" / "} )}>/</button>
          <button onClick={()=>setOutputs({...outputs, current:current+" * "} )}>*</button>
          <button onClick={evaluation}> =</button>
          
        </div>

        <div className="History">
          <h5>history</h5>
          {historyList.map(info => <History sic={info.sic} result={info.result} />)}
        </div>
        
      </div>

    );


    function History({sic, result}){
      return (
        <div className="row">
        <button onClick={()=>setOutputs({...outputs, current:sic} )} >{sic}</button> 
        <span> = </span>
        <button onClick={()=>setOutputs({...outputs, current:result} )}>{result}</button>
        </div>
        
      )
  }

  }





  export default Calculator;
