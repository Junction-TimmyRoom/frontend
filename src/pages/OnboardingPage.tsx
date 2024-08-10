import { useEffect, useState } from 'react';

import Phase1 from '@/components/onboarding/Phase1';
import ProgressBar from '@/components/onboarding/ProgressBar';
import Phase2 from '@/components/onboarding/Phase2';

const OnboardingPage = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const [phase, setPhase] = useState<number>(1);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    return () => clearTimeout(fadeOutTimer);
  }, []);

  return (
    <>
      {/* {!fadeOut && (
        <div className="w-full h-full left-0 absolute z-10 bg-navy flex justify-center items-end pb-12 transition-opacity duration-500">
          <IconLogo />
        </div>
      )} */}
      <div className="w-full h-screen pt-8">
        <ProgressBar phase={phase} />
        {phase === 1 ? <Phase1 setPhase={setPhase} /> : <Phase2 />}
      </div>
    </>
  );
};

export default OnboardingPage;
