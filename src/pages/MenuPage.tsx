import { useLocation } from 'react-router-dom';
import Topbar from '@/components/common/Topbar';
import MenuBox from '@/components/MenuBox';
import { Text } from '@/components/common/Text';

const MenuPage = () => {
  const location = useLocation();
  const { photoData, menuList } = location.state || {};

  return (
    <div className="px-16pxr">
      <Topbar title={'메뉴 인식 결과'} />
      <div className="img-container pt-80pxr pb-44pxr flex items-center justify-center">
        {photoData ? (
          <img
            className="rounded-20pxr bg-gray01 w-294pxr h-294pxr"
            src={photoData}
            alt="Captured"
          />
        ) : (
          <p>No photo data available</p>
        )}
      </div>
      <div className="menu-container">
        <div className="flex gap-8pxr items-center">
          <Text fontSize={21} fontWeight={700} className="leading-16pxr">
            Menu
          </Text>

          <div className="flex items-center w-45pxr h-45pxr justify-center p-10pxr bg-gray10 rounded-full">
            <Text fontSize={21} fontWeight={700} className="leading-16pxr">
              {menuList?.length}
            </Text>
          </div>
        </div>
        <div className="menu-container flex flex-col gap-8pxr mt-21pxr">
          {menuList?.map((item: string, index: number) => (
            <MenuBox key={index} item={{ id: index, name: item }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
