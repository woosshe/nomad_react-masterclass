import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

export interface IToDoState {
  //[key: string]: IToDo[];
  id: string;
  toDos: IToDo[];
}

const toDoState = atom<IToDoState[]>({
  key: "toDo",
  // default: {
  //   "To Do": [
  //     { id: 1, text: "A" },
  //     { id: 2, text: "B" },
  //     { id: 3, text: "C" },
  //     { id: 4, text: "D" },
  //   ],
  //   Doing: [
  //     { id: 5, text: "A" },
  //     { id: 6, text: "B" },
  //   ],
  //   Done: [{ id: 7, text: "A" }],
  // },
  default: [
    {
      id: "To Do",
      toDos: [
        { id: 1, text: "A" },
        { id: 2, text: "B" },
        { id: 3, text: "C" },
        { id: 4, text: "D" },
      ],
    },
    {
      id: "Doing",
      toDos: [
        { id: 5, text: "E" },
        { id: 6, text: "F" },
      ],
    },
    {
      id: "Done",
      toDos: [{ id: 7, text: "G" }],
    },
  ],
});

export const toDoSelector = selector<IToDoState[]>({
  key: "toDoSelector",
  get: ({ get }) => {
    const oldToDo = get(toDoState);
    const lsToDo = window.localStorage.getItem("toDo");
    const parseToDo = lsToDo ? JSON.parse(lsToDo) : null;
    return parseToDo ?? oldToDo;
    //return get(toDoState);
  },
  set: ({ set }, newValue) => {
    window.localStorage.setItem("toDo", JSON.stringify(newValue));
    set(toDoState, newValue);
  },
});

export const dragTypeState = atom({
  key: "dragType",
  default: "",
});
