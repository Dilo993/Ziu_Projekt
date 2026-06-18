import { Todo } from '../types/todo.types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: any) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-item-left">
        <input 
          type="checkbox" 
          className="todo-checkbox"
          checked={todo.completed} 
          onChange={() => onToggle(todo.id)} 
        />
        <span className="todo-text">{todo.title}</span>
      </div>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        Usuń
      </button>
    </div>
  );
}