import { SolutionsListFE } from '@/api/models/shared';

export interface NavMenu {
  label: string;
  url: string;
  subPages?: NavMenu[];
}

// for usage on the server component
export async function getNavList(
  t: any,
  solutionsList: SolutionsListFE[] | undefined,
): Promise<NavMenu[]> {
  const transformSolutionsListToMenu = (solutionsList: SolutionsListFE[] | undefined) => {
    if (!solutionsList) return [];

    const menuList: NavMenu[] = [];

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

  const solutionsMenuList = transformSolutionsListToMenu(solutionsList);

  return [
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
}
