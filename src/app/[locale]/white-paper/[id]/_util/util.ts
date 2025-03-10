import { SeoBE } from '@/api/models/shared';

interface WhitePaperPageDetailBE {
  seo: SeoBE;
  white_paper_page_detail: {
    tag: string;
    title: string;
    description: string;
  };
}

interface WhitePaperPageDetailFE {
  tag: string;
  title: string;
  description: string;
}

export const handleWhitePaperData = (data: WhitePaperPageDetailBE) => {
  return {
    tag: data?.white_paper_page_detail?.tag,
    title: data?.white_paper_page_detail?.title,
    description: data?.white_paper_page_detail?.description,
  };
};
