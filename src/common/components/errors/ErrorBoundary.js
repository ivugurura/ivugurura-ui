/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
import React from 'react';

import { Button, Typography } from '@mui/material';

export const isErrorLike = (value) => typeof value === 'object' && value !== null && ('stack' in value || 'message' in value) && !('__typename' in value);
const isWebpackChunkError = (value) => isErrorLike(value) && (value.name === 'ChunkLoadError' || /loading css chunk/gi.test(value.message));
const asError = (value) => {
  if (value instanceof Error) {
    return value;
  }
  if (isErrorLike(value)) {
    return Object.assign(new Error(value.message), value);
  }
  return new Error(String(value));
};

export class ErrorBoundary extends React.PureComponent {
  // eslint-disable-next-line react/state-in-constructor
  state = {};

  static getDerivedStateFromError(error) {
    return { error: asError(error) };
  }

  componentDidUpdate(previousProps) {
    const { location } = this.props;
    if (previousProps.location !== location) {
      this.setState({ error: undefined });
    }
  }

  onReloadClick() {
    window.location.reload(); // hard page reload
  }

  render() {
    const { error } = this.state;
    const { render, extraContext, children } = this.props;
    if (error !== undefined) {
      if (isWebpackChunkError(error)) {
        return (
          <div className="container">
            <Typography>A new version of The SITE is available.</Typography>
            <Button onClick={this.onReloadClick} variant="primary">
              Reload to update
            </Button>
          </div>
        );
      }
      if (render) {
        return render(error);
      }
      return (
        <div className="container">
          <Typography>
            The SITE encountered an unexpected error. If reloading the page does not fix it,
            contact your site admin or The SITE support.
          </Typography>
          <Typography>
            <Typography className="text-wrap">{error.message}</Typography>
          </Typography>
          {extraContext}
        </div>
      );
    }
    return children;
  }
}
