import { useState } from 'react';

interface UsePreviewImageReturn {
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imgUrl: string | null;
  setImgUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

export const usePreviewImage = (): UsePreviewImageReturn => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
    setImgUrl(null);
  };

  return { handleImageChange, imgUrl, setImgUrl };
};
