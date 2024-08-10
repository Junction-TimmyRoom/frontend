import { useState, useEffect } from 'react';
import { Text } from '@/components/common/Text';
import { IconWarn, IconArrowBottom, IconArrowTop } from '@/assets/icons';
import { getData } from '@/util/apiTest';

// Nutrition Data 타입 정의
interface NutritionData {
  carbohydrates: {
    value: number;
    sugars: number;
  };
  protein: number;
  fat: {
    value: number;
    saturatedFat: number;
    transFat: number;
  };
  cholesterol: number;
}

// Recommended Nutrition Data 타입 정의
interface RecommendedNutritionData {
  carbohydrates: number;
  sugars: number;
  protein: number;
  fat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  fiber: number;
  folicAcid: number;
  iron: number;
  calcium: number;
  omega3FattyAcid: number;
  vitaminB6: number;
  vitaminB12: number;
  vitaminC: number;
  vitaminD: number;
  magnesium: number;
}

// Nutrition Facts 컴포넌트
const NutritionFacts: React.FC = () => {
  const initialNutritionData: NutritionData = {
    carbohydrates: {
      value: 0,
      sugars: 0,
    },
    protein: 0,
    fat: {
      value: 0,
      saturatedFat: 0,
      transFat: 0,
    },
    cholesterol: 0,
  };

  const initialRecommendedNutritionData: RecommendedNutritionData = {
    carbohydrates: 0,
    sugars: 0,
    protein: 0,
    fat: 0,
    saturatedFat: 0,
    transFat: 0,
    cholesterol: 0,
    fiber: 0,
    folicAcid: 0,
    iron: 0,
    calcium: 0,
    omega3FattyAcid: 0,
    vitaminB6: 0,
    vitaminB12: 0,
    vitaminC: 0,
    vitaminD: 0,
    magnesium: 0,
  };

  const [nutritionData, setNutritionData] =
    useState<NutritionData>(initialNutritionData);
  const [recommendedNutritionData, setRecommendedNutritionData] =
    useState<RecommendedNutritionData>(initialRecommendedNutritionData);
  const [isMoreView, setIsMoreView] = useState(false);
  const [perKcal, setPerKcal] = useState(0);
  const [perRecKcal, setPerRecKcal] = useState(0);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [nutrientText, setNutrientText] = useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setPerKcal(data.menu.caloriesPer100gServing);
      setPerRecKcal(data.menu.recommendedServingSize);
      setNutritionData({
        carbohydrates: {
          value: data.nutritionalFact.carbohydrates,
          sugars: data.nutritionalFact.sugars,
        },
        protein: data.nutritionalFact.protein,
        fat: {
          value: data.nutritionalFact.fat,
          saturatedFat: data.nutritionalFact.saturatedFat,
          transFat: data.nutritionalFact.transFat,
        },
        cholesterol: data.nutritionalFact.cholesterol,
      });

      const updatedWarnings: string[] = [];
      for (const [key, value] of Object.entries(data.nutritionalFact)) {
        if (key === 'fiber') break;
        const recommendedValue =
          data.recommendedNutritionFact[key as keyof RecommendedNutritionData];

        if (value > recommendedValue) {
          updatedWarnings.push(key.charAt(0).toUpperCase() + key.slice(1));
        }
      }
      const concatenatedString: string[] = [];
      let startCollecting = false;

      for (const [key, value] of Object.entries(data.nutritionalFact)) {
        if (key === 'fiber') {
          startCollecting = true;
        }

        if (startCollecting) {
          concatenatedString.push(`${key} ${value}mg`);
        }
      }

      const resultString = concatenatedString.join(', ');
      setNutrientText(resultString);
      setRecommendedNutritionData(data.recommendedNutritionFact);
      setWarnings(updatedWarnings);
    };

    fetchData();
  }, []);

  const handleMoreNutrition = () => {
    setIsMoreView((prev) => !prev);
  };

  const renderNutritionFacts = (
    data: Partial<NutritionData>
  ): JSX.Element[] => {
    const elements: JSX.Element[] = [];

    for (const [key, value] of Object.entries(data)) {
      let unit = 'g';
      let showWarning = false;

      if (key === 'cholesterol') {
        unit = 'ml';
      }

      if (typeof value === 'object' && value !== null) {
        if ('value' in value) {
          const recommendedValue =
            recommendedNutritionData[key as keyof RecommendedNutritionData];
          if (value.value > recommendedValue) {
            showWarning = true;
          }

          elements.push(
            <>
              <hr className="" />
              <div
                key={key}
                className="w-full flex flex-col items-end gap-10pxr mt-27pxr mb-21pxr"
              >
                <div className="w-full flex justify-between">
                  <Text fontSize={16} fontWeight={400}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Text>
                  <Text>
                    {value.value} {unit}
                  </Text>
                </div>
                {showWarning && (
                  <Text
                    fontSize={11}
                    className="leading-[16px] px-10pxr py-6pxr bg-grayRGBA rounded-30pxr"
                  >
                    Exceeded recommended amount
                  </Text>
                )}
              </div>
            </>
          );
        }
        for (const [subKey, subValue] of Object.entries(value)) {
          let subKeyShowWarning = false;
          if (subKey !== 'value') {
            const recommendedValue =
              recommendedNutritionData[
                subKey as keyof RecommendedNutritionData
              ];
            if (subValue > recommendedValue) {
              subKeyShowWarning = true;
            }
            elements.push(
              <div
                key={`${key}-${subKey}`}
                className="flex flex-col gap-10pxr w-full mb-21pxr items-end"
              >
                <div className="w-full flex justify-between">
                  <Text fontSize={16} fontWeight={400} color="gray50">
                    {subKey.charAt(0).toUpperCase() + subKey.slice(1)}
                  </Text>
                  <Text>
                    {subValue} {unit}
                  </Text>
                </div>
                {subKeyShowWarning && (
                  <Text
                    fontSize={11}
                    className="leading-[16px] px-10pxr py-6pxr bg-grayRGBA rounded-30pxr"
                  >
                    Exceeded recommended amount
                  </Text>
                )}
              </div>
            );
          }
        }
      } else {
        const recommendedValue =
          recommendedNutritionData[key as keyof RecommendedNutritionData];
        if (value > recommendedValue) {
          showWarning = true;
        }

        elements.push(
          <>
            <hr className="" />
            <div
              key={key}
              className="w-full flex flex-col items-end gap-10pxr mt-27pxr mb-21pxr"
            >
              <div className="w-full flex justify-between">
                <Text fontSize={16} fontWeight={400}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
                <Text>
                  {value} {unit}
                </Text>
              </div>
              {showWarning && (
                <Text
                  fontSize={11}
                  className="leading-[16px] px-10pxr py-6pxr bg-grayRGBA rounded-30pxr"
                >
                  Exceeded recommended amount
                </Text>
              )}
            </div>
          </>
        );
      }
    }

    return elements;
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
            <Text
              fontWeight={600}
              className="leading-[16px] text-ellipsis line-clamp-2 w-229pxr"
            >
              Be careful of {warnings.length > 0 ? warnings.join(', ') : 'none'}
            </Text>
          </div>
          <Text
            fontSize={12}
            color="gray50"
            className="text-center leading-[16px]"
          >
            {perKcal}kcal per | {perRecKcal}g recommended intake per 100g
          </Text>
        </div>
      </div>
      <div>
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${isMoreView ? 'max-h-500pxr mb-36pxr' : 'max-h-0'}`}
        >
          <div className="pt-36pxr px-5pxr w-full">
            <div className="w-full flex justify-between">
              <Text className="leading-[16px]">Nutrients for pregnants</Text>
              <Text fontSize={18} fontWeight={600} className="leading-[16px]">
                3 Contained
              </Text>
            </div>
            <div className="h-10pxr" />
            <Text fontSize={12} color="gray50" className="leading-[16px]">
              {nutrientText}
            </Text>
            <div className="mb-20pxr" />
            <div>{renderNutritionFacts(nutritionData)}</div>
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
