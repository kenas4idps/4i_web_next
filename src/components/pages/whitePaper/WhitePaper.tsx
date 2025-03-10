import WhitePaperForm from './components/whitePaperForm';
import WhitePaperGetStarted from './components/whitePaperGetStarted';

interface WhitePaperPageDetailFE {
  tag: string;
  title: string;
  description: string;
}

const WhitePaper = ({ pageDetail }: { pageDetail?: WhitePaperPageDetailFE | null }) => {
  return (
    <>
      {pageDetail && (
        <WhitePaperForm
          tag={pageDetail?.tag}
          title={pageDetail?.title}
          description={pageDetail?.description}
        />
      )}

      <WhitePaperGetStarted />
    </>
  );
};

export default WhitePaper;
