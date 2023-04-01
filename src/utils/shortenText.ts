export const shortenText = (text: string, val?: number) => {
  const length = val ? val : 40;
  return text?.length > length ? `${text.substring(0, length)}...` : text;
};
