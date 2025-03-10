'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { ToolTypeFE } from '@/api/models/shared';

import Introduction from '@/components/layout/introduction';
import MainPoints from '@/components/layout/mainPoints';
import Expertise from '@/components/layout/expertise/Expertise';
import ImageAccordian from '@/components/layout/imageAccordian';
import ProjectManagementOversight from './components/projectManagementOversight';
import ProjectManagementTools from './components/projectManagementTools';
import ProjectManagementStrengths from './components/projectManagementStrengths';
import ProjectManagementTestimonies from './components/projectManagementTestimonies';
import ProjectManagementTailoredSolutions from './components/projectManagementTailoredSolutions';

const ProjectManagementImg = '/assets/img/projectManagementDiagram.jpg';

const ProjectManagement = ({ toolsList }: { toolsList?: ToolTypeFE[] | null }) => {
  const t = useTranslations('aboutUs');
  const t_pm = useTranslations('projectManagement');

  const [paginatedList, setPaginatedList] = useState<ToolTypeFE[]>([]);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);

  const currentPage = useRef(0);

  const loadMore = () => {
    currentPage.current = currentPage.current + 1;
    handlePagination(currentPage.current);
  };

  const handlePagination = (pageNum = 0) => {
    const expectedNumOfCaseStudies = (currentPage.current + 1) * 7;
    const totalNumOfCaseStudies = toolsList?.length ?? 0;

    if (expectedNumOfCaseStudies < totalNumOfCaseStudies) {
      setCanLoadMore(true);
    } else {
      setCanLoadMore(false);
    }

    if (toolsList) {
      const paginatedToolsList = toolsList?.slice(0, (pageNum + 1) * 7);
      setPaginatedList(paginatedToolsList);
    }
  };

  useEffect(() => {
    currentPage.current = 0;
    handlePagination(0);
    // eslint-disable-next-line
  }, [toolsList]);

  return (
    <>
      <Introduction title="introTitle" description="introDescription" />

      <MainPoints
        pointList={[
          {
            title: t_pm('projectManagementMainPointTitle1'),
            description: t_pm('projectManagementMainPointDescription1'),
          },
          {
            title: t_pm('projectManagementMainPointTitle2'),
            description: t_pm('projectManagementMainPointDescription2'),
          },
          {
            title: t_pm('projectManagementMainPointTitle3'),
            description: t_pm('projectManagementMainPointDescription3'),
          },
        ]}
      />

      <ImageAccordian
        tag={t('projectManagementTag')}
        title={t('projectManagementTitle')}
        description={t('projectManagementDescription')}
        accordianList={[
          {
            title: t('projectManagementAccordionTitle1'),
            description: t('projectManagementAccordionDescription1'),
          },
          {
            title: t('projectManagementAccordionTitle2'),
            description: t('projectManagementAccordionDescription2'),
          },
          {
            title: t('projectManagementAccordionTitle3'),
            description: t('projectManagementAccordionDescription3'),
          },
          {
            title: t('projectManagementAccordionTitle4'),
            description: t('projectManagementAccordionDescription4'),
          },
          {
            title: t('projectManagementAccordionTitle5'),
            description: t('projectManagementAccordionDescription5'),
          },
          {
            title: t('projectManagementAccordionTitle6'),
            description: t('projectManagementAccordionDescription6'),
          },
        ]}
        image={ProjectManagementImg}
        imageCaption={t('projectManagementPictureCaption')}
        buttonText={t('projectManagmentBtn')}
      />

      <Expertise
        tag={t_pm('expertiseTag')}
        title={t_pm('expertiseTitle')}
        description={t_pm('expertiseDescription')}
        buttonText={t_pm('aboutUsBtn')}
      />

      <ProjectManagementOversight />

      <ProjectManagementTools
        toolsList={paginatedList}
        canLoadMore={canLoadMore}
        loadMore={loadMore}
      />

      <ProjectManagementStrengths />

      <ProjectManagementTestimonies />

      <ProjectManagementTailoredSolutions />
    </>
  );
};

export default ProjectManagement;
