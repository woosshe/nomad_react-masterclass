import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      const newToDos = [{ text: toDo, id: Date.now(), category }, ...oldToDos];
      window.localStorage.setItem(Categories.TO_DO, JSON.stringify(newToDos));
      return newToDos;
    });
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input {...register("toDo", { required: "Please write a To Do" })} placeholder='Write a to do' />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
