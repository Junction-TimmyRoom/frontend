import { useState } from 'react';
import { Text } from '../common/Text';
import ImageIngredient from '@/assets/images/image_ingredient.png';

export default function () {
  const [selectedMenu, setSelectedMenu] = useState<
    'Good' | 'Careful' | 'Etc' | null
  >(null);

  const handleMenuSelect = (menu: 'Good' | 'Careful' | 'Etc') => {
    setSelectedMenu(menu);
  };
  return (
    <div>
      <Text fontSize={18} fontWeight={700}>
        Ingredient
      </Text>
      {/* 메뉴 선택 영역 */}
      <div className="flex gap-4pxr mt-24pxr">
        <button
          onClick={() => handleMenuSelect('Good')}
          className={`px-16pxr py-10pxr rounded-30pxr ${
            selectedMenu === 'Good'
              ? 'bg-blue text-white'
              : 'bg-white text-blue'
          }`}
        >
          Good
        </button>
        <button
          onClick={() => handleMenuSelect('Careful')}
          className={`px-16pxr py-10pxr rounded-30pxr ${
            selectedMenu === 'Careful'
              ? 'bg-orange text-white'
              : 'bg-white text-orange'
          }`}
        >
          Careful
        </button>
        <button
          onClick={() => handleMenuSelect('Etc')}
          className={`px-16pxr py-10pxr rounded-30pxr ${
            selectedMenu === 'Etc'
              ? 'bg-black text-white'
              : 'bg-white text-black'
          }`}
        >
          Etc
        </button>
      </div>
      <div className="mt-20pxr overflow-x-scroll flex gap-12pxr">
        <img src={ImageIngredient} alt="" />
        <img src={ImageIngredient} alt="" />
        <img src={ImageIngredient} alt="" />
        <img src={ImageIngredient} alt="" />
        <img src={ImageIngredient} alt="" />
        <img src={ImageIngredient} alt="" />
        <img src={ImageIngredient} alt="" />
      </div>
    </div>
  );
}
