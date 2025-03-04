import PageWrapper from 'components/common/pageWrapper';
import { ToolsListFE } from 'types/SharedType';

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
        {list?.map((tool, key) => {
          return (
            <div className="tool" key={key}>
              <div className="img-container">
                <img src={tool?.logo?.url} alt={tool?.logo?.alternativeText} />
              </div>
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default ToolsListCmp;
