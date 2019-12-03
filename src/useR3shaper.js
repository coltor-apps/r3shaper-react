import { useState, useEffect } from 'react';
import debounce from 'p-debounce';
import throttle from 'p-throttle';

export function useR3shaper(
  resource,
  {
    debounce: debounceTime = 0,
    throttle: throttleTime = 0,
    manual = false
  } = {}
) {
  const [r3shaperOptions, setR3shaperOptions] = useState({
    loading: false,
    error: null,
    response: null
  });

  const responseReducer = (oldData, newData) => newData;

  const dispatchRequest = (options, reducer = responseReducer) =>
    resource(options)
      .then(data => {
        setR3shaperOptions({
          loading: false,
          error: null,
          response: reducer(r3shaperOptions.response, data)
        });
      })
      .catch(error => {
        setR3shaperOptions({
          ...r3shaperOptions,
          error,
          loading: false
        });
      });

  const dispatchWrapped = debounce(
    throttle(dispatchRequest, 1, throttleTime),
    debounceTime
  );

  useEffect(() => {
    if (!manual) {
      dispatchWrapped();
    }
  }, [manual]);

  return {
    response: r3shaperOptions.response,
    error: r3shaperOptions.error,
    loading: r3shaperOptions.loading,
    dispatch: dispatchWrapped
  };
}
