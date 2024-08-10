import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from '@/components/common/Text';
import login from '@/api/user/login';

const Phase2 = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname');
    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

  const calculateWeeks = (inputDate: string): number => {
    const startDate = new Date(inputDate);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    return weeks;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputValue !== '') {
      const weeks = calculateWeeks(inputValue);
      const response = await login({
        nickname: nickname,
        pregnancyWeeks: weeks,
      });

      localStorage.setItem('accessToken', response.accessToken);
      navigate('/');
    }
  };
  return (
    <>
      <section className="h-2/3 content-input flex flex-col items-center justify-center ">
        <Text fontSize={24} fontWeight={600} className="text-center">
          Please enter
          <br />
          your pregnancy date
        </Text>
        <input
          className="w-full h-71pxr px-16pxr bg-navy5 rounded-14pxr text-center outline-none mt-45pxr mb-6pxr .placeholder-gray-500::placeholder text-black text-18px font-bold"
          placeholder="Please enter YYYY.MM.DD"
          type="date"
          lang="en"
          value={inputValue}
          onChange={handleChange}
        />
      </section>
      <button
        className="fixed left-1/2 bottom-31pxr transform -translate-x-1/2 w-[calc(100%-32px)] h-79pxr bg-navy rounded-50pxr text-white"
        onClick={handleSubmit}
        disabled={inputValue === ''}
      >
        complete
      </button>
    </>
  );
};

export default Phase2;
