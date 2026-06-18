import React from 'react';

interface Props {
  onAdd: (title: string) => void;
}

export function AddTodoForm({ onAdd }: { onAdd: (title: string) => void }) {
  const [text, setText] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modern-form">
      <input 
        className="modern-input"
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Dodaj nowe zadanie..." 
      />
      <button type="submit" className="add-btn">
        <span>+</span> Dodaj
      </button>
    </form>
  );
}