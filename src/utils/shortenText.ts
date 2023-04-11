export const shortenText = (text: string, val?: number) => {
  const length = val ? val : 40;
  return text?.length > length ? `${text.substring(0, length)}...` : text;
};

export const queryReadyText = (query: string): string => {
  return query.replace(/(\w)\?/g, "$1 ?");
};
