
import React, { useState } from 'react';
import "./Calculator.css";

import HistoryModal from './HistoryModal';
import "./HistoryModal.css"

//import History  from './History';

//계산기 컴포넌트
function Calculator() { 

  const [outputs, setOutputs] = useState({
    current: '', 
    previous: 'ans',
  });

  

  //hook을 이용해 history를 관리할 state 선언
  const [historyList, setHistoryList] = useState([]);

  //hook을 이용해 현재 값과 이전 값을 관리할 state 선언
  const { current, previous} = outputs; 

  //모달 open 상태 관리
  const [ modalOpen, setModalOpen ] = useState(false);

  //모달 open 상태 관리 함수
  const openModal = () => {
      setModalOpen(true);
  }

  const closeModal = () => {
      setModalOpen(false);
  }

  // = 버튼이나 enter를 눌렀을 때 호출
  const evaluation = () => {
    //eval_result = eval(current);

    if (String(eval(current)) === "undefined") {
      setOutputs({...outputs, current:"", previous:""} );
      return;
    }

    

    //history 리스트에 현재 입력된 식과 답 추가
    setHistoryList(historyList => [...historyList, {sic: outputs.current, result: String(eval(outputs.current)) }]);
    console.log(historyList);

    // 현재 값과 이전 값을 업데이트
    setOutputs({
      ...outputs,
      previous: current,
      current: String(eval(current)) ,
      
    });
  };

  //키보드로 입력할 때 호출
  const onChange = (e) => {
    console.log(e.type + ": "+ e.target.value);
    setOutputs({...outputs, current:e.target.value} )
  }

  //엔터를 눌렀을 때 호출
  const onKeyPress = (e) => {
    if(e.key === 'Enter'){
      evaluation();
    }
  }

    return (
      <div className="row-wrapper">
        <div className="name">
          
        </div>
        <div className="display">
          <div id="previous_value">{previous} =</div>
          <input id="current_value" type="text" onKeyPress={onKeyPress} value={current} onChange={onChange} autoFocus/>
        </div>
        <div className="row">
          <button className="calc_button" onClick={()=>setOutputs({...outputs, current:current+"9"} )}>9</button>
          <button className="calc_button" onClick={()=>setOutputs({...outputs, current:current+"8"} )}>8</button>
          <button className="calc_button" onClick={()=>setOutputs({...outputs, current:current+"7"} )}>7</button>
          <button className="calc_button" onClick={()=>setOutputs({...outputs, current:current.slice(0,-1)} )}>CE</button>
    
        </div>
        <div className="row">
          <button className="calc_button" onClick={()=>setOutputs({...outputs, current:current+"6"} )}>6</button>
          <button className="calc_button" onClick={()=>setOutputs({...outputs, current:current+"5"} )}>5</button>
          <button className="calc_button" onClick={()=>setOutputs({...outputs, current:current+"4"} )}>4</button>
          <button className="calc_button" onClick={()=>setOutputs({...outputs, current:current+"+"} )}>+</button>
        </div>

        <div className="row">
          <button className="calc_button" onClick={()=>setOutputs({...outputs, current:current+"3"} )}>3</button>
          <button className="calc_button" onClick={()=>setOutputs({...outputs, current:current+"2"} )}>2</button>
          <button className="calc_button" onClick={()=>setOutputs({...outputs, current:current+"1"} )}>1</button>
          <button className="calc_button" onClick={()=>setOutputs({...outputs, current:current+"-"} )}>-</button>
        </div>

        <div className="row">
          <button className="calc_button" onClick={()=>setOutputs({...outputs, current:current+"0"} )}>0</button>
          <button className="calc_button" onClick={()=>setOutputs({...outputs, current:current+"/"} )}>/</button>
          <button className="calc_button" onClick={()=>setOutputs({...outputs, current:current+"*"} )}>*</button>
          <button className="calc_button" onClick={evaluation}> =</button>
          
        </div>

        
        <div className="history">
          <React.Fragment>
            <button className="modal_button" onClick={ openModal }>HISTORY</button>
              <HistoryModal open={ modalOpen } close={ closeModal } header="MY HISTORY">
                {historyList.map(info => <History sic={info.sic} result={info.result} />)}
              </HistoryModal>
          </React.Fragment>
        </div>
      </div>

    );

    //history 컴포넌트
    function History({sic, result}){

      //히스토리를 클릭 시 current 값을 클릭된 히스토리 값으로 변경 
      return (
        <div className ="frame">
          <div className="history">
            <button className="history_button" onClick={()=>setOutputs({...outputs, current:sic} )} >{sic}</button> 
            <span className="equal"> = </span>
            <button className ="history_button" onClick={()=>setOutputs({...outputs, current:result} )}>{result}</button>
          </div>
        </div>
      )
  }

  }


  export default Calculator;
