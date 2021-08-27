export const getFileUrl = (file, type = 'w500') => {
  return `https://image.tmdb.org/t/p/${type}${file}`;
};

export const getFirstLetterUpper = (t) => {
  return `${t[0].toUpperCase()}${t.slice(1).toLowerCase()}`;
};
