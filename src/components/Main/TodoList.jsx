import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  toggleTodo,
  deleteTodo,
  addTodo,
  editTodo,
} from "../../redux/modules/todoSlice";
import { BiTrashAlt } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsArrowUpCircle } from "react-icons/bs";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(
        addTodo({
          id: Date.now(),
          text: newTodo,
          completed: false,
        })
      );
      setNewTodo("");
    }
  };

  const handleEditTodo = (id, newText) => {
    if (newText.trim()) {
      dispatch(
        editTodo({
          id,
          text: newText,
        })
      );
    }
  };

  return (
    <StContainer>
      <StTodoList>
        {todos.map((todo) => (
          <StTodoListDescription key={todo.id}>
            <div>
              <StCheckbox
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
            </div>

            <div>
              <StDeleteButton
                onClick={() =>
                  handleEditTodo(
                    todo.id,
                    prompt("Enter new todo text", todo.text)
                  )
                }
              >
                <AiOutlineEdit />
              </StDeleteButton>
              <StDeleteButton onClick={() => handleDeleteTodo(todo.id)}>
                <BiTrashAlt />
              </StDeleteButton>
            </div>
          </StTodoListDescription>
        ))}
      </StTodoList>
      <div>
        <StTodoForm>
          <StTodoInput
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <StTodoAddButton onClick={handleAddTodo}>
            <BsArrowUpCircle />
          </StTodoAddButton>
        </StTodoForm>
      </div>
    </StContainer>
  );
};

export default TodoList;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px gray;
  border-radius: 15px;
  height: 300px;
`;

const StTodoList = styled.div`
  height: 250px;
  overflow-y: scroll;
  padding: 10px;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }
`;

const StTodoListDescription = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  color: gray;
  padding: 5px 10px 0px 10px;
  margin-top: 10px;
`;

const StCheckbox = styled.input`
  margin: 0px 15px 0 0px;
  height: 24px;
  width: 24px;
  cursor: pointer;

  /* TODO: 이건 체크 박스 동그라미로 만들어주는데  check효과까지 직접 만들어줘야함.. */
  /* border: 1px solid #999;
  border-radius: 50%;
  appearance: none;
  :checked {
    background: #5cabff;
    border: none;
  } */
`;

const StDeleteButton = styled.span`
  margin: 0px 15px 0 8px;
  height: 24px;
  width: 24px;
  cursor: pointer;
`;

const StTodoForm = styled.form`
  display: flex;
  align-items: center;
  /* padding: 10px; */
  border-top: solid 1px gray;
`;

const StTodoInput = styled.input`
  flex: 1;
  width: 100%;
  height: 33px;
  font-size: 16px;
  border: solid 1px gray;
  border-radius: 20px;
  margin: 14px 5px 14px 20px;
`;

const StTodoAddButton = styled.button`
  margin-top: 7px;
  padding: 10px;
  font-size: 33px;
  color: gray;
  background-color: transparent;
  border: none;
  /* border-radius: 5px; */
  cursor: pointer;
  :hover {
    color: #3498db;
  }
  /* background-color: #3498db;
  color: #fff; */
`;
