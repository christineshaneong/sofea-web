export const getCurrentSession = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; 
  // Academic years usually flip in September (Month 9)
  return month >= 9 ? `${year}/${year + 1}` : `${year - 1}/${year}`;
};