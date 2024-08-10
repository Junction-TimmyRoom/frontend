import { useState } from 'react';

import { Text } from '@/components/common/Text';

interface BarProps {
  setPhase: (phase: number) => void;
}

const Phase1 = ({ setPhase }: BarProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setInputValue(e.target.value);
    }
  };

  const handleNextClick = () => {
    if (inputValue !== '') {
      localStorage.setItem('nickname', inputValue);
      setPhase(2);
    }
  };
  return (
    <>
      <section className="h-2/3 content-input flex flex-col items-center justify-center ">
        <Text fontSize={24} fontWeight={600} className="text-center">
          Hello!
          <br />
          Please enter your nickname
        </Text>
        <input
          className="w-full h-71pxr bg-navy5 rounded-14pxr text-center outline-none mt-45pxr mb-6pxr .placeholder-gray-500::placeholder text-black text-18px font-bold"
          placeholder="Please enter within 10 characters"
          value={inputValue}
          onChange={handleChange}
        />
        <p className="text-gray02 text-12pxr">{inputValue.length}/10</p>
      </section>
      <button
        className={`fixed left-1/2 bottom-31pxr transform -translate-x-1/2 w-[calc(100%-32px)] h-79pxr bg-navy rounded-50pxr text-white ${
          inputValue === '' ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleNextClick}
        disabled={inputValue === ''}
      >
        next
      </button>
    </>
  );
};

export default Phase1;
