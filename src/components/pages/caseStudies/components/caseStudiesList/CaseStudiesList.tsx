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

import { DropDownStyles } from '@/components/common/customDropDown';
import { CaseStudyBannerFE, CaseStudyListBE } from '@/api/models/shared';

import { NotificationContext } from '@/providers/notificationProvider';
import { ClientIndustryListContext } from '@/providers/clientsTypeProvider/ClientsTypeProvider';

import CaseStudiesDataHandler from '@/utils/CaseStudiesDataHandler';

import './CaseStudiesList.scss';
import { api } from '@/api';
import { Link } from '@/i18n/navigation';
import { ClientIndustryTypeBE } from '@/api/models/ClientIndustry';

interface OptionType {
  label: string;
  value: string;
}

const CaseStudiesList = () => {
  const { displayNotification } = useContext(NotificationContext);
  const t = useTranslations('casesStudies');
  const locale = useLocale();

  const caseStudiesDataHandler = CaseStudiesDataHandler();

  const [caseStudiesList, setCaseStudiesList] = useState<CaseStudyBannerFE[]>([]);
  const [industries, setIndustries] = useState<OptionType[]>([{ label: '', value: '' }]);
  const [types, setTypes] = useState<OptionType[]>([{ label: '', value: '' }]);
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);

  const { clientsIndustryList, getClientsIndustryList } = useContext(ClientIndustryListContext);

  const currentPage = useRef(0);

  const loadMore = () => {
    currentPage.current = currentPage.current + 1;

    getCaseStudies(currentPage.current);
  };

  const handleClientIndustriesData = (clientsIndustryList?: ClientIndustryTypeBE[]) => {
    const clientIndustryList = clientsIndustryList?.map(industry => {
      return {
        label:
          industry?.attributes?.name === 'All'
            ? t('filterAllIndustry')
            : industry?.attributes?.name?.charAt(0).toUpperCase() +
              industry?.attributes?.name?.slice(1),
        value: industry?.attributes?.name,
      };
    });
    return clientIndustryList;
  };

  const handleCaseStudyTypeData = (caseStudyTypeData: ClientIndustryTypeBE[]) => {
    const clientTypeList = caseStudyTypeData?.map(type => {
      return {
        label: type?.attributes?.name,
        value: type?.attributes?.name,
      };
    });

    const all = {
      label: t('filterAllType'),
      value: 'All',
    };

    clientTypeList?.unshift(all);
    return clientTypeList;
  };

  const setFilterValues = async () => {
    try {
      const response = await api.shared.collection.getClientIndustries(locale);

      if ('content' in response) {
        const industryList = handleClientIndustriesData(response.content.data);
        const typeList = handleCaseStudyTypeData(response.content.data);

        if (industryList) setIndustries(industryList);
        if (typeList) setTypes(typeList);
      }
    } catch (error) {
      console.log(error);
      displayNotification(
        'Something Went Wrong Whilst Handling Filters List, Please Try Again !',
        'error',
      );
    }
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
        const caseStudiesData: CaseStudyListBE = response.content;
        const caseStudiesList: CaseStudyBannerFE[] = caseStudiesDataHandler.handleCaseStudiesData(
          caseStudiesData?.data,
        );

        const expectedNumOfCaseStudies = (currentPage.current + 1) * 6;

        const totalNumOfCaseStudies = caseStudiesData?.meta?.pagination?.total;

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

  useEffect(() => {
    getClientsIndustryList();
    setFilterValues();
    setTypeFilter('All');
    setIndustryFilter('All');
    // eslint-disable-next-line
  }, [clientsIndustryList, locale]);

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
                options={industries}
                dropDownStyle={DropDownStyles.SECONDARY}
                placeholder={t('industryPlaceHolder') as string}
              />
            </div>

            <div className="filter">
              <CustomDropDown
                onSelect={setTypeFilter}
                options={types}
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
              <CustomButton onClickBtn={() => loadMore()}>{t('loadMoreBtn')}</CustomButton>
            </div>
          )}
        </PageWrapper>
      )}
    </>
  );
};

export default CaseStudiesList;
