import PageWrapper from '@/components/common/pageWrapper';

import './PageNotFound.scss';
import Link from 'next/link';

const PageNotFound = () => {
  return (
    <PageWrapper className="page-not-found">
      <div className="title">404 Error</div>

      <div className="sub-title">Page not found</div>

      <div className="content">
        Let&apos;s take you back :{' '}
        <Link href="/" className="home-page-link">
          Homepage
        </Link>
      </div>
    </PageWrapper>
  );
};

export default PageNotFound;
