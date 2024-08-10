import { MenuDetail } from '@/api/detail/getIngredient';
import { Text } from '../common/Text';

// 배지 타입을 명시하는 타입 정의
type BadgeType = 'CAREFUL' | 'GOOD' | 'ETC';

export default function ShowBadge({
  ingredients,
}: {
  ingredients: MenuDetail[];
}) {
  // 원재료 특성을 수집하기 위한 배열
  const characteristics = ingredients.flatMap(
    (detail) => detail.ingredientCharacteristics
  );

  // CAREFUL과 GOOD의 개수를 세기
  const carefulCount = characteristics.filter(
    (char) => char.type === 'CAREFUL'
  ).length;
  const goodCount = characteristics.filter(
    (char) => char.type === 'GOOD'
  ).length;

  // 배지를 결정하는 로직
  let badgeType: BadgeType = 'ETC'; // 기본 값은 ETC

  if (carefulCount >= 3) {
    badgeType = 'CAREFUL';
  } else if (goodCount >= 2) {
    badgeType = 'GOOD';
  }

  // 배지 스타일 정의
  const badgeStyles: Record<BadgeType, string> = {
    CAREFUL: 'bg-orange text-default', // CAREFUL 배지 스타일
    GOOD: 'bg-green text-default', // GOOD 배지 스타일
    ETC: 'bg-blue text-default', // ETC 배지 스타일
  };

  return (
    <div>
      <div
        className={`flex rounded-30pxr px-10pxr h-fit py-4pxr ${badgeStyles[badgeType]}`}
      >
        <Text
          fontSize={12}
          color="default"
          fontWeight={700}
          className="leading-[16px]"
        >
          {badgeType}
        </Text>
      </div>
    </div>
  );
}
