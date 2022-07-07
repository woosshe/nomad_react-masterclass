import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [
      { id: 1, text: "A" },
      { id: 2, text: "B" },
      { id: 3, text: "C" },
      { id: 4, text: "D" },
    ],
    Doing: [],
    Done: [],
  },
});
