'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

import CustomButton from '@/components/common/customButton';
import PageWrapper from '@/components/common/pageWrapper';
import { BtnStyles } from '@/components/common/customButton';

import LanguageSelector from './languageSelector';

const Logo = '/assets/icons/logoFull.svg';

import './Nav.scss';
import { NavMenu } from '@/app/[locale]/_util/getNavList';

interface Props {
  isBgWhite?: boolean;
  navList: NavMenu[];
}

const Nav = ({ isBgWhite = false, navList }: Props) => {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();

  const [isAtTop, setIsAtTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const isCurrentPage = (pageLink: string) => {
    const pageTree = pageLink.split('/');
    const pageParent = '/' + pageTree[1];

    const currentPageTree = pathname.split('/');
    const currentPageTreeParent = '/' + currentPageTree[1];

    return currentPageTreeParent === pageParent;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      router.push(newUrl);
    }
  };

  return (
    <nav
      className={`main-nav ${!isAtTop ? 'scrolled' : ''} ${isBgWhite && 'white-bg'} ${isOpen && 'open'} `}
    >
      <PageWrapper className="main-nav-container">
        <div className="top-container">
          <div onClick={() => router.push('/')} className="logo">
            <Image src={Logo} alt="company logo" width={150} height={40} priority />
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
            {navList.map((page, pageKey) => {
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
              <span className="main-page-link" onClick={() => router.push('/contact-us')}>
                {t('contactUs')}
              </span>
            </div>
          </div>

          <div className="contact-us-btn">
            <CustomButton
              onClickBtn={() => router.push('/contact-us')}
              btnStyle={BtnStyles.TERTIARY}
            >
              {t('contactUs')}
            </CustomButton>
          </div>
        </div>
      </PageWrapper>
    </nav>
  );
};

export default Nav;
