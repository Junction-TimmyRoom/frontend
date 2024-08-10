import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from '@/components/common/Text';

const Phase2 = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const datePattern = /^\d{0,4}\.?(\d{0,2})?\.?(\d{0,2})?$/;

    if (datePattern.test(value)) {
      setInputValue(value);
    }
  };
  return (
    <>
      <section className="h-2/3 content-input flex flex-col items-center justify-center ">
        <Text fontSize={24} fontWeight={600} className="text-center">
          임신 날짜를
          <br />
          입력하세요
        </Text>
        <input
          className="w-full h-71pxr bg-navy5 rounded-14pxr text-center outline-none mt-45pxr mb-6pxr .placeholder-gray-500::placeholder text-black text-18px font-bold"
          placeholder="YYYY.MM.DD를 입력하세요"
          value={inputValue}
          onChange={handleChange}
        />
      </section>
      <button
        className="fixed left-1/2 bottom-31pxr transform -translate-x-1/2 w-[calc(100%-32px)] h-79pxr bg-navy rounded-50pxr text-white"
        onClick={() => navigate('/')}
      >
        끝내기
      </button>
    </>
  );
};

export default Phase2;
