export const sanitizeString = (text?: string) => {
  return text ? text.replace(/[<>*/_~`\\[\](){}|#\-+=!"'$%^&:;?.,\n\r]/g, '') : '';
};
