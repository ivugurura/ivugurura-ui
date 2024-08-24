/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef } from 'react';

import { NavigateBefore, NavigateNext } from '@mui/icons-material';

export const sanitizeNavProps = (props) => {
  const { className, style, ...rest } = props || {};

  return props !== undefined
    ? {
        style: props.style !== undefined ? props.style : {},
        className: props.className !== undefined ? props.className : '',
        ...rest,
      }
    : { style: {}, className: '', ...rest };
};

export const sanitizeProps = (props = {}) => {
  const animation = props.animation !== undefined ? props.animation : 'fade';
  const duration =
    props.duration !== undefined
      ? props.duration
      : animation === 'fade'
        ? 500
        : 200;

  return {
    sx: props.sx !== undefined ? props.sx : {},
    className: props.className !== undefined ? props.className : '',
    children: props.children ? props.children : [],

    height: props.height,

    index: props.index !== undefined ? props.index : 0,
    strictIndexing:
      props.strictIndexing !== undefined ? props.strictIndexing : true,

    autoPlay: props.autoPlay !== undefined ? props.autoPlay : true,
    stopAutoPlayOnHover:
      props.stopAutoPlayOnHover !== undefined
        ? props.stopAutoPlayOnHover
        : true,
    interval: props.interval !== undefined ? props.interval : 4000,

    animation,
    duration,

    swipe: props.swipe !== undefined ? props.swipe : true,

    navButtonsAlwaysInvisible:
      props.navButtonsAlwaysInvisible !== undefined
        ? props.navButtonsAlwaysInvisible
        : false,
    navButtonsAlwaysVisible:
      props.navButtonsAlwaysVisible !== undefined
        ? props.navButtonsAlwaysVisible
        : false,
    cycleNavigation:
      props.cycleNavigation !== undefined ? props.cycleNavigation : true,
    fullHeightHover:
      props.fullHeightHover !== undefined ? props.fullHeightHover : true,
    navButtonsWrapperProps: sanitizeNavProps(props.navButtonsWrapperProps),
    navButtonsProps: sanitizeNavProps(props.navButtonsProps),
    NavButton: props.NavButton,

    NextIcon: props.NextIcon !== undefined ? props.NextIcon : <NavigateNext />,
    PrevIcon:
      props.PrevIcon !== undefined ? props.PrevIcon : <NavigateBefore />,

    indicators: props.indicators !== undefined ? props.indicators : true,
    indicatorContainerProps: sanitizeNavProps(props.indicatorContainerProps),
    indicatorIconButtonProps: sanitizeNavProps(props.indicatorIconButtonProps),
    activeIndicatorIconButtonProps: sanitizeNavProps(
      props.activeIndicatorIconButtonProps,
    ),
    IndicatorIcon: props.IndicatorIcon,

    onChange: props.onChange !== undefined ? props.onChange : () => {},
    changeOnFirstRender:
      props.changeOnFirstRender !== undefined
        ? props.changeOnFirstRender
        : false,
    next: props.next !== undefined ? props.next : () => {},
    prev: props.prev !== undefined ? props.prev : () => {},
  };
};

export const useInterval = (callback = () => {}, delay = 1) => {
  const savedCallback = useRef(() => {});

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }

    return () => {};
  }, [delay]);
};
