'use client';

import { useEffect, useRef, useState } from 'react';

import {
  ApproachFE,
  CaseStudyBannerFE,
  DevelopmentProcesstypeFE,
  DevelopmentServicesTypeFE,
  ToolsListFE,
} from '@/api/models/shared';

import SimpleText from '@/components/layout/simpleText';
import GetStarted from '@/components/layout/getStarted';
import ContactUsCmp from '@/components/layout/contactUsCmp';

import CollaborativeApproach from './components/collaborativeApproach';
import Security from './components/security';
import WhitePaper from './components/whitePaper';
import ServicesOffered from './components/servicesOffered';
import ReasonToChooseUs from './components/reasonToChooseUs';
import SolutionTools from './components/solutionTools';
import SolutionCaseStudies from './components/solutionCaseStudies';
import SolutionDevelopmentProcess from './components/solutionDevelopmentProcess';

import { getColoredText } from '@/utils/ColoredText';

interface ReasonDataTypeFE {
  title: string;
  content: string;
}

interface ReasonsDataTypeFE {
  title: string;
  list: ReasonDataTypeFE[];
}

interface SolutionsDataTypeFE {
  label: string;
  introductionText: string;
  whitePaperDetail: {
    title: string;
    subtitle: string;
    description: string;
  };
  developmentServices: DevelopmentServicesTypeFE;
  developmentProcess: DevelopmentProcesstypeFE;
  approach: ApproachFE;
  reasonsList: ReasonsDataTypeFE;
  securityAndReliability: {
    title: string;
    description: string;
  };
}

const Solution = ({
  slug,
  solution,
  toolsList,
  caseStudiesList,
}: {
  slug?: string | null;
  solution?: SolutionsDataTypeFE;
  toolsList?: ToolsListFE;
  caseStudiesList?: CaseStudyBannerFE[];
}) => {
  const [paginatedList, setPaginatedList] = useState<ToolsListFE>([]);

  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);

  const currentPage = useRef(0);

  const loadMore = () => {
    currentPage.current = currentPage.current + 1;
    handlePagination(currentPage.current);
  };

  const handlePagination = (pageNum = 0) => {
    const expectedNumOfTools = (currentPage.current + 1) * 7;
    const totalNumOfTools = toolsList?.length ?? 0;

    if (expectedNumOfTools < totalNumOfTools) {
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
      {solution && (
        <>
          <SimpleText withBubbles={true}>{getColoredText(solution?.introductionText)}</SimpleText>

          <ServicesOffered
            title={solution?.developmentServices?.title}
            description={solution?.developmentServices?.description}
            serviceList={solution?.developmentServices?.serviceList}
          />
        </>
      )}

      <ContactUsCmp />

      {solution && (
        <>
          <SolutionDevelopmentProcess
            description={solution?.developmentProcess?.descipriton}
            list={solution?.developmentProcess?.stepList}
          />

          <SolutionTools
            label={solution?.label}
            list={paginatedList}
            canLoadMore={canLoadMore}
            loadMore={loadMore}
          />
        </>
      )}

      <SolutionCaseStudies list={caseStudiesList ?? []} />

      {solution && (
        <>
          <CollaborativeApproach
            title={solution?.approach?.title}
            description={solution?.approach?.description}
            stepsList={solution?.approach?.stepsList}
          />

          <Security
            title={solution?.securityAndReliability?.title}
            description={solution?.securityAndReliability?.description}
          />

          <ReasonToChooseUs
            title={solution?.reasonsList?.title}
            list={solution?.reasonsList?.list}
          />
        </>
      )}

      <GetStarted />

      {solution && (
        <WhitePaper
          title={solution?.whitePaperDetail?.title}
          subtitle={solution?.whitePaperDetail?.subtitle}
          id={slug || ''}
        >
          {solution?.whitePaperDetail?.description}
        </WhitePaper>
      )}
    </>
  );
};

export default Solution;
