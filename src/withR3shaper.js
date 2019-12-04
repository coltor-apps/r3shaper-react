import React from 'react';

import { useR3shaper } from './useR3shaper';

export const withR3shaper = (OriginalComponent, resource, options) => props => {
  const r3shaperOptions = useR3shaper(resource, options);

  return <OriginalComponent {...props} {...r3shaperOptions} />;
};
