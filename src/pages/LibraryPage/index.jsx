import React, { useEffect, useMemo } from 'react';

import { Grid, Box, Typography, Divider, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { BooksList } from '../../common/components/BooksList';
import { TopicListItemSkeleton } from '../../common/components/loaders';
import { PageHeader } from '../../common/components/PageHeader';
import { RRVPagination } from '../../common/components/RRVPagination';
import { PageHelmet } from '../../common/components/wrappers';
import { usePagination } from '../../common/hooks/usePagination';
import { useQueryParams } from '../../common/hooks/useQueryParams';
import { actions, initials } from '../../redux/apiSliceBuilder';
import SearchBar from '../components/SearchBar2';
import { styles } from '../TopicDetails/TopicDetails.style';

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

const LibraryPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);
  const { t } = useTranslation();
  const { t: categorySlug } = useQueryParams();
  const {
    pagination: { pageSize, tablePage },
    handleChangePage,
    handleChangeRowsPerPage,
    resetRowsPerPage,
  } = usePagination();
  const { data } = actions.useListBooksQuery();
  const { data: catData, isFetching: categoriesLoading } =
    actions.useListCategoriesBookQuery();

  const { data: books, totalItems } = data || initials.dataArr;
  const { data: categories } = catData || initials.dataArr;
  const allBooks = t('library.allBooks');

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
  const allCategories = useMemo(() => {
    return [{ id: null, name: allBooks }, ...categories];
  }, [categories.length]);
  return (
    <PageHelmet title={t('topics')}>
      <Box>
        <PageHeader
          title={t('library.title')}
          description={t('library.description').toUpperCase()}
        />
        <Grid container spacing={2}>
          <Grid item md={4} sm={12} sx={{ mt: { xs: 2, md: 4 } }}>
            <Grid container>
              {categoriesLoading ? (
                <TopicListItemSkeleton totalItem={6} />
              ) : (
                <>
                  <Box
                    sx={{ display: { xs: 'none', md: 'flex' }, width: '100%' }}
                  >
                    <Divider
                      orientation="vertical"
                      sx={styles.dividers}
                      flexItem
                    />

                    <Box sx={{ flexGrow: 1 }}>
                      {allCategories?.map((cat) => (
                        <CategoryItem
                          key={cat.name}
                          category={cat}
                          selectedId={selectedCategoryId}
                          onClick={handleCategoryClick}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}
                  >
                    {allCategories.map((cat, catIdx) => (
                      <Button
                        key={catIdx}
                        variant="text"
                        onClick={() => handleCategoryClick(cat)}
                      >
                        <Typography
                          sx={
                            cat.id === selectedCategoryId
                              ? styles.select
                              : styles.unselect
                          }
                        >
                          {cat.name.toUpperCase()}
                        </Typography>
                      </Button>
                    ))}
                  </Box>
                </>
              )}
            </Grid>
          </Grid>

          <Grid item md={8} sm={12}>
            <Box px={2}>
              <SearchBar />
            </Box>
            <Grid container pt={2}>
              <Grid item md={12}>
                <Grid container>
                  <BooksList books={books} />
                  <RRVPagination
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    dataCount={totalItems}
                    page={tablePage}
                    pageSize={pageSize}
                    labelRowsPerPage="N topics per page:"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageHelmet>
  );
};

export default LibraryPage;
