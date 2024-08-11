import React, { useEffect, useState } from 'react';
import ImageDetail from '@/assets/images/image_detail.png';
import { Text } from '@/components/common/Text';
import Ingredients from '@/components/detail/Ingredients';
import NutritionFacts from '@/components/detail/NutritionFacts';
import ShareTips from '@/components/detail/ShareTips';
import getNutritionFact from '@/api/detail/getNutritionFact';
import { GetReview } from '@/api/user/review';
import { IconArrowLeftWhite } from '@/assets/icons';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import getIngredients, { MenuDetail } from '@/api/detail/getIngredient';
import ShowBadge from '@/components/detail/ShowBadge';

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
  content: string;
  imgUrl?: string;
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
interface Review {
  id: number;
  content: string;
  createdAt: string;
  user: {
    nickname: string;
    pregnancyWeeks: number;
  };
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
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Review[]>([]);
  const [recommendComments, setRecommendCommnets] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<MenuDetail[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);
  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split('/');
    const idSegment = segments.pop();
    const id = idSegment ? parseInt(idSegment, 10) : null;
    setState((prevState) => ({ ...prevState, itemId: id }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(false);
      if (state.itemId === null) {
        setIsLoading(true);
        return;
      }

      /**
       * 댓글 가져오기
       */
      const commentResponse = await GetReview(state.itemId);
      setComments(commentResponse.reviews);
      setRecommendCommnets(commentResponse.reviewSummaries);
      /**
       * 성분 가져오기
       */
      const ingredientResponse = await getIngredients(state.itemId);
      setIngredients(ingredientResponse);
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
      setIsLoading(true);
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

  const navigate = useNavigate();
  return (
    <>
      {!isLoading && <LoadingIndicator />}
      <div
        className={`${scrollPosition < 100 ? 'bg-transparent' : 'bg-navy'} fixed top-0 left-0 flex items-center duration-500 w-screen h-48pxr p-16pxr z-50 transition-all ease-in-out`}
      >
        <IconArrowLeftWhite onClick={() => navigate(-1)} />
        <p className="absolute left-1/2 transform -translate-x-1/2"></p>
      </div>
      <div
        className={`w-full h-screen bg-navy8 ${isLoading ? '' : 'overflow-hidden'}`}
      >
        <div className="flex flex-col web:flex web:flex-row bg-navy8">
          <img src={state.menu?.imgUrl} className="w-full" alt="Detail" />
          <div className="radius z-20 -mt-32pxr w-full py-33pxr px-16pxr rounded-36pxr bg-white">
            <div className="flex flex-col">
              <div className="flex gap-8pxr items-center">
                <Text fontSize={24} fontWeight={700} className="leading-normal">
                  {state.menu?.name}
                </Text>
                <ShowBadge ingredients={ingredients} />
              </div>
              <Text fontSize={14} fontWeight={500}>
                {state.categoryName}
              </Text>
            </div>
          </div>
        </div>
        <div className="px-16pxr bg-navy8">
          <div className="mt-34pxr text-14pxr leading-[19.6px]">
            {state.menu?.content}
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
            <Ingredients ingredients={ingredients} />
          </div>
          <div className="mt-75pxr">
            <ShareTips
              comments={comments}
              menuId={state.itemId!}
              recommendComment={recommendComments}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
