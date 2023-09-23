import * as React from 'react';

import {
  Breadcrumbs, Button, Chip, Typography,
} from '@mui/material';
import { emphasize, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// import { BreadcrumbMenu } from './BreadcrumbMenu';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.mode === 'light'
    ? theme.palette.grey[100]
    : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export const RRVBreadcrumbs = ({ crumbs = [] }) => (
  <div style={{ width: '100%', backgroundColor: '#f5f5f5' }}>
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      {crumbs.map((crumb, index) => {
        const {
          name, route, primaryIcon: Icon, secondaryIcon: SecondaryIcon,
        } = crumb;
        const isLast = index === crumbs.length - 1;
        const LastComponent = crumb.onClick ? Button : Typography;
        return isLast ? (
          <Typography key={name} color="textPrimary" component={LastComponent} onClick={crumb.onClick}>
            {name}
          </Typography>
        ) : (
          <StyledBreadcrumb
            key={name}
            label={name}
            component={Link}
            to={route}
            icon={Icon ? <Icon fontSize="small" /> : null}
            deleteIcon={SecondaryIcon ? <SecondaryIcon fontSize="small" /> : null}
          />
        );
      })}
    </Breadcrumbs>
  </div>
);
//   <div style={{ width: '100%', backgroundColor: '#f5f5f5' }}>
//     <Breadcrumbs aria-label="breadcrumb">
//       <StyledBreadcrumb
//         component="a"
//         href="#"
//         label="Home"
//         icon={<HomeIcon fontSize="small" />}
//       />
//       <StyledBreadcrumb component="a" href="#" label="Catalog" />
//       <StyledBreadcrumb
//         label="Accessories"
//         deleteIcon={<ExpandMoreIcon />}
//         onDelete={handleClick}
//       />
//     </Breadcrumbs>
//   </div>
// );
