import { type TabState } from "./useTodoList";

interface FooterProps {
  currentTab: TabState;
  setCurrentTab: (tab: TabState) => void;
  completedTodoExists: boolean;
  remainTodosAmount: number;
  deleteCompletedTodo: () => void;
}

const Footer = ({
  currentTab,
  setCurrentTab,
  completedTodoExists,
  remainTodosAmount,
  deleteCompletedTodo,
}: FooterProps) => {
  return (
    <div className="flex px-4 items-center h-12 justify-center shrink-0 border-t-[1px] border-stone-300">
      <p className="absolute left-4 text-sm text-stone-500">
        {remainTodosAmount} items
      </p>
      <div className="flex gap-4">
        {(["All", "Active", "Completed"] as TabState[]).map((tab) => (
          <button
            key={tab}
            onClick={setCurrentTab.bind(null, tab)}
            // conClick={()=>setCurrentTab(tab)}
            className={`p-1 text-lg hover:text-stone-600 ${
              currentTab === tab
                ? "outline outline-1 outline-stone-300 text-stone-600"
                : "text-stone-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {completedTodoExists && (
        <button
          className="absolute right-4 text-stone-400 hover:text-stone-600"
          onClick={deleteCompletedTodo}
        >
          Clear completed
        </button>
      )}
    </div>
  );
};

export default Footer;
