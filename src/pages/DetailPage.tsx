import ImageDetail from '@/assets/images/image_detail.png';
import { Text } from '@/components/common/Text';
import Topbar from '@/components/common/Topbar';
import Ingredients from '@/components/detail/Ingredients';
import NutritionFacts from '@/components/detail/NutritionFacts';
import ShareTips from '@/components/detail/ShareTips';

const DetailPage = () => {
  return (
    <>
      <Topbar />
      <div className="w-full bg-[#F6F6F6]">
        <div className="flex flex-col web:flex web:flex-row">
          <img src={ImageDetail} className="w-full" alt="" />
          <div className="radius z-20 -mt-32pxr w-full py-33pxr px-16pxr rounded-36pxr bg-white">
            <div className="flex flex-col">
              <div className="flex gap-8pxr items-center">
                <Text fontSize={24} fontWeight={700} className="leading-normal">
                  Vegetable Kimbab
                </Text>
                <div className="flex rounded-30pxr px-10pxr h-fit py-4pxr bg-blue">
                  <Text
                    fontSize={12}
                    color="default"
                    className="leading-[16px]"
                  >
                    Good
                  </Text>
                </div>
              </div>
              <Text fontSize={14} fontWeight={500}>
                School Food
              </Text>
            </div>
          </div>
        </div>
        <div className="px-16pxr">
          <div className="mt-34pxr leading-[19.6px]">
            Rice roll made using various vegetables, it contains carrots,
            cucumbers, cucumbers, cucumbers, spinach, eggs, and more.
          </div>
          <NutritionFacts />
          <div className="mt-72pxr">
            <Ingredients />
          </div>
          <div className="mt-75pxr">
            <ShareTips />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
