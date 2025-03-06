'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import PageWrapper from '@/components/common/pageWrapper';
import CustomDropDown from '@/components/common/customDropDown';
import CustomButton from '@/components/common/customButton';
import DoubleCircleOverlay from '@/components/common/doubleCircleOverlay';
import BlurCircle from '@/components/common/blurCircle';
import RichTextStylingCmp from '@/components/common/richTextStylingCmp';
import RichTextTransformCmp from '@/components/common/richTextTransformCmp';

import { CaseStudyBannerFE } from '@/api/models/shared';

import { NotificationContext } from '@/providers/notificationProvider';

import './CaseStudiesList.scss';
import { api } from '@/api';
import { Link } from '@/i18n/navigation';
import { CaseStudiesType } from '@/api/models/CaseStudies';
import { useQuery } from '@tanstack/react-query';
import { DropDownStyles } from '@/components/common/customDropDown/SharedTypes';

const handleCaseStudiesData = (caseStudiesData: CaseStudiesType[]) => {
  const caseStudiesList: CaseStudyBannerFE[] = caseStudiesData?.map(caseStudy => {
    const caseStudyTypes = caseStudy?.attributes?.case_study_types?.data?.map(
      type => type?.attributes?.name,
    );

    return {
      id: caseStudy?.attributes?.url_path,
      title: caseStudy?.attributes?.title,
      description: caseStudy?.attributes?.description,
      tags: caseStudyTypes,
      bannerImage: {
        url: `${process.env.REACT_APP_STRAPI_URL}${caseStudy?.attributes?.banner_image?.data?.attributes?.url}`,
        caption: caseStudy?.attributes?.banner_image?.data?.attributes?.caption,
        alternativeText: caseStudy?.attributes?.banner_image?.data?.attributes?.alternativeText,
      },
    };
  });
  return caseStudiesList;
};

const CaseStudiesList = () => {
  const { displayNotification } = useContext(NotificationContext);
  const t = useTranslations('casesStudies');
  const locale = useLocale();

  const [caseStudiesList, setCaseStudiesList] = useState<CaseStudyBannerFE[]>([]);
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);

  const currentPage = useRef(0);

  const loadMore = () => {
    currentPage.current = currentPage.current + 1;

    getCaseStudies(currentPage.current);
  };

  const getCaseStudies = async (page: number) => {
    try {
      const encodedTypeFilter = encodeURIComponent(typeFilter);
      const encodedIndustryFilter = encodeURIComponent(industryFilter);

      const response = await api.shared.collection.getCaseStudiesData(
        locale,
        [encodedTypeFilter],
        encodedIndustryFilter,
        currentPage.current,
      );

      if ('content' in response) {
        console.log({ response });
        const caseStudiesList = handleCaseStudiesData(response.content.data);

        const expectedNumOfCaseStudies = (currentPage.current + 1) * 6;

        const totalNumOfCaseStudies = response?.content?.meta?.pagination?.total;

        if (expectedNumOfCaseStudies < totalNumOfCaseStudies) {
          setCanLoadMore(true);
        } else {
          setCanLoadMore(false);
        }

        if (caseStudiesList) {
          if (page === 0) {
            setCaseStudiesList(caseStudiesList);
          } else {
            setCaseStudiesList(prevCaseStudies => [...prevCaseStudies, ...caseStudiesList]);
          }
        }
      }
    } catch (error) {
      console.log(error);
      displayNotification(
        'Something Went Wrong When Handling Case Studies Data, Please Try Again !',
        'error',
      );
    }
  };

  const { data: filterValues } = useQuery({
    queryKey: ['caseStudies.filterValues', locale],
    queryFn: async () => {
      try {
        const response = await api.shared.collection.getCaseStudyTypesData(locale);

        if ('content' in response) {
          console.log({ response });
          const industryList = response.content.data.map(industry => ({
            label:
              industry?.attributes?.name === 'All'
                ? t('filterAllIndustry')
                : industry?.attributes?.name?.charAt(0).toUpperCase() +
                  industry?.attributes?.name?.slice(1),
            value: industry?.attributes?.name,
          }));

          const typeList = response.content.data.map(type => ({
            label: type?.attributes?.name,
            value: type?.attributes?.name,
          }));

          const all = {
            label: t('filterAllType'),
            value: 'All',
          };

          typeList?.unshift(all);

          console.log({ industryList, typeList });

          return {
            industryList,
            typeList,
          };
        }
      } catch (error) {
        console.log(error);
        displayNotification(
          'Something Went Wrong Whilst Handling Filters List, Please Try Again !',
          'error',
        );
      }

      return null;
    },
  });

  useEffect(() => {
    setTypeFilter('All');
    setIndustryFilter('All');
  }, [locale]);

  useEffect(() => {
    currentPage.current = 0;
    getCaseStudies(0);
    // eslint-disable-next-line
  }, [industryFilter, typeFilter]);

  return (
    <>
      {caseStudiesList && (
        <PageWrapper className="cases-studies-list">
          <DoubleCircleOverlay size="1440px" className="double-circle-container-top" />
          <DoubleCircleOverlay size="1540px" className="double-circle-container-bottom" />
          <div className="filters-container">
            <div className="filter">
              <CustomDropDown
                onSelect={setIndustryFilter}
                options={filterValues?.industryList ?? []}
                dropDownStyle={DropDownStyles.SECONDARY}
                placeholder={t('industryPlaceHolder') as string}
              />
            </div>

            <div className="filter">
              <CustomDropDown
                onSelect={setTypeFilter}
                options={filterValues?.typeList ?? []}
                dropDownStyle={DropDownStyles.SECONDARY}
                placeholder={t('typePlaceholder') as string}
              />
            </div>
          </div>

          <div className="cases-studies-list-container">
            {caseStudiesList?.map((caseStudy, key) => {
              return (
                <div className="case-study-super-container" key={key}>
                  <BlurCircle size="1285px" className="blur-circle-container" />

                  <div className="case-study-container">
                    <div
                      className="picture"
                      style={{
                        backgroundImage: `url(${caseStudy?.bannerImage?.url})`,
                      }}
                    ></div>

                    <div className="tag-list">
                      {caseStudy?.tags?.map((tag, k) => {
                        return (
                          <div className="tag" key={k}>
                            {tag}
                          </div>
                        );
                      })}
                    </div>

                    <div className="title">{caseStudy?.title}</div>

                    <div className="description">
                      <RichTextStylingCmp>
                        <RichTextTransformCmp>{caseStudy?.description}</RichTextTransformCmp>
                      </RichTextStylingCmp>
                    </div>

                    <div className="case-study-btn">
                      <Link href={`/case-study/${caseStudy?.id}`}>
                        <CustomButton>{t('learnMoreBtn')}</CustomButton>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {canLoadMore && (
            <div className="load-more-btn">
              <CustomButton onClick={() => loadMore()}>{t('loadMoreBtn')}</CustomButton>
            </div>
          )}
        </PageWrapper>
      )}
    </>
  );
};

export default CaseStudiesList;
