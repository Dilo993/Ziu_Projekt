import { useState } from 'react';

export default function TodoInputTailwind({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState('');
  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText('');
  };

  return (
    <div className='mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200'>
      <h2 className='text-lg font-semibold text-gray-800 mb-2'>Dodaj zadanie (Tailwind)</h2>
      <div className='flex gap-2'>
        <input
          type='text'
          value={text}
          onChange={e => setText(e.target.value)}
          className='flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none'
          placeholder='Co jest do zrobienia?'
        />
        <button
          onClick={handleSubmit}
          className='px-6 py-2 bg-brand-500 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors'
        >
          Dodaj
        </button>
      </div>
    </div>
  );
}