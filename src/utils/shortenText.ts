export const shortenText = (text: string) => {
  const length = 40;
  return text?.length > length ? `${text.substring(0, length)}...` : text;
};
