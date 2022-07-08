import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dragTypeState, toDoSelector } from "./atoms";
import Board from "./Components/Board";
import BoardAdd from "./Components/BoardAdd";
import Trash from "./Components/Trash";

// 0. Card input 꾸미기
// 1. To Do 삭제 기능 (쓰레기통으로 드래그 삭제)
// 2. 데이터 localStorage 저장
// 3. 새로운 Board 생성
// 4. Board 순서 변경 (드래그)

const Wrapper = styled.div`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  overflow-x: hidden;
  display: flex;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const setDragType = useSetRecoilState(dragTypeState);
  const [toDos, setToDos] = useRecoilState(toDoSelector);
  const onDragStart = (info: DragStart) => {
    setDragType(info.type);
  };
  const onDragEnd = (info: DropResult) => {
    setDragType("");

    const { destination: target, source } = info;

    if (!target) return;

    if (target.droppableId === "trash") {
      setToDos((allBoards) => {
        const newBoards = [...allBoards];
        const sourceBoardIndex = newBoards.findIndex((board) => board.id === source.droppableId);
        const sourceBoardToDos = [...newBoards[sourceBoardIndex].toDos];

        sourceBoardToDos.splice(source.index, 1);

        const newSourceBoard = { id: source.droppableId, toDos: sourceBoardToDos };

        newBoards.splice(sourceBoardIndex, 1);
        newBoards.splice(sourceBoardIndex, 0, newSourceBoard);

        return newBoards;
      });
    } else if (target.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const newBoards = [...allBoards];
        const sourceBoardIndex = newBoards.findIndex((board) => board.id === source.droppableId);
        const sourceBoardToDos = [...newBoards[sourceBoardIndex].toDos];
        const taskObj = sourceBoardToDos[source.index];

        sourceBoardToDos.splice(source.index, 1);
        sourceBoardToDos.splice(target.index, 0, taskObj);

        const newSourceBoard = { id: source.droppableId, toDos: sourceBoardToDos };

        newBoards.splice(sourceBoardIndex, 1);
        newBoards.splice(sourceBoardIndex, 0, newSourceBoard);

        return newBoards;
      });
    } else {
      setToDos((allBoards) => {
        const newBoards = [...allBoards];
        const sourceBoardIndex = newBoards.findIndex((board) => board.id === source.droppableId);
        const sourceBoardToDos = [...newBoards[sourceBoardIndex].toDos];
        const taskObj = sourceBoardToDos[source.index];

        const targetBoardIndex = newBoards.findIndex((board) => board.id === target.droppableId);
        const targetBoardToDos = [...newBoards[targetBoardIndex].toDos];

        sourceBoardToDos.splice(source.index, 1);
        targetBoardToDos.splice(target.index, 0, taskObj);

        const newSourceBoard = { id: source.droppableId, toDos: sourceBoardToDos };
        const newTargetBoard = { id: target.droppableId, toDos: targetBoardToDos };

        newBoards.splice(sourceBoardIndex, 1);
        newBoards.splice(sourceBoardIndex, 0, newSourceBoard);

        newBoards.splice(targetBoardIndex, 1);
        newBoards.splice(targetBoardIndex, 0, newTargetBoard);

        return newBoards;
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Wrapper>
        <Boards>
          {toDos.map((board, index) => (
            <Board key={board.id} boardId={board.id} toDos={board.toDos} />
          ))}
        </Boards>
        <BoardAdd />
        <Trash />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
