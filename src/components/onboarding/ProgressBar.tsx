import { IconProgress } from '@/assets/icons';

interface ProgressProps {
  phase: number;
}

const ProgressBar = ({ phase }: ProgressProps) => {
  const progress = (phase / 2) * 100;

  return (
    <div className="absolute left-0 w-full h-5">
      <div className="absolute top-40pxr left-0 w-full h-5pxr bg-gray-200 rounded-full"></div>
      <div
        className={`absolute top-40pxr left-0 h-5pxr bg-navy rounded-full transition-all duration-500`}
        style={{ width: `${progress}%` }}
      ></div>
      <div
        className="absolute top-6pxr left-0 h-5pxr flex items-center justify-end transition-all duration-500"
        style={{ width: `${progress}%` }}
      >
        <div className="relative text-white">
          <p className="absolute left-10pxr top-3pxr text-13pxr font-bold">
            {phase}/2
          </p>
          <IconProgress />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
