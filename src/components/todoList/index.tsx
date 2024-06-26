import Header from "./Header";
import TodoItem from "./TodoItem";
import Footer from "./Footer";
import useTodoList from "./useTodoList";

interface TodoListProps {
  id: string;
}

const TodoList = ({ id }: TodoListProps) => {
  const {
    state: {
      completedTodoExists,
      currentTab,
      filteredTodos,
      remainTodosAmount,
      count,
    },
    action: {
      addTodo,
      deleteCompletedTodo,
      deleteTodo,
      editTodo,
      setCurrentTab,
      toggleTodo,
      toggleTodoAll,
      updateCount,
    },
  } = useTodoList(id);

  return (
    <div className="w-[600px] max-h-[calc(100vh-200px)] flex flex-col bg-white rounded-lg drop-shadow-md bg">
      <Header addTodo={addTodo} toggleTodoAll={toggleTodoAll} />
      <div className="h-full overflow-y-auto">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
      <div>
        <p>{count}</p>
        <button type="button" aria-label="count" onClick={updateCount}>
          +1
        </button>
      </div>
      <Footer
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        completedTodoExists={completedTodoExists}
        remainTodosAmount={remainTodosAmount}
        deleteCompletedTodo={deleteCompletedTodo}
      />
    </div>
  );
};

export default TodoList;
