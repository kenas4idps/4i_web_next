import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

import { SolutionsListContext } from 'providers/solutionsListProvider/SolutionsListProvider';

import { SolutionsListFE } from 'types/SharedType';

import CustomButton from 'components/common/customButton';
import PageWrapper from 'components/common/pageWrapper';
import { BtnStyles } from 'components/common/customButton/SharedTypes';

import LanguageSelector from './languageSelector';

import Logo from 'assets/icons/logoFull.svg';

import './Nav.scss';

interface Menu {
  label: string;
  url: string;
}

interface Props {
  isBgWhite?: boolean;
}

const Nav = ({ isBgWhite = false }: Props) => {
  const { t, i18n } = useTranslation('nav');
  const location = useLocation();
  const navigate = useNavigate();

  const { getSolutionsList, solutionsList } = useContext(SolutionsListContext);

  const [isAtTop, setIsAtTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [solutionsMenuList, setSolutionsMenuList] = useState<Menu[]>([]);

  const transformSolutinosListToMenu = (solutionsList: SolutionsListFE[]) => {
    let menuList: Menu[] = [];

    menuList?.push({
      label: t('solutions'),
      url: '/solutions',
    });

    solutionsList?.forEach(solution => {
      menuList?.push({
        url: solution?.url,
        label: solution?.label,
      });
    });

    return menuList;
  };

  const isCurrentPage = (pageLink: string) => {
    const pageTree = pageLink.split('/');
    const pageParent = '/' + pageTree[1];

    const currentPageTree = location.pathname.split('/');
    const currentPageTreeParent = '/' + currentPageTree[1];

    return currentPageTreeParent === pageParent;
  };

  useEffect(() => {
    getSolutionsList();

    if (solutionsList) {
      const solutionsMenuList = transformSolutinosListToMenu(solutionsList);
      solutionsMenuList && setSolutionsMenuList(solutionsMenuList);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line
  }, [solutionsList, i18n.language]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    setIsAtTop(scrollTop === 0);
  };

  const pageList = [
    {
      label: t('home'),
      url: '/',
    },
    {
      label: t('aboutUs'),
      url: '/about-us',
      subPages: [
        {
          label: t('aboutUs'),
          url: '/about-us',
        },
        {
          label: t('projectManagement'),
          url: '/project-management',
        },
        {
          label: t('cyberSecurity'),
          url: '/cyber-security',
        },
      ],
    },
    {
      label: t('solutions'),
      url: '/solutions',
      subPages: solutionsMenuList,
    },
    {
      label: t('caseStudies'),
      url: '/case-studies',
    },
    {
      label: t('insights'),
      url: '/insights',
    },
    {
      label: t('ourClients'),
      url: '/our-clients',
    },
    {
      label: t('events'),
      url: '/events',
    },
  ];

  const changePage = (
    newUrl: string,
    hasSubpages: boolean,
    event: React.MouseEvent<HTMLElement>,
  ) => {
    if (isOpen && hasSubpages) {
      const parent = event.currentTarget.parentElement;
      if (parent) {
        if (parent.classList.contains('open')) {
          parent.classList.remove('open');
        } else {
          parent.classList.add('open');
        }
      }
    } else {
      setIsOpen(false);
      navigate(newUrl);
    }
  };

  return (
    <nav
      className={`main-nav ${!isAtTop ? 'scrolled' : ''} ${isBgWhite && 'white-bg'} ${isOpen && 'open'} `}
    >
      <PageWrapper className="main-nav-container">
        <div className="top-container">
          <div onClick={() => navigate('/')} className="logo">
            <img src={Logo} alt="compagny logo" />
          </div>

          <div className="languages">
            <LanguageSelector />
          </div>

          <div className="hamburger-menu" onClick={() => setIsOpen(current => !current)}></div>
        </div>
        <div className="bottom-container">
          <div className="languages-mobile">
            <LanguageSelector />
          </div>

          <div className="main-pages-list">
            {pageList.map((page, pageKey) => {
              return (
                <div
                  key={pageKey}
                  className={`main-page ${isCurrentPage(page.url) && 'current-page'}`}
                >
                  <span
                    className="main-page-link"
                    onClick={event => changePage(page.url, page.hasOwnProperty('subPages'), event)}
                  >
                    {page.label}
                    {page.subPages && <div className="arrow"></div>}
                  </span>

                  {page.subPages && (
                    <>
                      <div className="sub-pages-list">
                        <div className="sub-pages-list-container">
                          {page.subPages.map((subpage, subKey) => {
                            return (
                              <div
                                key={subKey}
                                className="sub-page"
                                onClick={event => changePage(subpage.url, false, event)}
                              >
                                <span>{subpage.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            <div
              className={`main-page contact-us-mobile ${
                isCurrentPage('contact-us') && 'current-page'
              }`}
            >
              <span className="main-page-link" onClick={() => navigate('/contact-us')}>
                {t('contactUs')}
              </span>
            </div>
          </div>

          <div className="contact-us-btn">
            <CustomButton onClickBtn={() => navigate('/contact-us')} btnStyle={BtnStyles.TERTIARY}>
              {t('contactUs')}
            </CustomButton>
          </div>
        </div>
      </PageWrapper>
    </nav>
  );
};

export default Nav;
