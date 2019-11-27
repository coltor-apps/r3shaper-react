import React from 'react';

import { useR3shaper } from './useR3shaper';

export const withR3shaper = (
  OriginalComponent,
  resource,
  resourceOptions,
  options
) => props => {
  const r3shaperOptions = useR3shaper(resource, resourceOptions, options);

  return <OriginalComponent {...props} {...r3shaperOptions} />;
};
