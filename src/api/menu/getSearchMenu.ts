import apiClient from '..';

interface MenuId {
  menuId: number;
}

export const GetSearchMenu = async (menuName: string): Promise<MenuId> => {
  try {
    const response = await apiClient.get<MenuId>(`/menu/${menuName}`);
    return Promise.resolve(response.data);
  } catch (error) {
    console.error('메뉴 검색 실패', error);
    return Promise.reject(error);
  }
};
