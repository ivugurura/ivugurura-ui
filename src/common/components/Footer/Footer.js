import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { ColumnToRow, Item } from '@mui-treasury/components/flex';
import {
  CategoryProvider,
  CategoryTitle,
  CategoryItem,
} from '@mui-treasury/components/menu/category';
import {
  SocialProvider,
  SocialLink,
} from '@mui-treasury/components/socialLink';
// import Box from '@mui-ui/material/Box';
// import Container from '@mui-ui/material/Container';
// import Divider from '@mui-ui/material/Divider';
// import Grid from '@mui-ui/material/Grid';
// import { makeStyles } from '@mui-ui/material/styles';
// import Typography from '@mui-ui/material/Typography';
// import { useSelector } from 'react-redux';
// import { Link as RouterLink } from 'react-router-dom';
// import { getCategories } from 'redux/actions/category';
// import { getProducts } from 'redux/actions/product';
// import { NavMenu, NavItem } from '@mui-treasury/components/menu/navigation';
import { useMagCategoryMenuStyles } from '@mui-treasury/styles/categoryMenu/mag';
import { usePoofSocialLinkStyles } from '@mui-treasury/styles/socialLink/poof';
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
// import { usePlainNavigationMenuStyles } from '@mui-treasury/styles/navigationMenu/plain';
// import { useTranslation } from 'react-i18next';
// import { Loading } from 'components/Loading';
// import { NoDisplayData } from 'components/NoDisplayData';
// import { styles } from '../styles/navStyles';

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    marginBottom: 0,
  },
  top: {
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
  middle: {
    backgroundColor: palette?.type === 'dark' ? '#192D36' : palette?.action?.hover,
  },
  bottom: {
    backgroundColor:
      palette?.type === 'dark' ? '#0F2128' : palette?.action?.selected,
  },
  newsletterText: {
    color: '#fff',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
  },
  form: {
    margin: 0,
    minWidth: 343,
    fontSize: '0.875rem',
  },
  legalLink: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '0.75rem',
    justifyContent: 'center',
    color: palette?.text?.hint,
    letterSpacing: '0.5px',
  },
  divider: {
    height: 2,
    margin: '-1px 0',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    filter: 'grayscale(80%)',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  info: {
    ...typography?.caption,
    color: palette?.text?.hint,
    marginTop: 8,
  },
}));

const Footer = React.memo(() => {
//   const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box width="100%" className={classes.root}>
      <Box className={classes.middle} px={2} py={10}>
        <Container disableGutters>
          <Grid container spacing={4}>
            <Grid item lg={3} md={4} xs={12}>
              <Box
                alt=""
                borderRadius={12}
                component="img"
                height={64}
                mt={-3}
                src="/images/HDI_logo.png"
                width={120}
              />
              <div className={classes.info}>
                <Typography index={1}>Kicukiro, 3530, Kigali Rwanda</Typography>
              </div>

              <div className={classes.info}>
                <Typography index={1}>admin@kumbe.rw</Typography>
              </div>
            </Grid>
            <Grid item lg={6} md={8} xs={12}>
              <Grid container spacing={2}>
                <Grid item sm={4} xs={6}>
                  <CategoryProvider>
                    <CategoryTitle>
                      <Typography>t(top_bar:services)</Typography>
                    </CategoryTitle>
                    {/* {loading ? (
                      <Loading />
                    ) : products.length ? (
                      products.map(({ name, id }) => (
                        <CategoryItem key={id}>
                          <Typography>{name}</Typography>
                        </CategoryItem>
                      ))
                    ) : (
                      <NoDisplayData />
                    )} */}
                  </CategoryProvider>
                </Grid>
                <Grid item sm={4} xs={6}>
                  <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                    <CategoryTitle>
                      <Typography>t(top_bar:popularcategories)</Typography>
                    </CategoryTitle>
                    {/* {categoryLoad ? (
                      <Loading />
                    ) : categories.length ? (
                      categories.map(({ name, id }, index) => (
                        <CategoryItem as="div" index={id} key={index}>
                          <Typography
                            component={RouterLink}
                            to={`/blogs/categories/${id}`}
                          >
                            {name}
                          </Typography>
                        </CategoryItem>
                      ))
                    ) : (
                      <NoDisplayData />
                    )} */}
                  </CategoryProvider>
                </Grid>
                <Grid item sm={4} xs={6}>
                  <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                    <CategoryTitle>
                      <Typography>t(top_bar:infotitle)</Typography>
                    </CategoryTitle>
                    <CategoryItem as="div">
                      <Typography to="/about">
                        t(top_bar:about)
                      </Typography>
                    </CategoryItem>
                    <CategoryItem as="div">
                      <Typography to="/faq">
                        t(top_bar:faq)
                      </Typography>
                    </CategoryItem>
                  </CategoryProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={3} md={8} style={{ marginLeft: 'auto' }} xs={12}>
              <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                <CategoryTitle>
                  <Typography>
                    t(top_bar:follow_social_media)
                    {' '}
                    - Kumbe
                  </Typography>
                </CategoryTitle>
              </CategoryProvider>
              <SocialProvider useStyles={usePoofSocialLinkStyles}>
                <SocialLink
                  brand="Facebook"
                  href="https://www.facebook.com/Kumbe-Youth-101650741749626"
                />
                <SocialLink
                  brand="Instagram"
                  href="https://www.instagram.com/kumbe_youth/"
                />
              </SocialProvider>
              <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                <CategoryTitle>
                  <Typography>
                    t(top_bar:follow_social_media)
                    {' '}
                    - HDI
                  </Typography>
                </CategoryTitle>
              </CategoryProvider>
              <SocialProvider useStyles={usePoofSocialLinkStyles}>
                <SocialLink
                  brand="Facebook"
                  href="https://www.facebook.com/HDIRwanda"
                />
                <SocialLink
                  brand="Instagram"
                  href="https://www.instagram.com/hdirwanda/"
                />
                <SocialLink
                  brand="Twitter"
                  href="https://twitter.com/HDIRwanda"
                />
              </SocialProvider>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container disableGutters>
        <Divider className={classes.divider} />
      </Container>
      <Box className={classes.bottom} px={2} py={3}>
        <Container disableGutters>
          <ColumnToRow
            at="md"
            columnStyle={{ alignItems: 'center' }}
            rowStyle={{ alignItems: 'unset' }}
          >
            {/* <Item grow ml={-2} shrink={0}>
              <NavMenu useStyles={usePlainNavigationMenuStyles}>
                <ColumnToRow at={'sm'}>
                  <NavItem className={classes.legalLink}>
                    <Typography>{t('top_bar:terms')}</Typography>
                  </NavItem>
                  <NavItem className={classes.legalLink}>
                    <Typography>{t('top_bar:privacy')}</Typography>
                  </NavItem>
                </ColumnToRow>
              </NavMenu>
            </Item> */}
            <Item>
              <Box py={1} textAlign={{ xs: 'center', md: 'right' }}>
                <Typography
                  color="textSecondary"
                  component="div"
                  variant="caption"
                >
                  <Typography index={1}>
                    © HDI Rwanda 2020
                    {' '}
                    t(top_bar:copyright)
                  </Typography>
                </Typography>
              </Box>
            </Item>
          </ColumnToRow>
        </Container>
      </Box>
    </Box>
  );
});

export default Footer;
