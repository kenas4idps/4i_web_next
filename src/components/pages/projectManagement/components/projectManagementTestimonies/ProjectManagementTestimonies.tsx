'use client';

import { useState } from 'react';

import PageWrapper from '@/components/common/pageWrapper';
import TextTestimonies from '@/components/layout/textTestimonies';

import './ProjectManagementTestimonies.scss';

const ProjectManagementTestimonies = () => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const onFetch = (isEmpty: boolean) => {
    setIsEmpty(isEmpty);
  };

  return (
    <PageWrapper className={`project-management-testimonies small ${!isEmpty && 'show'}`}>
      <TextTestimonies onFetch={onFetch} />
    </PageWrapper>
  );
};

export default ProjectManagementTestimonies;
