export const getTime = (data: string) => {
  return new Date(data).toLocaleTimeString('en-us', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const getDate = (data: Date) => {
  return new Date(data).toLocaleTimeString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
