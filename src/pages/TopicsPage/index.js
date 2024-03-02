import React, { useEffect } from 'react';

import {
  Home as HomeIcon,
  MoreVert as MoreVertIcon,
  RssFeed as RssFeedIcon,
} from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Avatar, Grid, CardHeader, IconButton, Card } from '@mui/material';
import { red } from '@mui/material/colors';

import { RRVBreadcrumbs } from '../../common/components/RRVBreadcrumbs/Breadcrumbs';
import { RRVMenu } from '../../common/components/RRVMenu/RRVMenu';
import { RRVPagination } from '../../common/components/RRVPagination';
import { usePagination } from '../../common/hooks/usePagination';
import { useQueryParams } from '../../common/hooks/useQueryParams';
import { toLink } from '../../helpers/utils/constants';
import { actions, initials } from '../../redux/apiSliceBuilder';
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
const initialTopicHomeNavs = [
  {
    name: 'Topics',
    route: toLink('topics'),
    primaryIcon: HomeIcon,
    breadcumbMenu: null,
  },
];
const CategoryItem = ({ category, selectedId, onClick }) => (
  <Grid item xs={12} md={12}>
    <Card
      sx={{
        background: category.id === selectedId ? 'silver' : 'transparent',
        cursor: 'pointer',
      }}
      onClick={() => onClick(category)}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label={`Image for ${category.name}`}
          >
            R
          </Avatar>
        }
        action={
          <IconButton aria-label={category.name}>
            <MoreVertIcon />
          </IconButton>
        }
        title={category.name}
        subheader="September 14, 2016"
      />
    </Card>
  </Grid>
);
export const TopicsPage = () => {
  const [topicsNavs, setTopicsNavs] = React.useState(initialTopicHomeNavs);
  const { t: categorySlug } = useQueryParams();
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);
  const {
    pagination: { page, pageSize },
    handleChangePage,
    handleChangeRowsPerPage,
    resetRowsPerPage,
  } = usePagination(1, 15);
  const { data, isFetching } = actions.useListTopicsQuery({
    truncate: 148,
    page,
    pageSize,
    category: selectedCategoryId,
  });
  const { data: catData } = actions.useListCategoryQuery({
    categoryType: 'with-topics',
  });
  const { data: topics, totalItems } = data || initials.dataArr;
  const { data: categories } = catData || initials.dataArr;
  const handleMenuOpen = (event) => {
    setTopicsNavs((prev) => {
      const copyPrev = [...prev];
      const navIndex = prev.length - 1;
      const nav = prev[navIndex];
      copyPrev[navIndex] = {
        ...nav,
        breadcumbMenu: {
          ...nav.breadcumbMenu,
          'aria-controls': nav.breadcumbMenu.menuId,
          'aria-haspopup': 'true',
          'aria-expanded': 'true',
          anchorEl: event.currentTarget,
        },
      };
      return copyPrev;
    });
  };
  const handleMenuClose = () => {
    // setBreadcumbMenu((prev) => ({ ...prev, anchorEl: event.currentTarget }));
    setTopicsNavs((prev) => {
      const copyPrev = [...prev];
      const navIndex = prev.findIndex((nav) => nav.name === 'All');
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
        initialTopicHomeNavs.concat([
          {
            primaryIcon: RssFeedIcon,
            name: category?.name || 'All',
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
  console.log({ isFetching });
  return (
    <Grid container spacing={1}>
      <Grid item md={9}>
        <Grid container>
          <Grid item md={12}>
            <RRVBreadcrumbs crumbs={topicsNavs} />
            <RRVMenu
              handleClose={handleMenuClose}
              menuId={breadcrumbMenu?.id}
              menus={[{ id: '', name: 'All' }]
                .concat(categories)
                .map((c) => ({ ...c, onClick: () => handleCategoryClick(c) }))}
              anchorEl={breadcrumbMenu?.anchorEl}
              open={Boolean(breadcrumbMenu?.anchorEl)}
              lebelledBy={breadcrumbMenu?.lebelledBy}
            />
          </Grid>
          <Grid item md={12}>
            <Grid container>
              <Masonry columns={3}>
                {topics?.length > 0 &&
                  topics.map((topic) => (
                    <TopicItem key={topic.slug} topic={topic} hasMore />
                  ))}
              </Masonry>
              <RRVPagination
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                dataCount={totalItems}
                page={page}
                pageSize={pageSize}
                labelRowsPerPage="N topics per page:"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3}>
        <Grid container spacing={1}>
          <CategoryItem
            category={{ id: null, name: 'All' }}
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
        </Grid>
      </Grid>
    </Grid>
  );
};
