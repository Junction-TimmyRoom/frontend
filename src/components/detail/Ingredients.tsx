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
  const filteredIngredients = ingredients.flatMap((detail) =>
    detail.ingredientCharacteristics
      .filter((char) => char.type === selectedMenu.toUpperCase())
      .map(() => ({
        imgUrl: detail.menu.imgUrl,
        menuName: detail.menu.name,
        name: detail.name,
        content:
          detail.ingredientCharacteristics.find(
            (char) => char.type === selectedMenu.toUpperCase()
          )?.content || '',
        type: selectedMenu.toUpperCase(), // 선택된 메뉴의 타입
      }))
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
      <div className="mt-20pxr flex gap-12pxr overflow-x-scroll">
        {filteredIngredients.length > 0 ? (
          filteredIngredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center rounded-20pxr px-14pxr py-18pxr min-w-150pxr max-w-150pxr bg-white shadow-md"
            >
              <div>
                <div className="flex justify-between">
                  <Text
                    fontSize={16}
                    fontWeight={600}
                    className="whitespace-nowrap"
                  >
                    {ingredient.name}
                  </Text>
                  {ingredient.type === 'GOOD' ? (
                    <div className="bg-blueText px-6pxr py-2pxr rounded-30pxr">
                      <Text fontSize={12} color="blue" fontWeight={600}>
                        {ingredient.type}
                      </Text>
                    </div>
                  ) : ingredient.type === 'CAREFUL' ? (
                    <div className="bg-orangeText px-6pxr py-2pxr rounded-30pxr">
                      <Text fontSize={12} color="orange" fontWeight={600}>
                        {ingredient.type}
                      </Text>
                    </div>
                  ) : (
                    <div className="bg-gray10 px-6pxr py-2pxr flex items-center justify-center rounded-30pxr">
                      <Text fontSize={12} color="black" fontWeight={600}>
                        {ingredient.type}
                      </Text>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 text-ellipsis line-clamp-3">
                  {ingredient.content}
                </p>
              </div>
              <img
                src={ingredient.imgUrl}
                alt={ingredient.menuName}
                className="w-92pxr h-92pxr object-cover"
              />
            </div>
          ))
        ) : (
          <div className="w-full h-192pxr flex items-center justify-center">
            <p>해당하는 식자재가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
