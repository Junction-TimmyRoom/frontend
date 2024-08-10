import { IconFire } from '@/assets/icons';
import { Text } from '../common/Text';

export default function ShareTips() {
  return (
    <div>
      <Text fontSize={18} fontWeight={700}>
        Share Tips
      </Text>
      <div className="h-24pxr" />
      <div className="bg-navy flex h-60pxr w-full rounded-30pxr items-center px-16pxr">
        <div className="flex w-full gap-6pxr items-center">
          <IconFire width={24} height={24} />
          <Text
            fontSize={14}
            fontWeight={600}
            color="default"
            className="leading-[16px]"
          >
            Easy to be rotten
          </Text>
        </div>
      </div>
      <div className="h-10pxr" />
      <div className="bg-navy flex h-60pxr w-full rounded-30pxr items-center px-16pxr">
        <div className="flex w-full gap-6pxr items-center">
          <IconFire width={24} height={24} />
          <Text
            fontSize={14}
            fontWeight={600}
            color="default"
            className="leading-[16px]"
          >
            Body is swollen with high-salt side dishes.
          </Text>
        </div>
      </div>
      <div className="h-25pxr" />
    </div>
  );
}
