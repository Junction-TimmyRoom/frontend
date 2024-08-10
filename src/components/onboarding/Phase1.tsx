import { useEffect, useState } from 'react';

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
  return (
    <>
      <section className="h-2/3 content-input flex flex-col items-center justify-center ">
        <Text fontSize={24} fontWeight={600} className="text-center">
          반가워요!
          <br />
          닉네임을 입력하세요
        </Text>
        <input
          className="w-full h-71pxr bg-navy5 rounded-14pxr text-center outline-none mt-45pxr mb-6pxr .placeholder-gray-500::placeholder text-black text-18px font-bold"
          placeholder="10자 이내로 입력하세요"
          value={inputValue}
          onChange={handleChange}
        />
        <p className="text-gray02 text-12pxr">{inputValue.length}/10</p>
      </section>
      <button
        className="fixed left-1/2 bottom-31pxr transform -translate-x-1/2 w-[calc(100%-32px)] h-79pxr bg-navy rounded-50pxr text-white"
        onClick={() => setPhase(2)}
      >
        다음으로
      </button>
    </>
  );
};

export default Phase1;
