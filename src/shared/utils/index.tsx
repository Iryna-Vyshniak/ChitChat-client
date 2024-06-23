//  A function that returns a date in the format "10 Mar 2024"

export const getFormattedDate = (date: string) => {
  if (!date) return "No date";

    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };

    return new Date(date).toLocaleDateString('en-US', options);
  };