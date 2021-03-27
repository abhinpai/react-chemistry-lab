import React, { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const useBufferedTweets = (url) => {
  const mainRef = React.useRef(null);
  const { error, data } = useSWR(url, fetcher, {
    refreshInterval: 3000,
  });
  let [buffer, setBuffer] = useState(data);
  if (data && !buffer) setBuffer(data);

  const updateContent = () => {
    setBuffer(data);
    console.log(mainRef.current.offsetTop);
    mainRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return {
    mainRef,
    data: buffer,
    error,
    stale: buffer !== data,
    update: updateContent,
  };
};

export default useBufferedTweets;
