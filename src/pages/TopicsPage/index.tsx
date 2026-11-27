import React, { useEffect } from 'react';

import { Home as HomeIcon, RssFeed as RssFeedIcon } from '@mui/icons-material';
import { Box, Divider, Grid, Typography } from '@mui/material';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import {
  TopicListItemSkeleton,
  TopicsCardSkeleton,
} from '../../common/components/loaders';
import { PageHeader } from '../../common/components/PageHeader';
import {
  RRVBreadcrumbs,
  type Crumb,
} from '../../common/components/RRVBreadcrumbs/Breadcrumbs';
import { RRVMenu } from '../../common/components/RRVMenu/RRVMenu';
import { RRVPagination } from '../../common/components/RRVPagination';
import { PageHelmet } from '../../common/components/wrappers';
import { usePagination } from '../../common/hooks/usePagination';
import { useQueryParams } from '../../common/hooks/useQueryParams';
import { toLink } from '../../helpers/utils/constants';
import { actions, initials, type QueryHook } from '../../redux/actions';
import SearchBar from '../components/SearchBar2';
import { styles } from '../TopicDetails/TopicDetails.style';
import TopicItem from '../TopicItem';

interface BreadcrumbMenu {
  id?: string;
  menuId?: string;
  lebelledBy?: string;
  anchorEl: Element | null;
  [key: string]: unknown;
}

type TopicNav = Crumb & { breadcumbMenu?: BreadcrumbMenu | null };

/** "All topics" is a pseudo category whose id is null. */
type CategoryOption = Pick<APP.ICategory, 'name'> & { id: string | null };

const initialCrumbsProps: BreadcrumbMenu = {
  id: 'btn-id',
  lebelledBy: 'menu-id',
  'aria-controls': undefined,
  'aria-haspopup': 'true',
  'aria-expanded': undefined,
  onClick: undefined,
  anchorEl: null,
};
const initialTopicHomeNavs = (t: TFunction): TopicNav[] => [
  {
    name: t('topics'),
    route: toLink('topics'),
    primaryIcon: HomeIcon,
    breadcumbMenu: null,
  },
];

interface CategoryItemProps {
  category: CategoryOption;
  selectedId: string | null;
  onClick: (category: CategoryOption) => void;
}

const CategoryItem = ({ category, selectedId, onClick }: CategoryItemProps) => (
  <Grid size={{ xs: 10, md: 10 }}>
    <Box onClick={() => onClick(category)}>
      <Typography
        sx={category.id === selectedId ? styles.select : styles.unselect}
      >
        {category.name.toUpperCase()}
      </Typography>
    </Box>
  </Grid>
);

const TopicsPage = () => {
  const { t } = useTranslation();
  const [topicsNavs, setTopicsNavs] = React.useState<TopicNav[]>(
    initialTopicHomeNavs(t),
  );
  const { t: categorySlug } = useQueryParams();
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    string | null
  >(null);
  const {
    pagination: { page, pageSize, tablePage },
    handleChangePage,
    handleChangeRowsPerPage,
    resetRowsPerPage,
  } = usePagination();
  const useListTopics = actions.useListTopicsQuery as QueryHook<
    APP.ITopic[],
    {
      truncate: number;
      page: number;
      pageSize: number;
      category: string | null;
    }
  >;
  const useListCategory = actions.useListCategoryQuery as QueryHook<
    APP.ICategory[],
    { categoryType: string }
  >;
  const { data, isFetching } = useListTopics({
    truncate: 148,
    page,
    pageSize,
    category: selectedCategoryId,
  });
  const { data: catData, isFetching: categoriesLoading } = useListCategory({
    categoryType: 'with-topics',
  });
  const { data: topics, totalItems } = data || initials.dataArr<APP.ITopic>();

  const { data: categories } = catData || initials.dataArr<APP.ICategory>();
  const allTopics = t('allTopics');
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setTopicsNavs((prev) => {
      const copyPrev = [...prev];
      const navIndex = prev.length - 1;
      const nav = prev[navIndex];
      copyPrev[navIndex] = {
        ...nav,
        breadcumbMenu: {
          ...nav.breadcumbMenu,
          'aria-controls': nav.breadcumbMenu?.menuId,
          'aria-haspopup': 'true',
          'aria-expanded': 'true',
          anchorEl: event.currentTarget,
        },
      };
      return copyPrev;
    });
  };
  const handleMenuClose = () => {
    setTopicsNavs((prev) => {
      const copyPrev = [...prev];
      const navIndex = prev.findIndex((nav) => nav.name === allTopics);
      const nav = prev[navIndex];
      copyPrev[navIndex] = {
        ...nav,
        breadcumbMenu: null,
      };
      return copyPrev;
    });
  };
  useEffect(() => {
    if (topics.length > 0) {
      const category = categories.find((cat) => cat.id === selectedCategoryId);
      setTopicsNavs(
        initialTopicHomeNavs(t).concat([
          {
            primaryIcon: RssFeedIcon,
            name: category?.name || allTopics,
            onClick: handleMenuOpen,
            breadcumbMenu: initialCrumbsProps,
          },
        ]),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics.length, selectedCategoryId]);
  useEffect(() => {
    if (categories.length > 0 && categorySlug) {
      const category = categories.find((cat) => cat.slug === categorySlug);
      setSelectedCategoryId(category?.id || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length, categorySlug]);
  const handleCategoryClick = (category: CategoryOption) => {
    setSelectedCategoryId(category?.id || null);
    resetRowsPerPage();
  };
  const breadcrumbMenu =
    topicsNavs[(topicsNavs?.length ?? 0) - 1]?.breadcumbMenu;
  return (
    <PageHelmet title={t('topics')}>
      <Box>
        <Grid size={{ md: 12 }}>
          <RRVBreadcrumbs crumbs={topicsNavs} />
          <RRVMenu
            handleClose={handleMenuClose}
            menuId={breadcrumbMenu?.id}
            menus={[{ id: '', name: allTopics }]
              .concat(categories)
              .map((c) => ({
                ...c,
                onClick: () => handleCategoryClick(c),
              }))}
            anchorEl={breadcrumbMenu?.anchorEl}
            open={Boolean(breadcrumbMenu?.anchorEl)}
            lebelledBy={breadcrumbMenu?.lebelledBy}
          />
        </Grid>
        <PageHeader description={t('teachings').toUpperCase()} />
        <Grid container spacing={2}>
          <Grid size={{ sm: 12, md: 3.6 }} mt={8}>
            <Grid container>
              {categoriesLoading ? (
                <TopicListItemSkeleton totalItem={6} />
              ) : (
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <Divider
                    orientation="vertical"
                    sx={styles.dividers}
                    flexItem
                  />

                  <Box sx={{ flexGrow: 1 }}>
                    <CategoryItem
                      category={{ id: null, name: allTopics }}
                      selectedId={selectedCategoryId}
                      onClick={handleCategoryClick}
                    />
                    {categories?.map((cat) => (
                      <CategoryItem
                        key={cat.id}
                        category={cat}
                        selectedId={selectedCategoryId}
                        onClick={handleCategoryClick}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>

          <Grid size={{ sm: 12, md: 8 }}>
            <SearchBar />
            <Grid container pt={2}>
              <Grid size={{ md: 12 }}>
                <Grid container>
                  {isFetching ? (
                    <TopicsCardSkeleton />
                  ) : (
                    <>
                      {topics?.length > 0 && (
                        <Grid container spacing={3}>
                          {topics.map((topic) => (
                            <Grid key={topic.slug} size={{ md: 5 }}>
                              <TopicItem
                                key={topic.slug}
                                topic={topic}
                                hasMore
                              />
                            </Grid>
                          ))}
                        </Grid>
                      )}

                      <RRVPagination
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        dataCount={totalItems ?? 0}
                        page={tablePage}
                        pageSize={pageSize}
                        labelRowsPerPage="N topics per page:"
                      />
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageHelmet>
  );
};

export default TopicsPage;
