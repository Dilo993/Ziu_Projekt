import { Todo } from '../types/todo.types';

export default function TodoListTailwind({ todos, onToggle, onDelete }: { todos: Todo[], onToggle: (id: string) => void, onDelete: (id: string) => void }) {
  return (
    <ul className='divide-y divide-gray-200 border rounded-xl overflow-hidden'>
      {todos.map(todo => (
        <li key={todo.id} className='flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-50'>
          {/* TODO 6: Checkbox Tailwind */}
          <input 
            type='checkbox' 
            checked={todo.completed} 
            onChange={() => onToggle(todo.id)}
            className='w-5 h-5 text-brand-500 rounded focus:ring-brand-500' 
          />
          {/* TODO 7: Tekst Tailwind */}
          <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {todo.text}
          </span>
          {/* TODO 8: Przycisk Tailwind */}
          <button onClick={() => onDelete(todo.id)} className='text-danger hover:underline text-sm'>
            Usuń
          </button>
        </li>
      ))}
    </ul>
  );
}