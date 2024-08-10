import apiClient from '..';

interface RequestProps {
  content: string;
  menuId: number;
}

interface ResponseProps {
  id: number;
  content: string;
  createdAt: string;
  user: { nickname: string; pregnancyWeeks: number };
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

interface Data {
  reviewSummaries: string[];
  reviews: Review[];
}

export const PostReview = async (
  requestParameters: RequestProps
): Promise<ResponseProps> => {
  try {
    const response = await apiClient.post<ResponseProps>(
      '/review',
      requestParameters
    );
    return Promise.resolve(response.data);
  } catch (error) {
    console.error('리뷰 등록 실패', error);
    return Promise.reject(error);
  }
};

export const GetReview = async (menuId: number): Promise<Data> => {
  try {
    const response = await apiClient.get<Data>(`/menu/review/${menuId}`);
    return Promise.resolve(response.data);
  } catch (error) {
    console.error('리뷰 조회 실패', error);
    return Promise.reject(error);
  }
};
