import SolutionsList from './components/solutionsList/SolutionsList';
import SolutionsTools from './components/solutionsTools/SolutionsTools';
import { SolutionsListFE } from '@/api/models/shared';

const Solutions = ({ solutionsList }: { solutionsList?: SolutionsListFE[] | null }) => {
  return (
    <>
      {solutionsList && solutionsList?.length > 0 && <SolutionsList list={solutionsList ?? []} />}

      <SolutionsTools />
    </>
  );
};

export default Solutions;
