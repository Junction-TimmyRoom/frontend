import { useNavigate } from 'react-router-dom';

interface MenuItemProps {
  item: {
    id: number;
    name: string;
  };
}

const MenuBox = ({ item }: MenuItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-77pxr flex items-center justify-between bg-gray02 rounded-20pxr px-18pxr py-12.5pxr cursor-pointer"
      onClick={() => {
        navigate(`/detail/${item.id}`);
      }}
    >
      <div className="flex items-center gap-13pxr">
        <img
          className="rounded-full w-52pxr"
          src="data:image/jpeg;base64,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"
          alt=""
        />
        <p className="text-15pxr leading-16pxr">{item.name}</p>
      </div>
      <div className="flex gap-5pxr">
        <div className="rounded-30pxr px-10pxr py-4pxr bg-gray01">
          권장 {'4'}
        </div>
        <div className="rounded-30pxr px-10pxr py-4pxr bg-gray01">
          주의 {'4'}
        </div>
      </div>
    </div>
  );
};

export default MenuBox;
