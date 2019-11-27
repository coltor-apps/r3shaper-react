import { useState, useEffect } from 'react';
import debounce from 'p-debounce';
import throttle from 'p-throttle';

export function useR3shaper(
  dispatch,
  initialRequestOptions = {},
  options = { debounce: 0, throttle: 0 }
) {
  const [r3shaperOptions, setR3shaperOptions] = useState({
    loading: false,
    error: null,
    response: null
  });

  const [requestOptions, setRequestOptions] = useState(initialRequestOptions);

  useEffect(() => {
    setR3shaperOptions({ ...r3shaperOptions, loading: true });

    dispatch(requestOptions)
      .then(data => {
        setR3shaperOptions({
          ...r3shaperOptions,
          response: data,
          error: null,
          loading: false
        });
      })
      .catch(e => {
        setR3shaperOptions({
          ...r3shaperOptions,
          error: e,
          loading: false
        });
      });
  }, [requestOptions]);

  return {
    response: r3shaperOptions.response,
    error: r3shaperOptions.error,
    loading: r3shaperOptions.loading,
    dispatchRequest: debounce(
      throttle(setRequestOptions, 1, options.throttle),
      options.debounce
    )
  };
}
