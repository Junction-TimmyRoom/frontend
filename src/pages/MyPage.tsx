import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Comment from '@/components/common/Comment';

import { IconWhiteBack } from '@/assets/icons';
import profile from '@/assets/icons/image_dummy-profile.png';

import { GetUserReview } from '@/api/user/review';
import { GetUserInfo } from '@/api/user/login';

interface Review {
  id: number;
  content: string;
  createdAt: string;
  user: {
    nickname: string;
    pregnancyWeeks: number;
  };
}

const MyPage = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState<Review[]>([]);
  const [weeks, setWeeks] = useState<number>(0);
  let localNicname: string | null = localStorage.getItem('nickname');

  const handleComment = async (nickname: string | null) => {
    const response = await GetUserReview(nickname);
    const userInfo = await GetUserInfo();
    setComments(response);
    setWeeks(userInfo.pregnancyWeeks);
  };

  useEffect(() => {
    handleComment(localNicname);
  }, []);

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
        <img
          className="w-100pxr h-100pxr bg-white rounded-full mt-30pxr border border-white border-4pxr"
          src={profile}
        />
        <p className="mt-14pxr mb-8pxr text-white text-20pxr font-semibold ">
          {localNicname}
        </p>
        <div className="px-16pxr py-8pxr bg-navy13 rounded-20pxr text-white text-14pxr font-medium mb-31pxr">
          {weeks} Weeks
        </div>
      </div>

      <div className="px-16pxr">
        <p className="flex gap-6pxr text-18pxr font-medium mt-47pxr mb-31pxr">
          Comments <p className="font-bold">{comments.length}</p>
        </p>
        <div className="pb-8">
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
      </div>
    </>
  );
};

export default MyPage;
