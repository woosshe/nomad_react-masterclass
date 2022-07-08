import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { dragTypeState } from "../atoms";
import imageTrash from "../resources/images/trash-bin.png";

const Area = styled.div<{ isDraggingOver: boolean }>`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 80px;
  height: 80px;
  background-color: ${(props) => (props.isDraggingOver ? "#ffeaa7" : "rgba(255, 255, 255, 0.3)")};
  background-image: url(${imageTrash});
  background-size: 48px;
  background-repeat: no-repeat;
  background-position: 50%;
  border-radius: 50%;
  box-shadow: ${(props) => (props.isDraggingOver ? "0 0 10px rgba(0, 0, 0, 0.3)" : "none")};
  transition: all 0.2s;
`;

function Trash() {
  return (
    <Droppable droppableId='trash'>
      {(magic, info) => (
        <Area isDraggingOver={info.isDraggingOver} ref={magic.innerRef} {...magic.droppableProps}></Area>
      )}
    </Droppable>
  );
}

export default Trash;
