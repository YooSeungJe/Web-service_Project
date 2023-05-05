import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar(pos){
  const [ showBar, setShowBar ] = useState(true);
  const position = pos.scrollElement.current;
  const top = document.querySelector('#root');
  const onMoveBox = (card) => {
    setShowBar(!showBar)
    if(card===0){
      top.scrollIntoView({ behavior: "smooth", block: "start" });
    }else{
      position[card].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {showBar && 
        <div className='sidebar'>
          <div className='sidebarText' onClick={()=>onMoveBox(0)}>맨 위로</div>
          <div className='sidebarText' onClick={()=>onMoveBox(1)}>학력</div>
          <div className='sidebarText' onClick={()=>onMoveBox(2)}>프로젝트</div>
          <div className='sidebarText' onClick={()=>onMoveBox(3)}>자격증</div>
          <div className='sidebarText' onClick={()=>onMoveBox(4)}>수상경력</div>
        </div>
      }
      <div className='sidebarButton'onClick={()=>setShowBar(!showBar)}>
        이동
      </div>
    </>
  )
}

export default Sidebar;