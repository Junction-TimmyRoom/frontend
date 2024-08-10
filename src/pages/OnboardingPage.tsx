import { useEffect, useState } from 'react';

import { IconLogo } from '@/assets/icons';
import BackgroundImage from '@/assets/icons/image_onboarding.png';
import BrandEx from '@/assets/icons/image_onboardingEx.png';

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
      {!fadeOut && (
        <div className="w-full h-full left-0 absolute z-10 overflow-hidden  bg-navy flex justify-center items-end pb-12">
          <img
            src={BackgroundImage}
            className="w-full max-w-430pxr absolute z-[-3] bottom-0"
          />
          <div className="rerative z-5 flex flex-col items-center gap-13pxr ">
            <IconLogo />
            <img src={BrandEx} className="w-198pxr " />
          </div>
        </div>
      )}
      <div className="w-full h-screen pt-8 px-16pxr">
        <ProgressBar phase={phase} />
        {phase === 1 ? <Phase1 setPhase={setPhase} /> : <Phase2 />}
      </div>
    </>
  );
};

export default OnboardingPage;
