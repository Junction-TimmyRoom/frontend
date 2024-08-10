interface CommentProps {
  content: string;
  user: {
    nickname: string;
    pregnancyWeeks: number;
  };
  createdAt: string;
}
const Comment = ({ content, user, createdAt }: CommentProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');

    return `${formattedMonth}.${formattedDay}`;
  };
  const commentDate = formatDate(createdAt);
  return (
    <div className="comment flex flex-col gap-10pxr">
      <p className="text-14pxr font-normal font-weight-400 leading-18.9pxr tracking-[-0.5px]">
        {content}
      </p>
      <p className="flex gap-4pxr text-gray-600 text-12pxr tracking-[-0.4px]">
        <p className="font-semibold">{user.nickname}</p>• {commentDate}
      </p>
    </div>
  );
};

export default Comment;
