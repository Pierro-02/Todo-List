import { useEffect, useState } from "react"
import { Todo } from "./types/Todo"
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import { Input } from "./components/ui/input";

import { Search, Minus, Check } from "lucide-react";

const TodoItem = (props: { item: Todo; key: number; onRemove: () => void; darkmode?: boolean }) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    props.item.isCompleted = isCompleted;
  }, [isCompleted])

  return (
    <>
      <div key={props.key} className="flex flex-row items-center self-start text-2xl w-full dark:bg-gray-900">
        <Checkbox className="mx-3 size-6 dark:border-2 dark:border-white" id="isCompleted" onCheckedChange={() => { setIsCompleted(!isCompleted) }} />
        <p
          style={{
            textDecoration: isCompleted ? 'line-through' : '',
            textDecorationThickness: isCompleted ? '3px' : '',
            textDecorationColor: isCompleted ? 'black' : ''
          }}
          className="m-3 w-full">
          {props.item.text}
        </p>
        <Button
          variant="destructive"
          className="size-7 cursor-pointer mx-5"
          type="button"
          onClick={props.onRemove}
        >
          <Minus color="black" />
        </Button>
      </div>
      <div className="bg-gray-300 w-full h-[1px]" />
    </>
  )
}

const NewItem = (props: { text: string, onChange: (val: string) => void; onClick: () => void }) => {
  return (
    <>
      <div className="flex items-center self-start w-full dark:bg-gray-900">
        <Checkbox className="mx-3 size-6 dark:border-2 dark:border-white" id="isCompleted" checked={false} />
        <div className="flex flex-row w-full items-center space-x-2">
          <Input
            value={props.text}
            className="m-3 border-2 shadow-none !text-2xl !focus:shadow-none !focus:border-0"
            onChange={(e) => props.onChange(e.target.value)}
          />
          <Button
            className="right-0 size-7 cursor-pointer bg-green-500 hover:bg-green-300 mx-5"
            type="button"
            onClick={props.onClick}
          >
            <Check color="black" />
          </Button>
        </div>
      </div>
      <div className="bg-gray-300 w-full h-[1px]" />
    </>
  )
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark'); // removes 'dark' from <html>
    } else {
      document.documentElement.classList.add('dark'); // adds 'dark' to <html>
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  const removeItem = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const addTodo = () => {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      isCompleted: false
    }

    setTodos([...todos, newTodo]);
    setText("");
  }

  return (
    <div className="main-container flex flex-col items-center w-full h-[100vh]">
      <h1 className="heading my-5 text-4xl">TODO LIST</h1>
      <div className="header-bar flex space-x-5">
        <div className="search-bar flex items-center border-2 rounded-lg">
          <span className="search-icon px-2"><Search /></span>
          <span className="seperator w-[1px] h-full border-1" />
          <Input className="px-2 border-0" inputMode="search" placeholder="search..." onChange={handleChange} />
        </div>
        {/* <SelectFilter /> */}
        <div className="dark-mode-switch">
          <Switch id="dark-mode" onCheckedChange={toggleDarkMode} />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </div>
      <div className="main-container h-full w-[98%] m-4 flex flex-col items-center border-1 border-black">
        {todos.map((todo, index) => {
          return (
            <TodoItem item={todo} key={index} onRemove={() => removeItem(index)} />
          )
        })}
        <NewItem text={text} onChange={setText} onClick={addTodo} />
      </div>
    </div>
  )
}

export default App
