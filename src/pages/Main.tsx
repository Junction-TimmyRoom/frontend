import { useState } from 'react';

export default function Main() {
  const [photoData, setPhotoData] = useState<string | null>(null);

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center">
      <div className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCapture}
          className="hidden"
          id="cameraInput"
        />
        <label
          htmlFor="cameraInput"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Open Camera
        </label>
        {photoData && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Photo Taken:</h2>
            <img
              src={photoData}
              alt="Captured"
              className="mt-2 border rounded"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
