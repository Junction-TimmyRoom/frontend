import { IconSearch } from '@/assets/icons';
import { useState } from 'react';

export default function SearchInput() {
  const [searchValue, setSearchValue] = useState('');

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      console.log('검색');
    }
  };

  return (
    <div className="bg-white flex h-62pxr relative rounded-33pxr shadow-[0px_0px_20px_0px_rgba(28,39,76,0.1)] py-24pxr px-21pxr w-full">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="키워드로도 검색해봐요"
        className="w-full outline-none placeholder:text-[rgba(0,0,0,0.50)] placeholder:text-sm placeholder:font-normal placeholder:leading-normal"
      />
      <div className="absolute top-1/2 transform -translate-y-1/2 right-20pxr">
        <IconSearch />
      </div>
    </div>
  );
}
