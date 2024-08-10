import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Topbar from '@/components/common/Topbar';
import MenuBox from '@/components/MenuBox';

interface MenuItem {
  id: number;
  name: string;
}

const MenuPage = () => {
  const location = useLocation();

  const photoData = location.state || {};

  //mock data
  const menuItems: MenuItem[] = [
    { id: 1, name: 'Menu Item 1' },
    { id: 2, name: 'Menu Item 2' },
    { id: 3, name: 'Menu Item 3' },
    { id: 4, name: 'Menu Item 4' },
  ];

  return (
    <div>
      <Topbar title={'메뉴 인식'} />
      <div className="img-container pt-80pxr pb-44pxr">
        {photoData ? (
          <img
            className="rounded-20pxr bg-gray01"
            src={photoData}
            alt="Captured"
          />
        ) : (
          <p>No photo data available</p>
        )}
      </div>
      <div className="menu-container">
        <p className="text-18pxr mb-20pxr font-normal font-semibold leading-16pxr">
          {'0'}개의 메뉴가 있네요
        </p>
        <div className="menu-container flex flex-col gap-8pxr">
          {menuItems.map((item) => (
            <MenuBox key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
