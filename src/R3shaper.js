import React from 'react';

import { useR3shaper } from './useR3shaper';

export function R3shaper({
  resource,
  debounce = 0,
  throttle = 0,
  manual = false,
  children,
  ...props
}) {
  const { dispatch, response, loading, error } = useR3shaper(resource, {
    debounce,
    throttle,
    manual
  });

  const RenderChildren = children;

  return (
    <RenderChildren
      dispatch={dispatch}
      response={response}
      loading={loading}
      error={error}
      {...props}
    />
  );
}
