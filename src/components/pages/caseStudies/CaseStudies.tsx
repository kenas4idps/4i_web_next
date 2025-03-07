'use client';

import CaseStudiesList from './components/caseStudiesList';
import CaseStudiesTestimonials from './components/caseStudiesTestimonials';

import './CaseStudies.scss';

const CaseStudies = () => {
  return (
    <>
      <CaseStudiesList />

      <CaseStudiesTestimonials />
    </>
  );
};

export default CaseStudies;
