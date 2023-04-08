import React, { memo } from 'react';
import '../CSS/header2.css';
function Header2() {
  return (
    <div className="shadow-xl rounded-[10px]">
      <div className="header3 !mt-5 rounded-[10px] overflow-hidden">
        <div id="Left"></div>
        <div id="Right">
          <div id="top"></div>
          <div id="bot"></div>
        </div>
      </div>
    </div>
  );
}
export default memo(Header2);
