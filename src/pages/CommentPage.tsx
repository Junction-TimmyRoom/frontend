import { useNavigate } from 'react-router-dom';

import Comment from '@/components/common/Comment';

import { IconWhiteBack } from '@/assets/icons';
import { IconSubmit } from '@/assets/icons';

const CommentPage = () => {
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
    {
      id: 9,
      content: '정말 도움이 많이 되었습니다.',
      nickname: '유저8',
      createdAt: '08.08',
    },
    {
      id: 10,
      content: '정말 도움이 많이 되었습니다.',
      nickname: '유저8',
      createdAt: '08.08',
    },
    {
      id: 11,
      content: '정말 도움이 많이 되었습니다.',
      nickname: '유저8',
      createdAt: '08.08',
    },
  ];

  return (
    <>
      <div
        className={
          'bg-navy fixed top-0 left-0 flex items-center w-screen h-66pxr p-16pxr'
        }
      >
        <IconWhiteBack onClick={() => navigate(-1)} />
        <p className="absolute left-1/2 transform -translate-x-1/2">
          <p className="text-16pxr text-white text-ellipsis">
            Tips for Vegetable Kimbab
          </p>
        </p>
      </div>
      <div className="w-full pt-88pxr pb-8 px-16pxr bg-navy6">
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
      <div className="fixed bottom-0 left-0 flex justify-center items-center bg-white h-97pxr w-full px-16pxr">
        <input
          placeholder="Write Comments..."
          className="w-full bg-navy7 rounded-31pxr p-22pxr outline-none"
        />
        <IconSubmit className="absolute right-30pxr" />
      </div>
    </>
  );
};

export default CommentPage;
