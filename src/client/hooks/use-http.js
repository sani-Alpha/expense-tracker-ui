import {useState, useCallback} from 'react';

/**
 * @option {Object} - contains url, headers, method and body
 * @callback {method} - to send data back to parent invocation
 */
const useHTTP = callback => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = useCallback(
    async options => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(options.url, {
          method: options?.method ? options.method : 'GET',
          body: options?.body ? JSON.stringify(options.body) : null,
          headers: options?.headers ? options.headers : {}
        });

        if (!response.ok) {
          throw new Error('Request failed!');
        }

        const data = await response.json();
        callback(data);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    [callback]
  );

  return {isLoading, error, makeRequest};
};

export default useHTTP;
