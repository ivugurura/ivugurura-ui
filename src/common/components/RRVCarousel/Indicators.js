/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
import React, { useCallback, useMemo } from 'react';

import {
  StyledFiberManualRecordIcon,
  StyledIndicatorIconButton,
  StyledIndicators,
} from './Styled';

export const Indicators = (props = {}) => {
  const IndicatorIcon = useMemo(
    () =>
      props.IndicatorIcon !== undefined ? (
        props.IndicatorIcon
      ) : (
        <StyledFiberManualRecordIcon />
      ),
    [props.IndicatorIcon],
  );

  const completeListIfRequired = useCallback(
    (arrayOfIcons) => {
      while (arrayOfIcons.length < props.length) {
        let index = 0;
        arrayOfIcons.push(arrayOfIcons[index]);
        index += 1;
      }
    },
    [props.length],
  );

  const {
    className: indicatorIconButtonClass,
    style: indicatorIconButtonStyle,
    ...indicatorIconButtonProps
  } = props.indicatorIconButtonProps;
  const {
    className: activeIndicatorIconButtonClass,
    style: activeIndicatorIconButtonStyle,
    ...activeIndicatorIconButtonProps
  } = props.activeIndicatorIconButtonProps;

  const indicators = [];

  for (let i = 0; i < props.length; i++) {
    const className =
      i === props.active
        ? `${indicatorIconButtonClass} ${activeIndicatorIconButtonClass}`
        : `${indicatorIconButtonClass}`;

    const style =
      i === props.active
        ? {
            ...indicatorIconButtonStyle,
            ...activeIndicatorIconButtonStyle,
          }
        : indicatorIconButtonStyle;

    const restProps =
      i === props.active
        ? {
            ...indicatorIconButtonProps,
            ...activeIndicatorIconButtonProps,
          }
        : indicatorIconButtonProps;

    if (restProps['aria-label'] === undefined)
      restProps['aria-label'] = 'carousel indicator';

    const createIndicator = (TheIndicatorIcon) => {
      return (
        <StyledIndicatorIconButton
          $active={i === props.active}
          key={i}
          className={className}
          style={style}
          onClick={() => {
            props.press(i);
          }}
          {...restProps}
          aria-label={`${restProps['aria-label']} ${i + 1}`}
        >
          {TheIndicatorIcon}
        </StyledIndicatorIconButton>
      );
    };

    Array.isArray(IndicatorIcon)
      ? indicators.push(createIndicator(IndicatorIcon[i])) &&
        completeListIfRequired(IndicatorIcon)
      : indicators.push(createIndicator(IndicatorIcon));
  }

  const {
    className: indicatorContainerClass,
    style: indicatorContainerStyle,
    ...indicatorContainerProps
  } = props.indicatorContainerProps;

  return (
    <StyledIndicators
      className={indicatorContainerClass}
      style={indicatorContainerStyle}
      {...indicatorContainerProps}
    >
      {indicators}
    </StyledIndicators>
  );
};
