import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Comment from '@/components/common/Comment';

import { IconWhiteBack } from '@/assets/icons';
import { IconSubmit } from '@/assets/icons';

import { PostReview, GetReview } from '@/api/user/review';

interface Review {
  id: number;
  content: string;
  createdAt: string;
  user: {
    nickname: string;
    pregnancyWeeks: number;
  };
}

const CommentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  if (id === undefined) {
    console.error('ID가 정의되지 않았습니다.');
    return <div>잘못된 경로입니다.</div>;
  }

  const menuId = parseInt(id, 10);

  if (isNaN(menuId)) {
    console.error('ID가 유효한 숫자가 아닙니다.');
    return <div>잘못된 ID입니다.</div>;
  }
  const [render, setRender] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Review[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleComment = async (menuId: number) => {
    const response = await GetReview(menuId);
    setComments(response.reviews);
  };

  useEffect(() => {
    handleComment(menuId);
  }, [render]);

  const handleSubmit = async () => {
    if (comment.trim()) {
      if (isNaN(menuId)) {
        console.error('Invalid menu ID');
        return;
      }

      const response = await PostReview({
        content: comment,
        menuId: menuId,
      });
      console.log(response);
      setComment('');
      setRender(render + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <div
        className={
          'bg-navy fixed top-0 left-0 flex items-center w-screen h-66pxr p-16pxr'
        }
      >
        <IconWhiteBack onClick={() => navigate(-1)} />
        <p className="absolute left-1/2 transform -translate-x-1/2">
          <p className="text-16pxr text-white whitespace-nowrap text-ellipsis">
            Tips
          </p>
        </p>
      </div>
      <div className="w-full pt-88pxr pb-108pxr px-16pxr bg-navy6">
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
      <div className="fixed bottom-0 left-0 flex justify-center items-center bg-white h-97pxr w-full px-16pxr">
        <input
          placeholder="Write Comments..."
          className="w-full bg-navy7 rounded-31pxr py-22pxr pl-22pxr pr-48pxr outline-none"
          value={comment}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <IconSubmit className="absolute right-30pxr" onClick={handleSubmit} />
      </div>
    </>
  );
};

export default CommentPage;
