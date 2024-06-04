import { FaCheck } from "react-icons/fa";

interface HeaderProps {
  addTodo: (content: string) => void;
  toggleTodoAll: () => void;
}

const Header = ({ addTodo, toggleTodoAll }: HeaderProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.nativeEvent.isComposing) return;
      // 다음 코드는 한글과 같이 글자의 조합으로 단어가 만들어지는 언어일 경우 꼭 처리해주어야 하는데요
      // 조합 문자에 대해서는 키 관련 이벤트가 두 번씩 호출되기 때문입니다.
      // 따라서 e.nativeEvent.isComposing 속성이 참일 경우에 두 번째로 호출된 필요 없는 이벤트를 무시할 수 있습니다.
      const target = e.currentTarget;
      const content = target.value.trim();
      if (content) {
        addTodo(content);
        target.value = "";
      }
    }
  };

  return (
    <div className="flex gap-2 items-stretch px-4 h-16 focus-within:outline focus-within:outline-2 focus-within:outline-blue-300 border-b-2 border-stone-300 shrink-0">
      <button
        className="w-8 flex items-center justify-center hover:text-stone-600 text-stone-400"
        onClick={toggleTodoAll}
      >
        <FaCheck />
      </button>
      <input
        type="text"
        className="flex-1 focus:outline-none text-lg placeholder:italic"
        placeholder="입력해주세요"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Header;
