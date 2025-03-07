import Accordion from '@/components/common/accordion';
import PageWrapper from '@/components/common/pageWrapper';
import RichTextTransformCmp from '@/components/common/richTextTransformCmp';

import './CookiePolicy.scss';
import { getTranslations } from 'next-intl/server';

const CookiePolicy = async () => {
  const t = await getTranslations('cookiePolicy');

  return (
    <div className="cookie-policy-wrapper">
      <PageWrapper>
        <header>
          <h1>{t('cookiePolicy')}</h1>
          <p>
            <i>{t('subtitle')}</i>
          </p>
        </header>
        <main>
          <section>
            <RichTextTransformCmp>{t('section_1.content')}</RichTextTransformCmp>
          </section>

          <section>
            <RichTextTransformCmp>{t('section_2.content')}</RichTextTransformCmp>
          </section>

          <section>
            <RichTextTransformCmp>{t('section_3.content')}</RichTextTransformCmp>
          </section>

          <section>
            <RichTextTransformCmp>{t('section_4.content')}</RichTextTransformCmp>
          </section>

          <section>
            <RichTextTransformCmp>{t('section_5.content')}</RichTextTransformCmp>
          </section>

          <section>
            <RichTextTransformCmp>{t('section_6.content.title')}</RichTextTransformCmp>
            <Accordion title="Tawk" className="placed-cookies">
              <RichTextTransformCmp>{t('section_6.content.accordian_1')}</RichTextTransformCmp>
            </Accordion>
            <Accordion title="Google Analytics" className="placed-cookies">
              <RichTextTransformCmp>{t('section_6.content.accordian_2')}</RichTextTransformCmp>
            </Accordion>
          </section>

          <section>
            <RichTextTransformCmp>{t('section_7.content')}</RichTextTransformCmp>
          </section>

          <section>
            <RichTextTransformCmp>{t('section_8.content')}</RichTextTransformCmp>
          </section>
        </main>
      </PageWrapper>
    </div>
  );
};

export default CookiePolicy;
