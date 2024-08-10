import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Text } from '@/components/common/Text';
import SearchInput from '@/components/home/SearchInput';
import ImageMain from '@/assets/images/image_main.png';
import { IconCamera } from '@/assets/icons';
import '@/styles/styles.css';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getMenus from '@/api/menu/getMenus';
import ImageUserLogo from '@/assets/images/image_userLogo.png';

export default function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

  const notify = () =>
    toast.error('🦄 파싱 오류가 발생했습니다. 다시 시도해주세요!', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Slide,
    });

  const handleCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true); // 파일 선택 시 로딩 시작
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;

        // 이미지 분석 후 GPT 처리 및 페이지 이동
        await analyzeImage(base64Image);
        setIsLoading(false); // 작업 완료 후 로딩 종료
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64Image: string) => {
    try {
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${import.meta.env.VITE_GOOGLE_CLOUD_API_KEY}`,
        {
          requests: [
            {
              image: {
                content: base64Image.split(',')[1], // base64 문자열에서 실제 이미지 데이터만 추출
              },
              features: [
                {
                  type: 'TEXT_DETECTION',
                },
              ],
            },
          ],
        }
      );

      const annotations = response.data.responses[0].textAnnotations;
      const detectedText = annotations
        ? annotations[0].description
        : 'No text detected';

      console.log('Detected text:', detectedText);

      // GPT API를 통해 한글 메뉴만 추출
      await getGptResponse(detectedText, base64Image);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setIsLoading(false); // 오류 발생 시 로딩 종료
      notify(); // 오류 발생 시 알림 표시
    }
  };

  const getGptResponse = async (text: string, image: string) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'user',
              content: `여기서 영어 메뉴를 모두 가져와서 정확히 다음 형식으로 리스트를 반환해줘 오류가 나더라도 일단 인식한 것에 대한 리스트를 무조건 반환해: ["메뉴1", "메뉴2", "메뉴3", ...]\n\n텍스트:\n${text}`,
            },
          ],
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      const gptResponse = response.data.choices[0].message.content.trim();
      console.log('GPT Response:', gptResponse);

      // GPT 응답을 파싱하여 JSON으로 변환 후 배열로 관리
      const menuList = parseMenuList(gptResponse);
      console.log('Parsed Menu List:', menuList);

      // getMenus 호출하여 응답을 받아서 navigate 시 상태로 전달
      await getMenusResponse(menuList, image);
    } catch (error) {
      console.error('Error getting GPT response:', error);
      setIsLoading(false); // 오류 발생 시 로딩 종료
      notify(); // 오류 발생 시 알림 표시
    }
  };

  const getMenusResponse = async (menuList: string[], image: string) => {
    try {
      const response = await getMenus({ menus: menuList });
      console.log('Get Menus Response:', response);

      // 메뉴 정보와 함께 페이지 이동
      navigate('/menu', { state: { photoData: image, menuList: response } });
    } catch (error) {
      console.error('Error getting menus:', error);
      setIsLoading(false); // 오류 발생 시 로딩 종료
      notify(); // 오류 발생 시 알림 표시
    }
  };

  const parseMenuList = (response: string) => {
    try {
      // 텍스트에서 메뉴 리스트가 포함된 배열 부분 추출
      const match = response.match(/\[(.*?)\]/);
      if (!match || !match[0]) {
        throw new Error('No menu list found in response.');
      }

      // 배열 문자열을 JSON 배열로 변환
      const menuListString = match[0];
      const menuList = JSON.parse(menuListString);

      return menuList;
    } catch (error) {
      console.error('Error parsing GPT response:', error);
      notify(); // 파싱 오류 발생 시 알림 표시
      return [];
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/onboarding', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen pt-54pxr flex-col flex items-center justify-between relative">
      {isLoading && (
        <div className="z-50 w-screen h-screen">
          <LoadingIndicator />
        </div>
      )}
      {/* 로딩 중일 때 로딩 인디케이터 표시 */}
      <div className="w-full">
        {/**
         * 검색 영역
         */}
        <div className="w-full px-16pxr flex gap-10pxr items-center">
          <SearchInput />
          <img src={ImageUserLogo} width={50} height={50} alt="" />
        </div>
        {/**
         * 텍스트 영역
         */}
        <div className="flex flex-col items-center mt-60pxr">
          <Text fontSize={21}>Hello, Junction!</Text>
          <Text fontSize={21} fontWeight={600}>
            Eat anything, at anywhere
          </Text>
        </div>
      </div>
      <div className="relative mb-85pxr">
        <img src={ImageMain} className="w-full h-456pxr" alt="Main" />
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCapture}
          className="hidden"
          id="cameraInput"
        />
        <label
          htmlFor="cameraInput"
          className="absolute bottom-13pxr left-1/2 transform -translate-x-1/2 hover:brightness-75 cursor-pointer"
        >
          <IconCamera />
        </label>
        <div
          className="absolute -bottom-35pxr left-1/2"
          style={{ transform: 'translateX(-50%)' }}
        >
          <div className="flex whitespace-nowrap items-center justify-center px-10pxr py-6pxr rounded-30pxr bg-[#FB543C] text-white animate-floating">
            <Text fontSize={12} fontWeight={500} color="default">
              If you touch it, the shoot starts!
            </Text>
            <div
              className="absolute -top-6pxr left-1/2 transform -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderBottom: '6px solid #FB543C',
              }}
            ></div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  );
}
