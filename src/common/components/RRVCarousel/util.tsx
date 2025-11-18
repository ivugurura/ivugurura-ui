import React, { useEffect, useRef } from 'react';

import { NavigateBefore, NavigateNext } from '@mui/icons-material';



export const sanitizeNavProps: React.FC<SanitizeProps> = (props) => {
  const { className, style, ...rest } = props || {};

  return props !== undefined
    ? {
        style: style !== undefined ? style : {},
        className: className !== undefined ? className : '',
        ...rest,
      }
    : { style: {}, className: '', ...rest };
};

interface  SanitizeProps {
sx?: object;
className?: string;
children?: React.ReactNode | React.ReactNode[];

height?: string | number;

index?: number;
strictIndexing?: boolean;

autoPlay?: boolean;
stopAutoPlayOnHover?:boolean;
interval?:number;

animation?: 'fade' | "slide" ;
duration?: number;
swipe?: boolean;

navButtonsAlwaysInvisible?: boolean;
navButtonsAlwaysVisible?: boolean;
cycleNavigation?: boolean;
fullHeightHover?: boolean;

navButtonsWrapperProps?: SanitizeNavProps;
navButtonsProps?: SanitizeNavProps;
NavButton?: React.ReactNode;

NextIcon?: React.ReactNode;
PrevIcon?: React.ReactNode;

indicators?: boolean;
indicatorContainerProps?: SanitizeNavProps;
indicatorIconButtonProps?:SanitizeNavProps;
activeIndicatorIconButtonProps?: SanitizeNavProps;
IndicatorIcon?: React.ReactNode | React.ReactNode[];

onChange?: () => void;
changeOnFirstRender?: boolean;
next?: () => void;
prev?: () => void;

}

const noop = () => {
  //Empty function
}

export const sanitizeProps: React.FC<SanitizeProps> = (props = {}) => {
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

    onChange: props.onChange !== undefined ? props.onChange : noop,
    changeOnFirstRender:
      props.changeOnFirstRender !== undefined
        ? props.changeOnFirstRender
        : false,
    next: props.next !== undefined ? props.next : noop,
    prev: props.prev !== undefined ? props.prev : noop,
  };
};

export const useInterval = (callback = noop, delay = 1) => {
  const savedCallback = useRef(noop);

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

    return noop;
  }, [delay]);
};
