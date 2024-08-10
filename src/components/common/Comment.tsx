import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CommentProps {
  content: string;
  nickname: string;
  createdAt: string;
}
const Comment = ({ content, nickname, createdAt }: CommentProps) => {
  return (
    <div className="comment flex flex-col gap-10pxr">
      <p className="text-14pxr font-normal font-weight-400 leading-18.9pxr tracking-[-0.5px]">
        {content}
      </p>
      <p className="flex gap-4pxr text-gray-600 text-12pxr tracking-[-0.4px]">
        <p className="font-semibold">{nickname}</p>• {createdAt}
      </p>
    </div>
  );
};

export default Comment;
