import React from "react";
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";

function App() {
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    console.log(result, provided);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId='one'>
          {(magic) => {
            return (
              <ul ref={magic.innerRef} {...magic.droppableProps}>
                <Draggable draggableId='first' index={0}>
                  {(magic) => (
                    <li ref={magic.innerRef} {...magic.draggableProps}>
                      <span {...magic.dragHandleProps}>🔥</span>One
                    </li>
                  )}
                </Draggable>
              </ul>
            );
          }}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
