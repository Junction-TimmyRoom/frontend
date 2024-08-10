import { useNavigate } from 'react-router-dom';
import Comment from '@/components/common/Comment';

import { IconWhiteBack } from '@/assets/icons';

const MyPage = () => {
  const navigate = useNavigate();

  const comments = [
    {
      id: 1,
      content: '이 글 정말 유익하네요!',
      nickname: '유저1',
      createdAt: '08.01',
    },
    {
      id: 2,
      content: '좋은 정보 감사합니다.',
      nickname: '유저2',
      createdAt: '08.02',
    },
    {
      id: 3,
      content: '저도 같은 생각입니다.',
      nickname: '유저3',
      createdAt: '08.03',
    },
    {
      id: 4,
      content: '잘 읽었습니다.',
      nickname: '유저4',
      createdAt: '08.04',
    },
    {
      id: 5,
      content: '더 많은 글 기대할게요.',
      nickname: '유저5',
      createdAt: '08.05',
    },
    {
      id: 6,
      content: '유익한 정보 감사합니다.',
      nickname: '유저6',
      createdAt: '08.06',
    },
    {
      id: 7,
      content: '좋은 글 감사합니다.',
      nickname: '유저7',
      createdAt: '08.07',
    },
    {
      id: 8,
      content: '정말 도움이 많이 되었습니다.',
      nickname: '유저8',
      createdAt: '08.08',
    },
  ];

  return (
    <>
      <div className="bg-navy w-full flex flex-col items-center justify-end rounded-b-30pxr">
        <div
          className={
            'bg-transparent flex items-center w-full h-48pxr p-16pxr mt-30pxr'
          }
        >
          <IconWhiteBack onClick={() => navigate(-1)} />
          <p className="absolute left-1/2 transform -translate-x-1/2">
            <p className="text-white font-semibold text-16pxr">My Profile</p>
          </p>
        </div>
        <img className="w-100pxr h-100pxr bg-white rounded-full mt-30pxr" />
        <p className="mt-14pxr mb-8pxr text-white text-20pxr font-semibold ">
          둥둥
        </p>
        <div className="px-16pxr py-8pxr bg-navy13 rounded-20pxr text-white text-14pxr font-medium mb-31pxr">
          임신 16주
        </div>
      </div>

      <div className="px-16pxr">
        <p className="flex gap-6pxr text-18pxr font-medium mt-47pxr mb-31pxr">
          My Comments <p className="font-bold">{'24'}</p>
        </p>
        <div className="pb-8">
          {comments.map((comment, index) => (
            <div key={comment.id}>
              <Comment
                content={comment.content}
                nickname={comment.nickname}
                createdAt={comment.createdAt}
              />
              {index < comments.length - 1 && <hr className="my-20pxr" />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyPage;
