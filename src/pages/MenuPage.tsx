import { useLocation } from 'react-router-dom';
import Topbar from '@/components/common/Topbar';
import MenuBox from '@/components/MenuBox';

const MenuPage = () => {
  const location = useLocation();
  const { photoData, menuList } = location.state || {};

  return (
    <div>
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
        <p className="text-18pxr mb-20pxr font-normal font-semibold leading-16pxr">
          {menuList?.length || 0}개의 메뉴가 있네요
        </p>
        <div className="menu-container flex flex-col gap-8pxr">
          {menuList?.map((item: string, index: number) => (
            <MenuBox key={index} item={{ id: index, name: item }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
