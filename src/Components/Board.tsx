import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoSelector } from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  width: 300px;
  padding: 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  position: relative;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  padding: 0 10px;
  height: 24px;
  line-height: 24px;
  em {
    position: absolute;
    right: 10px;
    top: 0;
    height: 24px;
    line-height: 24px;
    cursor: pointer;
    ::before {
      content: "x";
      font-weight: normal;
    }
  }
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? "rgba(0, 0, 0, 0.1)" : props.isDraggingFromThis ? "transparent" : "transparent"};
  flex-grow: 1;
  transition: background-color 0.2s ease;
  padding: 10px;
  border-radius: 5px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: calc(100% - 20px);
    box-sizing: border-box;
    margin: 0 10px 10px 10px;
    padding: 5px 10px;
    border: solid 1px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    :hover {
      border-color: #3f8cf2;
    }
  }
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const allBoards = useRecoilValue(toDoSelector);
  const setToDos = useSetRecoilState(toDoSelector);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      const newBoards = [...allBoards];
      const boardIndex = newBoards.findIndex((board) => board.id === boardId);

      const newToDos = [newToDo, ...newBoards[boardIndex].toDos];
      const newBoard = { id: boardId, toDos: newToDos };

      newBoards.splice(boardIndex, 1);
      newBoards.splice(boardIndex, 0, newBoard);

      return newBoards;
    });
    setValue("toDo", "");
  };
  const onBoardCloseClick = (boardId: string) => {
    setToDos((allBoards) => {
      const newBoards = [...allBoards];
      const boardIndex = newBoards.findIndex((board) => board.id === boardId);
      newBoards.splice(boardIndex, 1);
      return newBoards;
    });
  };
  return (
    <Wrapper>
      <Title>
        {boardId}
        <em
          onClick={() => {
            onBoardCloseClick(boardId);
          }}
        ></em>
      </Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", { required: true })} type='text' placeholder={`Add task on ${boardId}`} />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
