'use client';

import Link from 'next/link';

export const transformCurlyFromLangStrToLink = (
  langString: string,
  linkDest: string,
  isBlank: boolean,
) => {
  // Extract the content between {{ and }} using regular expression
  const match = langString.match(/{{(.*?)}}/);

  if (match && match[1]) {
    const stringCut = langString.split(match[0]);

    return (
      <>
        {stringCut[0]}
        <Link
          href={linkDest}
          className="consent-link"
          target={`${isBlank ? '_blank' : '_self'}`}
          rel="noopener noreferrer"
        >
          {match[1]}
        </Link>
        {stringCut[1]}
      </>
    );
  } else {
    return <>{langString}</>;
  }
};
