import Head from 'next/head';

import BlurCircle from '@/components/common/blurCircle';
import PageWrapper from '@/components/common/pageWrapper';
import PixelarCheck from '@/components/common/pixelarCheck';

import './Notice.scss';

interface Props {
  tag: string;
  title: string;
  subtitle: string;
  success?: boolean;
}

const Notice = ({ tag, title, subtitle, success = false }: Props) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <PageWrapper className="notice-container">
        <BlurCircle size="922px" className="blur-circle-container" />

        <div className="tag-container">
          <p>{tag}</p>
        </div>
        <div className="title-container">
          <p>{title}</p>
        </div>
        <div className="subtitle-container">
          <p>{subtitle}</p>
        </div>

        {success && <PixelarCheck />}
      </PageWrapper>
    </>
  );
};

export default Notice;
