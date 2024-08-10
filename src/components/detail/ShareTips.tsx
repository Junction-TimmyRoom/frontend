import { IconFire, IconSubmit } from '@/assets/icons';
import { Text } from '../common/Text';
import Comment from '../common/Comment';
import { useNavigate } from 'react-router-dom';

interface Review {
  id: number;
  content: string;
  createdAt: string;
  user: {
    nickname: string;
    pregnancyWeeks: number;
  };
}
interface commentProps {
  comments: Review[];
  menuId: number;
  recommendComment: string[];
}
export default function ShareTips({
  comments,
  menuId,
  recommendComment,
}: commentProps) {
  console.log(recommendComment);
  const navigate = useNavigate();
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
      <div className="px-16pxr bg-default border py-25pxr rounded-t-30pxr">
        {comments.map((comment, index) => (
          <div key={comment.id}>
            <Comment
              content={comment.content}
              user={comment.user}
              createdAt={comment.createdAt}
            />
            {index < comments.length - 1 && <hr className="my-20pxr" />}
          </div>
        ))}
      </div>
      <div
        onClick={() => {
          navigate(`/comment/${menuId}`);
        }}
      >
        <div className="flex justify-center items-center bg-white h-97pxr w-full px-16pxr">
          <div className="w-full bg-navy7 rounded-31pxr p-22pxr outline-none">
            Write Comments...
          </div>
          <IconSubmit className="absolute right-30pxr" />
        </div>
      </div>
    </div>
  );
}
