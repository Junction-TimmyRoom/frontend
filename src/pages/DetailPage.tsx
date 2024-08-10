import React, { useEffect, useState } from 'react';
import ImageDetail from '@/assets/images/image_detail.png';
import { Text } from '@/components/common/Text';
import Topbar from '@/components/common/Topbar';
import Ingredients from '@/components/detail/Ingredients';
import NutritionFacts from '@/components/detail/NutritionFacts';
import ShareTips from '@/components/detail/ShareTips';
import getNutritionFact from '@/api/detail/getNutritionFact';

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
interface Menu {
  id: number;
  name: string;
  contenet: string;
  recommendedServingSize: number;
  caloriesPer100gServing: number;
}
interface NutritionPageState {
  categoryName: string;
  menu: Menu | null;
  itemId: number | null;
  nutritionData: NutritionData | null;
  recommendedNutritionData: RecommendedNutritionData | null;
  perKcal: number;
  perRecKcal: number;
  warnings: string[];
  nutrientText: string[];
}

// DetailPage 컴포넌트
const DetailPage: React.FC = () => {
  const [state, setState] = useState<NutritionPageState>({
    categoryName: '',
    menu: null,
    itemId: null,
    nutritionData: null,
    recommendedNutritionData: null,
    perKcal: 0,
    perRecKcal: 0,
    warnings: [],
    nutrientText: [],
  });

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split('/');
    const idSegment = segments.pop();
    const id = idSegment ? parseInt(idSegment, 10) : null;
    setState((prevState) => ({ ...prevState, itemId: id }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (state.itemId === null) return;

      const data = await getNutritionFact(state.itemId);

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

      setState((prevState) => ({
        ...prevState,
        categoryName: data.category.name,
        menu: data.menu,
        nutritionData: {
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
        },
        recommendedNutritionData: data.recommendedNutritionFact,
        perKcal: data.menu.caloriesPer100gServing,
        perRecKcal: data.menu.recommendedServingSize,
        warnings: updatedWarnings,
        nutrientText: concatenatedString,
      }));
    };

    fetchData();
  }, [state.itemId]);

  const {
    nutritionData,
    recommendedNutritionData,
    perKcal,
    perRecKcal,
    warnings,
    nutrientText,
  } = state;

  return (
    <>
      <Topbar />
      <div className="w-full bg-[#F6F6F6]">
        <div className="flex flex-col web:flex web:flex-row">
          <img src={ImageDetail} className="w-full" alt="Detail" />
          <div className="radius z-20 -mt-32pxr w-full py-33pxr px-16pxr rounded-36pxr bg-white">
            <div className="flex flex-col">
              <div className="flex gap-8pxr items-center">
                <Text fontSize={24} fontWeight={700} className="leading-normal">
                  {state.menu?.name}
                </Text>
                <div className="flex rounded-30pxr px-10pxr h-fit py-4pxr bg-blue">
                  <Text
                    fontSize={12}
                    color="default"
                    className="leading-[16px]"
                  >
                    Good
                  </Text>
                </div>
              </div>
              <Text fontSize={14} fontWeight={500}>
                {state.categoryName}
              </Text>
            </div>
          </div>
        </div>
        <div className="px-16pxr">
          <div className="mt-34pxr leading-[19.6px]">
            {state.menu?.contenet}
          </div>
          {nutritionData && recommendedNutritionData && (
            <NutritionFacts
              nutritionData={nutritionData}
              recommendedNutritionData={recommendedNutritionData}
              perKcal={perKcal}
              perRecKcal={perRecKcal}
              warnings={warnings}
              nutrientText={nutrientText}
            />
          )}
          <div className="mt-72pxr">
            <Ingredients />
          </div>
          <div className="mt-75pxr">
            <ShareTips />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
