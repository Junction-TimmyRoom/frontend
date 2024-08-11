import { useLocation } from 'react-router-dom';
import Topbar from '@/components/common/Topbar';
import MenuBox from '@/components/MenuBox';
import { Text } from '@/components/common/Text';

interface MenuItem {
  menu: {
    id: number;
    name: string;
    content: string;
    recommendedServingSize: number;
    caloriesPer100gServing: number;
    imgUrl: string;
  };
  countOfGood: number;
  countOfCareful: number;
  countOfEtc: number;
}

const MenuPage = () => {
  const location = useLocation();
  const { photoData, menuList } = location.state || {
    photoData: null,
    menuList: [],
  };

  return (
    <div className="px-16pxr">
      <Topbar title={'메뉴 인식 결과'} />
      <div className="img-container pt-80pxr pb-44pxr flex items-center justify-center">
        {photoData ? (
          <img
            className="rounded-20pxr bg-gray01 w-294pxr"
            src={photoData}
            alt="Captured"
          />
        ) : (
          <p>No photo data available</p>
        )}
      </div>
      <div className="menu-container mb-40pxr">
        <div className="flex gap-8pxr items-center">
          <Text fontSize={21} fontWeight={700} className="leading-16pxr">
            Menu
          </Text>

          <div className="flex items-center w-45pxr h-45pxr justify-center p-10pxr bg-gray10 rounded-full">
            <Text fontSize={21} fontWeight={700} className="leading-16pxr">
              {menuList.length}
            </Text>
          </div>
        </div>
        <div className="menu-container flex flex-col gap-8pxr my-21pxr">
          {menuList.map((item: MenuItem, index: number) => (
            <MenuBox
              key={index}
              item={{
                id: item.menu.id,
                imageUrl: item.menu.imgUrl,
                name: item.menu.name,
                countOfGood: item.countOfGood,
                countOfCareful: item.countOfCareful,
                countOfEtc: item.countOfEtc,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
