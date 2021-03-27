import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const useBufferedTweets = (url) => {
  const { error, data } = useSWR(url, fetcher, {
    refreshInterval: 3000,
  });
  let [buffer, setBuffer] = useState(data);
  if (data && !buffer) setBuffer(data);

  return {
    data: buffer,
    error,
    stale: buffer !== data,
    update: () => setBuffer(data),
  };
};

export default useBufferedTweets;
