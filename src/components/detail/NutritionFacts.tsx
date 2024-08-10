import { Text } from '@/components/common/Text';
import { IconWarn, IconArrowBottom, IconArrowTop } from '@/assets/icons';
import { useState } from 'react';

const NutritionFacts = () => {
  const [isMoreView, setIsMoreView] = useState(false);

  const handleMoreNutrition = () => {
    setIsMoreView((prev) => !prev);
  };
  return (
    <div>
      <div className="mt-62pxr">
        <Text fontSize={18} fontWeight={700}>
          Nutrition Facts
        </Text>
      </div>
      <div className="mt-24pxr">
        <div className="bg-yellow flex flex-col h-97pxr w-full gap-4pxr rounded-30pxr items-center justify-center">
          <div className="flex w-full gap-6pxr items-center justify-center">
            <IconWarn width={18} height={18} />
            <Text fontWeight={600} className="leading-[16px]">
              Be careful of sugars, cholesterol
            </Text>
          </div>
          <Text fontSize={12} className="text-center leadig-[16px]">
            167 kcal per | 210g recommended intake per 100g
          </Text>
        </div>
      </div>
      <div>
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isMoreView ? 'max-h-500pxr' : 'max-h-0'
          }`}
        >
          <div className="p-4">
            <div>dsfafds</div>
            <div>dsfafds</div>
            <div>dsfafds</div>
            <div>dsfafds</div>
            <div>dsfafds</div>
          </div>
        </div>
        <div className="h-8pxr" />
        <button
          onClick={handleMoreNutrition}
          className="bg-default text-[#262626] rounded-30pxr px-12pxr py-10pxr w-full transition-all duration-500 ease-in-out"
        >
          {isMoreView ? (
            <div className="flex gap-8pxr items-center justify-center">
              <Text fontSize={14} fontWeight={500} className="text-[#262626]">
                Hide
              </Text>
              <IconArrowTop />
            </div>
          ) : (
            <div className="flex gap-8pxr items-center justify-center">
              <Text fontSize={14} fontWeight={500} className="text-[#262626]">
                Show All
              </Text>
              <IconArrowBottom />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default NutritionFacts;
