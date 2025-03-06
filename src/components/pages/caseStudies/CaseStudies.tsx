'use client';

import HeroBanner from '@/components/layout/heroBanner';
import CaseStudiesList from './components/caseStudiesList';
import CaseStudiesTestimonials from './components/caseStudiesTestimonials';
import { SeoFE } from '@/api/models/shared';
import { ImageFE } from '@/api/models/shared';

import './CaseStudies.scss';

type CaseStudiesProps = {
  data?:
    | {
        seo: SeoFE;
        description: string;
        title: string;
        bannerImage: ImageFE;
      }
    | {
        seo?: undefined;
        description?: undefined;
        title?: undefined;
        bannerImage?: undefined;
      };
};

const CaseStudies = ({ data }: CaseStudiesProps) => {
  return (
    <>
      <HeroBanner
        picture={data?.bannerImage?.url}
        title={data?.title}
        description={data?.description}
      />

      <CaseStudiesList />

      <CaseStudiesTestimonials />
    </>
  );
};

export default CaseStudies;
