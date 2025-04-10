import { useState } from 'react';

export default function Quiz({ question, options, correct }: { question: string, options: string[], correct: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    setFeedback(selected === correct ? '✅ Correct!' : '❌ Try again.');
  };

  return (
    <div className="p-4">
      <h3 className="font-bold">{question}</h3>
      <ul>
        {options.map((opt, i) => (
          <li key={i} onClick={() => setSelected(i)} className={`cursor-pointer p-2 border my-1 ${selected === i ? 'bg-blue-100' : ''}`}>
            {opt}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Submit</button>
      {feedback && <p className="mt-2">{feedback}</p>}
    </div>
  );
}
