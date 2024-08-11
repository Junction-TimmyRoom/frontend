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
  const navigate = useNavigate();
  const displayComments = comments.length >= 3 ? comments.slice(-3) : comments;

  return (
    <div className="pb-45pxr">
      <Text fontSize={18} fontWeight={700}>
        Share Tips
      </Text>
      <div className="tipBox flex flex-col gap-10pxr my-24pxr">
        {recommendComment.map((item) => (
          <div className="bg-navy flex h-60pxr w-full rounded-30pxr items-center pl-16pxr pr-24pxr">
            <div className="flex w-full gap-6pxr items-center">
              <IconFire width={24} height={24} />
              <Text
                fontSize={14}
                fontWeight={600}
                color="default"
                className="leading-[20px]"
              >
                {item}
              </Text>
            </div>
          </div>
        ))}
      </div>

      <div className="relative px-16pxr bg-default border pt-25pxr  pb-50pxr rounded-30pxr ">
        {displayComments.map((comment, index) => (
          <div key={comment.id}>
            <Comment
              content={comment.content}
              user={comment.user}
              createdAt={comment.createdAt}
            />
            {index < comments.length - 1 && <hr className="my-20pxr" />}
          </div>
        ))}
        <div
          className="absolute bottom-0 left-0 flex justify-center items-center w-full "
          onClick={() => {
            navigate(`/comment/${menuId}`);
          }}
        >
          <div className="w-full bg-navy7 rounded-31pxr p-22pxr outline-none text-gray-400">
            Write Comments...
          </div>
          <IconSubmit className="absolute right-30pxr" />
        </div>
      </div>
    </div>
  );
}
