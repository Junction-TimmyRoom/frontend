import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { IconSearch } from '@/assets/icons';
import axios from 'axios';

import { GetSearchMenu } from '@/api/menu/getSearchMenu';

export default function SearchInput() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (menuName: string) => {
    try {
      const response = await GetSearchMenu(menuName);
      navigate(`/detail/${response.menuId}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMessage('영양 정보가 등록되지 않았어요.');
      } else {
        setErrorMessage('검색 중 오류가 발생했습니다.');
      }
    }
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleSearch(searchValue);
    }
  };

  return (
    <div className="bg-white flex h-62pxr relative rounded-33pxr shadow-[0px_0px_20px_0px_rgba(28,39,76,0.1)] py-24pxr px-21pxr w-full">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search with keywords"
        className="w-full outline-none placeholder:text-[rgba(0,0,0,0.50)] placeholder:text-sm placeholder:font-normal placeholder:leading-normal"
      />
      <div className="absolute top-1/2 transform -translate-y-1/2 right-20pxr">
        <IconSearch onClick={() => handleSearch(searchValue)} />
      </div>
      {errorMessage !== '' && (
        <div className="absolute text-red-500 text-sm mt-48pxr">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
