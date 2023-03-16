import { useState, useRef, useEffect } from 'react';

function random() {
  return Math.floor(Math.random() * 1000);
}

export function useKey(value) {
  const [key, setKey] = useState(random());

  const mount = useRef(false);

  useEffect(() => {
    if (!mount.current) {
      mount.current = true;
    } else if (!!value === false) {
      setKey(random());
    }
  }, [value]);

  return key;
}
