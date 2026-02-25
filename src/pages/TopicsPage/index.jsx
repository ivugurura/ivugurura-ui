import React, { useEffect } from 'react';

import { Home as HomeIcon, RssFeed as RssFeedIcon } from '@mui/icons-material';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  TopicListItemSkeleton,
  TopicsCardSkeleton,
} from '../../common/components/loaders';
import { PageHeader } from '../../common/components/PageHeader';
import { RRVBreadcrumbs } from '../../common/components/RRVBreadcrumbs/Breadcrumbs';
import { RRVMenu } from '../../common/components/RRVMenu/RRVMenu';
import { RRVPagination } from '../../common/components/RRVPagination';
import { PageHelmet } from '../../common/components/wrappers';
import { usePagination } from '../../common/hooks/usePagination';
import { useQueryParams } from '../../common/hooks/useQueryParams';
import { toLink } from '../../helpers/utils/constants';
import { actions, initials } from '../../redux/apiSliceBuilder';
import SearchBar from '../components/SearchBar2';
import { styles } from '../TopicDetails/TopicDetails.style';
import TopicItem from '../TopicItem';

const initialCrumbsProps = {
  id: 'btn-id',
  lebelledBy: 'menu-id',
  'aria-controls': undefined,
  'aria-haspopup': 'true',
  'aria-expanded': undefined,
  onClick: undefined,
  anchorEl: null,
};
const initialTopicHomeNavs = (t) => [
  {
    name: t('topics'),
    route: toLink('topics'),
    primaryIcon: HomeIcon,
    breadcumbMenu: null,
  },
];
const CategoryItem = ({ category, selectedId, onClick }) => (
  <Grid item xs={10} md={10}>
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
  const [topicsNavs, setTopicsNavs] = React.useState(initialTopicHomeNavs(t));
  const { t: categorySlug } = useQueryParams();
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);
  const {
    pagination: { page, pageSize, tablePage },
    handleChangePage,
    handleChangeRowsPerPage,
    resetRowsPerPage,
  } = usePagination();
  const { data, isFetching } = actions.useListTopicsQuery({
    truncate: 148,
    page,
    pageSize,
    category: selectedCategoryId,
  });
  const { data: catData, isFetching: categoriesLoading } =
    actions.useListCategoryQuery({
      categoryType: 'with-topics',
    });
  const { data: topics, totalItems } = data || initials.dataArr();

  const { data: categories } = catData || initials.dataArr();
  const allTopics = t('allTopics');
  const handleMenuOpen = (event) => {
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
  }, [topics.length, selectedCategoryId]);
  useEffect(() => {
    if (categories.length > 0 && categorySlug) {
      const category = categories.find((cat) => cat.slug === categorySlug);
      setSelectedCategoryId(category?.id || null);
    }
  }, [categories.length, categorySlug]);
  const handleCategoryClick = (category) => {
    setSelectedCategoryId(category?.id || null);
    resetRowsPerPage();
  };
  const breadcrumbMenu =
    topicsNavs[(topicsNavs?.length ?? 0) - 1]?.breadcumbMenu;
  return (
    <PageHelmet title={t('topics')}>
      <Box>
        <Grid item md={12}>
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
          <Grid item md={3.6} sm={12} mt={8}>
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

          <Grid item md={8} sm={12}>
            <SearchBar />
            <Grid container pt={2}>
              <Grid item md={12}>
                <Grid container>
                  {isFetching ? (
                    <TopicsCardSkeleton />
                  ) : (
                    <>
                      {topics?.length > 0 && (
                        <Grid container spacing={3}>
                          {topics.map((topic) => (
                            <Grid key={topic.slug} item md={5}>
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
                        dataCount={totalItems}
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
