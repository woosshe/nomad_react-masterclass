import { atom } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do: ["A", "B"],
    doing: ["C", "D", "E"],
    done: ["F"],
  },
});
