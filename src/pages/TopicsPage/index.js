import React, { useEffect } from 'react';

import {
  Home as HomeIcon, MoreVert as MoreVertIcon, RssFeed as RssFeedIcon,
} from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import {
  Avatar, Grid, CardHeader, IconButton, Card,
} from '@mui/material';
import { red } from '@mui/material/colors';

import { RRVBreadcrumbs } from '../../common/components/RRVBreadcrumbs/Breadcrumbs';
import { RRVMenu } from '../../common/components/RRVMenu/RRVMenu';
import { RRVPagination } from '../../common/components/RRVPagination';
import { usePagination } from '../../common/hooks/usePagination';
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
const initialTopicHomeNavs = [{
  name: 'Topics',
  route: toLink('topics'),
  primaryIcon: HomeIcon,
  breadcumbMenu: null,
}];
export const TopicsPage = () => {
  const [topicsNavs, setTopicsNavs] = React.useState(initialTopicHomeNavs);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);
  // const [breadcumbMenu, setBreadcumbMenu] = React.useState(initialCrumbsProps);
  const {
    pagination: { page, pageSize },
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(1, 15);
  const { data, isFetching } = actions.useListTopicsQuery({
    truncate: 148, page, pageSize, category: selectedCategoryId,
  });
  const { data: catData } = actions.useListCategoryQuery({ categoryType: 'with-topics' });
  const { data: topics, totalItems } = data || initials.dataArr;
  const { data: categories } = catData || initials.dataArr;
  const handleMenuOpen = (event) => {
    // setBreadcumbMenu((prev) => ({ ...prev, anchorEl: event.currentTarget }));
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
      setTopicsNavs(initialTopicHomeNavs.concat([{
        primaryIcon: RssFeedIcon,
        name: category?.name || 'All',
        onClick: handleMenuOpen,
        breadcumbMenu: initialCrumbsProps,
      }]));
    }
  }, [topics.length, selectedCategoryId]);
  const breadcrumbMenu = topicsNavs.find((nav) => nav.name === 'All')?.breadcumbMenu;
  console.log({ isFetching });
  return (
    <Grid container spacing={2}>
      <Grid item md={9}>
        <Grid container>
          <Grid item md={12}>
            <RRVBreadcrumbs crumbs={topicsNavs} />
            <RRVMenu
              handleClose={handleMenuClose}
              menuId={breadcrumbMenu?.id}
              menus={[{ id: '', name: 'All' }].concat(categories.map((c) => ({ ...c, onClick: () => setSelectedCategoryId(c.id) })))}
              anchorEl={breadcrumbMenu?.anchorEl}
              open={Boolean(breadcrumbMenu?.anchorEl)}
              lebelledBy={breadcrumbMenu?.lebelledBy}
            />
          </Grid>
          <Grid item md={12}>
            <Grid container>
              <Masonry columns={3}>
                {topics?.length > 0 && topics.map((topic) => (
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
          {[1, 2, 3, 4].map((el) => (
            <Grid item key={el}>
              <Card>
                <CardHeader
                  avatar={(
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  )}
                  action={(
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  )}
                  title="Shrimp and Chorizo Paella and tcella"
                  subheader="September 14, 2016"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
