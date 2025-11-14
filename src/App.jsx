import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import styled, { createGlobalStyle } from "styled-components";
import "./App.css";
import { motion } from "framer-motion";

const GlobalStyle = createGlobalStyle`

  body {
    font-family: 'Noto Kufi Arabic', 'Tajawal', sans-serif;
  }
`;

const MainDiv = styled(motion.div)`
  border-radius: 15px;
  padding: 6px 23px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  font-family: "Poppins", sans-serif;
`;

const AddingSection = styled.div`
  border: 1px solid;
  border-radius: 10px;
  padding: 8px 15px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

const Input = styled.input`
  border: none;
  font-size: 16px;
  font-family: "Noto Kufi Arabic", sans-serif;

  &:focus {
    outline: none;
  }
`;
const Heading = styled.h1`
  font-family: "Tajawal", sans-serif;
  font-size: 37px;
  font-weight: 700;
  margin: 22px;
`;
const Button = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: "Noto Kufi Arabic", sans-serif;
  cursor: pointer;
  transition: border-color 0.25s;
`;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addHandler = () => {
    if (inputValue === "") return;
    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      addHandler();
    }
  };

  const onInputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };
  const deleteHandler = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };
  const toggleCompleteHandler = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };
  return (
    <>
      <GlobalStyle />
      <MainDiv
        layout // 🌀 يخلي التغير في الحجم يبقى smooth
        initial={{ opacity: 0, y: 20 }} // أول ما الصفحة تفتح
        animate={{ opacity: 1, y: 0 }} // بعد التحميل
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Heading>قائمة المهام</Heading>
        <AddingSection>
          <Button onClick={addHandler}>إضافة</Button>
          <Input
            type="text"
            value={inputValue}
            placeholder="اكتب مهمتك..."
            onChange={onInputChangeHandler}
            onKeyDown={keyDownHandler}
            dir="rtl"
          />
        </AddingSection>
        <TaskList
          tasks={tasks}
          onDelete={deleteHandler}
          onToggle={toggleCompleteHandler}
        />
      </MainDiv>
    </>
  );
}

export default App;
