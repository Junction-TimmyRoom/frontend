import apiClient from '..';
/**
 * 메뉴 영양 정보 응답 파라미터
 *
 * @param {object} category 카테고리 정보
 * @param {object} menu 메뉴 정보
 * @param {object} nutritionalFact 영양 성분
 * @param {object} recommendedNutritionFact 추천 영양 성분
 */
interface GetNutritionFactResponse {
  category: {
    id: number;
    name: string;
  };
  menu: {
    id: number;
    name: string;
    content: string;
    recommendedServingSize: number;
    caloriesPer100gServing: number;
  };
  nutritionalFact: {
    id: number;
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
  };
  recommendedNutritionFact: {
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
  };
}

/**
 * 메뉴 영양 정보 가져오기
 *
 * @param {number} menuId 메뉴 ID
 * @returns {Promise<GetNutritionFactResponse>} 메뉴 영양 정보 응답
 */
const getNutritionFact = async (
  menuId: number
): Promise<GetNutritionFactResponse> => {
  const response = await apiClient.get<GetNutritionFactResponse>(
    `/menu/nutritionFact/${menuId}`
  );

  return response.data;
};

export default getNutritionFact;
