import React, { useState } from 'react';
import './dragAndDrop.scss';

// ----------------------------------------------------------------------

interface DragAndDrop {
  children: React.ReactNode;
  isDrag: boolean;
  handleDragOver: Function;
  handleDragLeave: Function;
  handlerDrop: Function;
}

// ----------------------------------------------------------------------

export default function DragAndDrop({ children, isDrag, handleDragOver, handleDragLeave, handlerDrop }: DragAndDrop) {
  return (
    <>
      <div
        className="dragAndDropComponent"
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDrop={(e) => handlerDrop(e)}
      >
        {isDrag && (
          <div className="dragAndDropContainer">
            <div className="dragAndDropContent">
              <h2>Drag and drop file</h2>
              <span>Drop you file</span>
            </div>
          </div>
        )}
        {children}
      </div>
    </>
  );
}
