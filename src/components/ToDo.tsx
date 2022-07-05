import { IToDo } from "../atoms";

function ToDo({ text, id, category }: IToDo) {
  return (
    <li>
      <span>{text}</span>
      <button>To Do</button>
      <button>Done</button>
      <button>Doing</button>
    </li>
  );
}

export default ToDo;
