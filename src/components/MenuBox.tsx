import { useNavigate } from 'react-router-dom';
import { Text } from './common/Text';
import { IconArrowRightGray } from '@/assets/icons';

interface MenuItemProps {
  item: {
    id: number;
    name: string;
    imageUrl: string;
    countOfGood: number;
    countOfCareful: number;
    countOfEtc: number;
  };
}

const MenuBox = ({ item }: MenuItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full flex items-center justify-between cursor-pointer"
      onClick={() => {
        navigate(`/detail/${item.id}`);
      }}
    >
      <div className="flex items-center gap-12pxr">
        <img className="rounded-full w-52pxr" src={item.imageUrl} alt="" />
        <Text fontWeight={700} className="leading-16pxr">
          {item.name}
        </Text>
      </div>
      <div className="flex gap-4pxr items-center">
        <div className="flex gap-3pxr rounded-30pxr px-10pxr py-4pxr bg-blue">
          <Text fontSize={12} color="default">
            Good
          </Text>{' '}
          <Text fontSize={12} color="default" fontWeight={700}>
            {item.countOfGood}
          </Text>
        </div>
        <div className="flex gap-3pxr rounded-30pxr px-10pxr py-4pxr bg-orange">
          <Text fontSize={12} color="default">
            Careful
          </Text>{' '}
          <Text fontSize={12} color="default" fontWeight={700}>
            {item.countOfCareful}
          </Text>
        </div>
        <div className="ml-8pxr">
          <IconArrowRightGray />
        </div>
      </div>
    </div>
  );
};

export default MenuBox;
