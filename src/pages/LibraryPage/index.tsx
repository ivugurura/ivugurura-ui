import React, { useEffect, useMemo } from 'react';

import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { BooksList } from '../../common/components/BooksList';
import { TopicListItemSkeleton } from '../../common/components/loaders';
import { PageHeader } from '../../common/components/PageHeader';
import { RRVPagination } from '../../common/components/RRVPagination';
import { PageHelmet } from '../../common/components/wrappers';
import { usePagination } from '../../common/hooks/usePagination';
import { useQueryParams } from '../../common/hooks/useQueryParams';
import { actions, initials, type QueryHook } from '../../redux/actions';
import SearchBar from '../components/SearchBar2';
import { styles } from '../TopicDetails/TopicDetails.style';

/** "All books" is a pseudo category whose id is null. */
type CategoryOption = Pick<APP.ICategory, 'name'> & { id: string | null };

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

const LibraryPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    string | null
  >(null);
  const { t } = useTranslation();
  const { t: categorySlug } = useQueryParams();
  const {
    pagination: { pageSize, tablePage },
    handleChangePage,
    handleChangeRowsPerPage,
    resetRowsPerPage,
  } = usePagination();
  const useListBooks = actions.useListBooksQuery as QueryHook<APP.IBook[]>;
  const useListCategoriesBook =
    actions.useListCategoriesBookQuery as QueryHook<APP.ICategory[]>;
  const { data } = useListBooks();
  const { data: catData, isFetching: categoriesLoading } =
    useListCategoriesBook();

  const { data: books, totalItems } = data || initials.dataArr<APP.IBook>();
  const { data: categories } = catData || initials.dataArr<APP.ICategory>();
  const allBooks = t('library.allBooks');

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
  const allCategories = useMemo<CategoryOption[]>(() => {
    return [{ id: null, name: allBooks }, ...categories];
  }, [categories, allBooks]);
  return (
    <PageHelmet title={t('topics')}>
      <Box>
        <PageHeader
          title={t('library.title')}
          description={t('library.description').toUpperCase()}
        />
        <Grid container spacing={2}>
          <Grid size={{ sm: 12, md: 4 }} sx={{ mt: { xs: 2, md: 4 } }}>
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

          <Grid size={{ sm: 12, md: 8 }}>
            <Box px={2}>
              <SearchBar />
            </Box>
            <Grid container pt={2}>
              <Grid size={{ md: 12 }}>
                <Grid container>
                  <BooksList books={books} />
                  <RRVPagination
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    dataCount={totalItems ?? 0}
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
