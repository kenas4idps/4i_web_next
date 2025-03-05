import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

interface Props {
  children: string;
}

const RichTextTransformCmp = ({ children }: Props) => {
  const linkRenderer = (props: any) => {
    return (
      <a href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    );
  };

  const isFullUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const imgRenderer = (props: any) => {
    let imgUrl = process.env.REACT_APP_STRAPI_URL + props.src;
    if (isFullUrl(props.src)) {
      imgUrl = props.src;
    }

    return (
      <div className="relative h-[300px] w-full">
        <Image
          fill
          className="object-contain"
          src={imgUrl}
          title={props.title}
          alt={props.alt || 'Rich text image'}
        />
      </div>
    );
  };

  return (
    <ReactMarkdown components={{ a: linkRenderer, img: imgRenderer }}>{children}</ReactMarkdown>
  );
};

export default RichTextTransformCmp;
