import apiClient from '..';

// 요청 파라미터 타입 정의
interface GetMenusRequest {
  menus: string[];
}

// 메뉴 정보 타입 정의
interface MenuInfo {
  id: number;
  name: string;
  content: string; // 오타 수정: 실제로는 "content"일 가능성이 높습니다.
  recommendedServingSize: number;
  caloriesPer100gServing: number;
  imgUrl: string;
}

// 응답 타입 정의
interface GetMenusResponse {
  menu: MenuInfo;
  countOfGood: number;
  countOfCareful: number;
  countOfEtc: number;
}

/**
 * 메뉴 체크 API 호출
 *
 * @param {GetMenusRequest} requestParameters 요청 파라미터
 * @returns {Promise<GetMenusResponse[]>} 메뉴 정보 배열
 */
const getMenus = async (
  requestParameters: GetMenusRequest
): Promise<GetMenusResponse[]> => {
  const response = await apiClient.post<GetMenusResponse[]>(
    '/menu/check',
    requestParameters
  );

  return response.data;
};

export default getMenus;
