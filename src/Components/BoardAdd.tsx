import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoSelector } from "../atoms";

const Area = styled.div`
  position: fixed;
  left: 20px;
  bottom: 20px;
  input {
    width: 200px;
    box-sizing: border-box;
    padding: 5px 10px;
    border: solid 1px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    :hover {
      border-color: #3f8cf2;
    }
  }
`;

interface IForm {
  boardId: string;
}

function BoardAdd() {
  const [toDos, setToDos] = useRecoilState(toDoSelector);
  const { register, setValue, handleSubmit } = useForm();
  const onValid = ({ boardId }: IForm) => {
    setToDos((allBoards) => {
      const boardIndex = allBoards.findIndex((board) => board.id.toUpperCase() === boardId.toUpperCase());
      if (boardIndex < 0) {
        const newToDo = { id: boardId, toDos: [] };
        setValue("boardId", "");
        return [...allBoards, newToDo];
      }
      alert(boardId + " already exists");
      setValue("boardId", "");
      return [...allBoards];
    });
  };
  return (
    <Area>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("boardId", { required: true })} type='text' placeholder='Add board' />
      </form>
    </Area>
  );
}

export default BoardAdd;
