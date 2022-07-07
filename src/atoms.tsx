import { atom } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": ["A", "B"],
    Doing: ["C", "D", "E"],
    Done: ["F"],
  },
});
