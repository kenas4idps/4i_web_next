import MainPoints from '@/components/layout/mainPoints';
import Introduction from '@/components/layout/introduction';
import ImageAccordian from '@/components/layout/imageAccordian';
import Expertise from '@/components/layout/expertise/Expertise';
import CyberSecurityOversight from './components/cyberSecurityOversight';
// import CyberSecurityStrengths from "./components/cyberSecurityStrengths";
import CyberSecurityTestimonies from './components/cyberSecurityTestimonies';
import CyberSecurityTailoredSolution from './components/cyberSecurityTailoredSolution';
import { getTranslations } from 'next-intl/server';

interface CyberSecurityPage {
  introduction?: {
    title: string;
    description: string;
  };
  mainPoints?: {
    title: string;
    description: string;
  }[];
  approach?: {
    tag: string;
    title: string;
    descriotion: string;
    image: string;
    imageCaption: string;
    accordianList: {
      title: string;
      description: string;
    }[];
  };
  expertise?: {
    tag: string;
    title: string;
    description: string;
  };
}

const CyberSecurity = async ({ cyberSecurityPage }: { cyberSecurityPage: CyberSecurityPage }) => {
  const t = await getTranslations('cyberSecurity');

  return (
    <>
      {cyberSecurityPage && (
        <>
          {cyberSecurityPage.introduction && (
            <Introduction
              title={cyberSecurityPage?.introduction?.title}
              description={cyberSecurityPage?.introduction?.description}
            />
          )}
          <MainPoints pointList={cyberSecurityPage?.mainPoints} />
          {cyberSecurityPage.approach && (
            <ImageAccordian
              tag={cyberSecurityPage?.approach?.tag}
              title={cyberSecurityPage?.approach?.title}
              description={cyberSecurityPage?.approach?.descriotion}
              image={cyberSecurityPage?.approach?.image}
              imageCaption={cyberSecurityPage?.approach?.imageCaption}
              accordianList={cyberSecurityPage?.approach?.accordianList}
              buttonText={t('projectManagmentBtn')}
            />
          )}
          {cyberSecurityPage.expertise && (
            <Expertise
              tag={cyberSecurityPage?.expertise?.tag}
              title={cyberSecurityPage?.expertise?.title}
              description={cyberSecurityPage?.expertise?.description}
              buttonText={t('aboutUsBtn')}
            />
          )}

          <CyberSecurityOversight />

          {/* <CyberSecurityStrengths /> */}

          <CyberSecurityTestimonies />

          <CyberSecurityTailoredSolution />
        </>
      )}
    </>
  );
};

export default CyberSecurity;
