import apiClient from '..';

/**
 * 메뉴 정보
 *
 * @param {number} id 메뉴 ID
 * @param {string} name 메뉴 이름
 * @param {object} menu 메뉴 세부 정보
 * @param {object[]} ingredientCharacteristics 원재료 특성
 */
interface IngredientCharacteristic {
  id: number;
  type: string; // 예: "ETC"
  content: string;
}

interface MenuDetail {
  id: number;
  name: string;
  menu: {
    id: number;
    name: string;
    content: string;
    recommendedServingSize: number;
    caloriesPer100gServing: number;
    imgUrl: string;
  };
  ingredientCharacteristics: IngredientCharacteristic[];
}

/**
 * 메뉴 영양 정보 가져오기
 *
 * @param {number} menuId 메뉴 ID
 * @returns {Promise<MenuDetail[]>} 메뉴 영양 정보 응답
 */
const getIngredients = async (menuId: number): Promise<MenuDetail[]> => {
  const response = await apiClient.get<MenuDetail[]>(
    `/menu/ingredient/${menuId}`
  );

  return response.data;
};

export default getIngredients;
