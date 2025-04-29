import { useState } from 'react';

type QuizProps = {
  question: string;
  options: string[];
  correct: number;
  onAnswer: (isCorrect: boolean) => void;
};

export default function Quiz({ question, options, correct, onAnswer }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (selected === null) return;
    const result = selected === correct;
    setIsCorrect(result);
    onAnswer(result);
  };

  return (
    <div className="mb-4 text-black">
      <p className="text-lg font-semibold">{question}</p>
      <ul className="mt-2">
        {options.map((option, index) => (
          <li key={index} className="mb-2">
            <button
              onClick={() => setSelected(index)}
              className={`block w-full text-left p-2 border rounded ${
                selected === index ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-300'
              }`}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Submit Answer
      </button>
      {isCorrect !== null && (
        <p className={`mt-2 font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {isCorrect ? 'Correct!' : 'Incorrect!'}
        </p>
      )}
    </div>
  );
}