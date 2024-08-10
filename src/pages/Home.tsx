import { Text } from '@/components/common/Text';
import SearchInput from '@/components/home/SearchInput';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageMain from '@/assets/images/image_main.png';
import { IconCamera } from '@/assets/icons';
import '@/styles/styles.css';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/onboarding', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen pt-54pxr flex-col flex items-center justify-between">
      <div className="w-full">
        {/**
         * 검색 영역
         */}
        <div className="w-full flex gap-10pxr items-center">
          <SearchInput />
          <div className="min-w-50pxr min-h-50pxr bg-black rounded-full"></div>
        </div>
        {/**
         * 텍스트 영역
         */}
        <div className="flex flex-col items-center mt-60pxr">
          <Text fontSize={21}>김정션님,</Text>
          <Text fontSize={21} fontWeight={600}>
            어디서든 걱정없이 먹어요!
          </Text>
        </div>
      </div>
      <div className="relative mb-100pxr">
        <img src={ImageMain} className="w-344pxr h-304pxr" alt="Main" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 hover:brightness-75">
          <IconCamera />
        </div>
        <div
          className="absolute -bottom-50pxr left-1/2"
          style={{ transform: 'translateX(-50%)' }}
        >
          <div className="flex items-center justify-center px-10pxr py-6pxr rounded-30pxr bg-[#FB543C] text-white animate-floating">
            <Text fontSize={12} fontWeight={500} color="default">
              터치하면 촬영시작!
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
    </div>
  );
}
