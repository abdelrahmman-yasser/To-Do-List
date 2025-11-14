import TaskItem from "./TaskItem";
import styled from "styled-components";

const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
  border: 1px solid;
  border-radius: 10px;
`;
const Text = styled.p`
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  font-family: "Noto Kufi Arabic", sans-serif;
`;

function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <List>
      {tasks.length === 0 ? (
        <Text>أدخل مهامك</Text>
      ) : (
        tasks.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))
      )}
    </List>
  );
}

export default TaskList;
