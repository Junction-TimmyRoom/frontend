import { useNavigate } from 'react-router-dom';

import { IconBack } from '@/assets/icons';
import { Text } from './Text';

const Topbar = ({ title = '' }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${title !== '' ? 'bg-white' : 'bg-transparent'} fixed top-0 left-0 flex items-center w-screen h-48pxr p-16pxr`}
    >
      <IconBack onClick={() => navigate(-1)} />
      <p className="absolute left-1/2 transform -translate-x-1/2">
        <Text fontWeight={600}>{title}</Text>
      </p>
    </div>
  );
};

export default Topbar;
