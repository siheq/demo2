export const pluralize = ({count, singular, plural}) => count === 1 ? singular : plural;

export const formatCarrierName = ({name, code}) => {
  if (code === 'SUDU' || name === 'HamburgSud') {
    return 'Hamburg Süd';
  }
  return name;
};
