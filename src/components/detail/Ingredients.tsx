import { useState } from 'react';
import { Text } from '../common/Text';
import { MenuDetail } from '@/api/detail/getIngredient';

interface ShowIngredientProps {
  ingredients: MenuDetail[];
}

export default function ShowIngredient({ ingredients }: ShowIngredientProps) {
  const [selectedMenu, setSelectedMenu] = useState<'Good' | 'Careful' | 'Etc'>(
    'Good'
  );

  const handleMenuSelect = (menu: 'Good' | 'Careful' | 'Etc') => {
    setSelectedMenu(menu);
  };

  // 필터링된 식자재를 선택된 메뉴에 따라 표시
  const filteredIngredients = ingredients.flatMap(
    (detail) =>
      detail.ingredientCharacteristics
        .filter((char) => char.type === selectedMenu.toUpperCase())
        .map(() => detail.menu.imgUrl) // 각 식자재의 메뉴에서 imgUrl을 가져옴
  );

  // 각 메뉴 버튼 옆에 표시할 개수 계산
  const goodCount = ingredients.flatMap((detail) =>
    detail.ingredientCharacteristics.filter((char) => char.type === 'GOOD')
  ).length;

  const carefulCount = ingredients.flatMap((detail) =>
    detail.ingredientCharacteristics.filter((char) => char.type === 'CAREFUL')
  ).length;

  const etcCount = ingredients.flatMap((detail) =>
    detail.ingredientCharacteristics.filter((char) => char.type === 'ETC')
  ).length;

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
          Good ({goodCount})
        </button>
        <button
          onClick={() => handleMenuSelect('Careful')}
          className={`px-16pxr py-10pxr rounded-30pxr ${
            selectedMenu === 'Careful'
              ? 'bg-orange text-white'
              : 'bg-white text-orange'
          }`}
        >
          Careful ({carefulCount})
        </button>
        <button
          onClick={() => handleMenuSelect('Etc')}
          className={`px-16pxr py-10pxr rounded-30pxr ${
            selectedMenu === 'Etc'
              ? 'bg-black text-white'
              : 'bg-white text-black'
          }`}
        >
          Etc ({etcCount})
        </button>
      </div>
      <div className="mt-20pxr overflow-x-scroll flex gap-12pxr">
        {filteredIngredients.length > 0 ? (
          filteredIngredients.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Ingredient ${index}`}
              className="w-24 h-24 object-cover rounded"
            />
          ))
        ) : (
          <p>해당하는 식자재가 없습니다</p>
        )}
      </div>
    </div>
  );
}
