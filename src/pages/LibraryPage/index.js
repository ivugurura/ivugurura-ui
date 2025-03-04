import React, { useEffect } from 'react';

import { Grid, Box, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { BooksList } from '../../common/components/BooksList';
import { TopicListItemSkeleton } from '../../common/components/loaders';
import { RRVPagination } from '../../common/components/RRVPagination';
import { PageHelmet } from '../../common/components/wrappers';
import { usePagination } from '../../common/hooks/usePagination';
import { useQueryParams } from '../../common/hooks/useQueryParams';
import { actions, initials } from '../../redux/apiSliceBuilder';
import { ViewBook } from '../admin/Books/ViewBook';
import SearchBar from '../components/searchBar';
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
  const [currentBook, setCurrentBook] = React.useState({});
  const [openReadBook, setOpenReadBook] = React.useState(false);
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
  const allTopics = t('allTopics');

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
  const handleOpenBook = (book) => {
    setCurrentBook(book);
    setOpenReadBook(true);
  };
  return (
    <PageHelmet title={t('topics')}>
      <Box>
        <Box display="flex" flexDirection="column" alignItems="center" py={2}>
          <Typography variant="subtitle2" py={4}>
            {t('readOurBlog')}
          </Typography>
          <Typography variant="h1" fontWeight={800}>
            {t('teachings').toUpperCase()}
          </Typography>
        </Box>

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
                  <BooksList books={books} onBookClick={handleOpenBook} />
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
            <ViewBook
              open={openReadBook}
              onClose={() => setOpenReadBook(false)}
              book={currentBook}
              fullScreen
            />
          </Grid>
        </Grid>
      </Box>
    </PageHelmet>
  );
};

export default LibraryPage;
