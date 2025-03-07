import { getTranslations } from 'next-intl/server';

import PageWrapper from '@/components/common/pageWrapper';
import DoubleCircleOverlay from '@/components/common/doubleCircleOverlay';
import BlurCircle from '@/components/common/blurCircle';
import Accordion from '@/components/common/accordion';

import { DoubleCircleOverlayStyles } from '@/components/common/doubleCircleOverlay/SharedTypes';
import { BlurCircleStyles } from '@/components/common/blurCircle/SharedTypes';

import './ContactUsQuestions.scss';

const ContactUsQuestions = async () => {
  const t = await getTranslations('contactUs');

  return (
    <div className="contact-us-questions small">
      <BlurCircle style={BlurCircleStyles.GREY} size="1147px" className="blur-circle-top" />

      <BlurCircle style={BlurCircleStyles.GREY} size="1147px" className="blur-circle-bottom" />

      <DoubleCircleOverlay
        style={DoubleCircleOverlayStyles.GREY}
        size="1618px"
        className="double-circle-top"
      />

      <DoubleCircleOverlay
        style={DoubleCircleOverlayStyles.GREY}
        size="1618px"
        className="double-circle-bottom"
      />

      <PageWrapper className="contact-us-questions-container">
        <div className="introduction">
          <div className="title">{t('questionsTitle')}</div>

          <div className="description">{t('questionDescription')}</div>
        </div>

        <div className="question-list-container">
          <div className="left-column">
            <Accordion className="question-container" title={t('question1')}>
              <div className="answer">{t('questionAwnser1')}</div>
            </Accordion>

            <Accordion className="question-container" title={t('question3')}>
              <div className="answer">{t('questionAwnser3')}</div>
            </Accordion>

            <Accordion className="question-container" title={t('question5')}>
              <div className="answer">{t('questionAwnser5')}</div>
            </Accordion>
          </div>

          <div className="right-column">
            <Accordion className="question-container" title={t('question2')}>
              <div className="answer">{t('questionAwnser2')}</div>
            </Accordion>

            <Accordion className="question-container" title={t('question4')}>
              <div className="answer">{t('questionAwnser4')}</div>
            </Accordion>

            <Accordion className="question-container" title={t('question6')}>
              <div className="answer">{t('questionAwnser6')}</div>
            </Accordion>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default ContactUsQuestions;
