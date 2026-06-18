import { FilterType } from '../types/todo.types';

interface FilterBarProps {
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export function FilterBar({ currentFilter, setFilter }: FilterBarProps) {
  return (
    <div className="filter-container">
      <button 
        className={currentFilter === 'all' ? 'active' : ''} 
        onClick={() => setFilter('all')}
      >
        Wszystkie
      </button>
      <button 
        className={currentFilter === 'active' ? 'active' : ''} 
        onClick={() => setFilter('active')}
      >
        Aktywne
      </button>
      <button 
        className={currentFilter === 'completed' ? 'active' : ''} 
        onClick={() => setFilter('completed')}
      >
        Gotowe
      </button>
    </div>
  );
}