import Link from 'next/link';
import { useState } from 'react';
import Dropdown from './Dropdown';

type Module = {
  id: string;
  title: string;
  description: string;
};

export default function ProgressCard({ module }: { module: Module }) {

  return (
    <div className="p-4 bg-white border rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-blue-800">{module.title}</h2>
      <p className="text-gray-600 mt-2">{module.description}</p>
      <Dropdown title="View Module Progress">
        <p className="text-gray-600 mt-2">
          <strong>Videos watched</strong>:
        </p>
        <p className="text-gray-600 mt-2">
              <pre>   Introduction to Investing: Yes!</pre>
              <pre>   Why Investing Matters: Yes!</pre>
              <pre>   Types of Investments: Yes!</pre> <br></br>
            <strong>Quiz Complete:</strong> Yes!
              </p>
      </Dropdown>
      
    </div>
  );
}