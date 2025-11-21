import { FaTrash } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import styled from "styled-components";
import { motion } from "framer-motion";

const ListItem = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 22px 0px;
  justify-content: space-between;

  &:not(:last-child) {
    border-bottom: 1px solid #555;
  }
`;
const Box = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;
const Text = styled.div`
  font-weight: 500;
  font-size: 20px;
  font-family: "Noto Kufi Arabic", sans-serif;
  word-wrap: anywhere;
`;
const Trash = styled(FaTrash)`
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: red;
  }
`;
function TaskItem({ task, onDelete, onToggle }) {
  return (
    <>
      <ListItem
        key={task.id}
        layout
        initial={{ opacity: 0, y: -10 }} // 🌀 الحركة عند الدخول
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }} // 🌀 الحركة عند الخروج
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "gray" : "black",
        }}
      >
        <div>
          <Trash onClick={() => onDelete(task.id)} />
        </div>
        <Box>
          <Text>{task.text}</Text>
          <div>
            {task.completed ? (
              <MdCheckBox
                size={24}
                color="green"
                onClick={() => onToggle(task.id)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <MdCheckBoxOutlineBlank
                size={24}
                color="gray"
                onClick={() => onToggle(task.id)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </Box>
      </ListItem>
    </>
  );
}

export default TaskItem;
