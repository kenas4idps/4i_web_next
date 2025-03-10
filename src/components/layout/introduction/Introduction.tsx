import { useTranslations } from 'next-intl';
import SimpleText from '@/components/layout/simpleText';
import { getColoredText } from '@/utils/ColoredText';

import './Introduction.scss';

interface Props {
  title: string;
  description: string;
}

const Introduction = ({ title, description }: Props) => {
  const t = useTranslations('projectManagement');

  return (
    <div className="intro">
      <SimpleText withBubbles={true}>
        <h2 className="intro-title">{t(title)}</h2>
        <p className="intro-description">{getColoredText(t(description))}</p>
      </SimpleText>
    </div>
  );
};

export default Introduction;
