'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import CustomButton from '@/components/common/customButton';
import PageWrapper from '@/components/common/pageWrapper';
import { BtnStyles } from '@/components/common/customButton';

import LanguageSelector from './languageSelector';

const Logo = '/assets/icons/logoFull.svg';

import './Nav.scss';
import { NavMenu } from '@/app/[locale]/_util/getNavList';
import { Link, useRouter } from '@/i18n/navigation';

interface Props {
  isBgWhite?: boolean;
  navList: NavMenu[];
}

const Nav = ({ isBgWhite = false, navList }: Props) => {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();

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

          <div className="hamburger-menu" onClick={() => setIsOpen(current => !current)}>
            <div className="hamburger-menu"></div>
          </div>
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
                  <Link className="main-page-link" href={page.url}>
                    {page.label}
                    {page.subPages && <div className="arrow"></div>}
                  </Link>

                  {page.subPages && (
                    <>
                      <div className="sub-pages-list">
                        <div className="sub-pages-list-container">
                          {page.subPages.map((subpage, subKey) => {
                            return (
                              <Link key={subKey} className="sub-page" href={subpage.url}>
                                <span>{subpage.label}</span>
                              </Link>
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
            <CustomButton onClick={() => router.push('/contact-us')} btnStyle={BtnStyles.TERTIARY}>
              {t('contactUs')}
            </CustomButton>
          </div>
        </div>
      </PageWrapper>
    </nav>
  );
};

export default Nav;
