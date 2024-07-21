//  A function that returns a date in the format "10 Mar 2024"

export const getFormattedDate = (date: string) => {
  if (!date) return 'No date';

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  return new Date(date).toLocaleDateString('en-US', options);
};

// create link to download image from cloudinary
export const downloadImage = (url: string) => {
  return `${url.split('/upload/')[0]}/upload/fl_attachment/${url.split('/upload/')[1]}`;
};

export const getFileNameFromUrl = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 1];
};

export const downloadImagePost = (url: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', getFileNameFromUrl(url));
  document.body.appendChild(link);
  link.click();
  link.remove();
};
