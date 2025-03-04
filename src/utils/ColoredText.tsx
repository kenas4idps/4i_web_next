import reactStringReplace from 'react-string-replace';

//Replace text inside [text] by a span to color it
export const getColoredText = (str: string) => {
  return reactStringReplace(str, /\[([^[\]]*)\]/g, (match, i) => (
    <span key={i} className="colored">
      {match}
    </span>
  ));
};
