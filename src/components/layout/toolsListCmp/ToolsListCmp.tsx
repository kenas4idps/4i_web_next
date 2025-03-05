import PageWrapper from '@/components/common/pageWrapper';
import { ToolsListFE } from '@/api/models/shared';
import Image from 'next/image';

import './ToolsListCmp.scss';

interface Props {
  title: string;
  tag: string;
  description?: string;
  list: ToolsListFE;
}

const ToolsListCmp = ({ title, tag, description, list }: Props) => {
  return (
    <PageWrapper className="tools-list-cmp">
      <div className="info">
        <div className="tag">{tag}</div>

        <div className="title">{title}</div>

        {description && <div className="description">{description}</div>}
      </div>

      <div className="tools-list-container">
        {list?.map((tool: ToolsListFE[number], key: number) => {
          return (
            <div className="tool" key={key}>
              <div className="img-container relative h-16 w-16">
                <Image
                  fill
                  className="object-contain"
                  src={tool?.logo?.url}
                  alt={tool?.logo?.alternativeText || 'Tool logo'}
                />
              </div>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default ToolsListCmp;
