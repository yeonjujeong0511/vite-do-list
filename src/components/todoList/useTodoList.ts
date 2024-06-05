import { useEffect, useReducer, useState } from "react";

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

export type TabState = "All" | "Active" | "Completed";

export type count = number;

const useTodoList = (id: string) => {
  const [count, setCount] = useState<count>(1);
  const updateCount = () => {
    setCount(count + 1);
  };

  // list
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      content: "Todo 1",
      completed: false,
    },
    {
      id: "2",
      content: "Todo 2",
      completed: true,
    },
    {
      id: "3",
      content: "Todo 3",
      completed: false,
    },
  ]);
  // current Tab
  const [currentTab, setCurrentTab] = useState<TabState>("All");

  useEffect(() => {
    const savedData = localStorage.getItem(`todo-list-${id}`);
    if (savedData) {
      const { todos, currentTab } = JSON.parse(savedData);
      setTodos(todos);
      setCurrentTab(currentTab);
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(
      `todo-list-${id}`,
      JSON.stringify({ todos, currentTab })
    );
  }, [todos, currentTab, id]);

  //  list 상태 별로 보여줌
  const filteredTodos = todos.filter((todo) => {
    if (currentTab === "All") {
      return true;
    } else if (currentTab === "Active") {
      return !todo.completed;
    } else if (currentTab === "Completed") {
      return todo.completed;
    }
  });

  // 남은 list 개수
  const remainTodosAmount = todos.filter((todo) => !todo.completed).length;

  // list 중 complted == true가 하나라도 존재하면 true 반환
  const completedTodoExists = todos.some((todo) => todo.completed);

  // 새로운 Todo 추가
  const addTodo = (content: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      content,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // 수정
  const editTodo = (id: string, content: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, content } : todo))
    );
  };

  // 삭제
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // 완료된 todo 삭제
  const deleteCompletedTodo = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  //  해당 todo 완료
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  // 모든 todo 완료
  const toggleTodoAll = () => {
    const areAllCompleted = todos.every((todo) => todo.completed);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, completed: !areAllCompleted }))
    );
  };

  return {
    state: {
      todos,
      currentTab,
      filteredTodos,
      remainTodosAmount,
      completedTodoExists,
      count,
    },
    action: {
      addTodo,
      editTodo,
      deleteTodo,
      deleteCompletedTodo,
      toggleTodo,
      toggleTodoAll,
      setCurrentTab,
      updateCount,
    },
  };
};

export default useTodoList;
