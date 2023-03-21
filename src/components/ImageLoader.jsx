import { Skeleton, styled } from '@chakra-ui/react';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { IoImage } from 'react-icons/io5';

const ImageLoader = forwardRef(
  /**
   *
   * @param {ImageProps} props
   * @param {import('react').ForwardedRef<HTMLDivElement>} imageRef
   * @returns
   */
  (props, imageRef) => {
    const { src, className, onClick, width, height, style, children } = props;
    const ref = useRef(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    function loadUrl(element, url) {
      return new Promise((resolve, reject) => {
        let newUrl = url;
        if (width !== undefined && height !== undefined) {
          newUrl += `?width=${width}&height=${height}`;
        } else if (width) {
          newUrl += `?width=${width}`;
        } else if (height) {
          newUrl += `?height=${height}`;
        }

        element.onload = () => resolve();
        element.onerror = (e) => reject(e);
        element.src = newUrl;
      });
    }

    useEffect(() => {
      setError(false);
      setLoading(true);
      if (ref.current) {
        loadUrl(ref.current, src)
          .then(() => setLoading(false))
          .catch(() => {
            setError(true);
            setLoading(false);
          });
      }
    }, [src]);

    useImperativeHandle(imageRef, () => ref.current);

    return (
      <Base className={className} onClick={onClick} style={style}>
        <img
          ref={ref}
          className={`w-full h-full bg-transparent object-contain`}
          alt="load failed"
        />
        {isLoading && (
          <Skeleton css={{ position: 'absolute', left: 0, top: 0 }} />
        )}
        {error && (
          <Placeholder>
            <IoImage className="w-full h-full opacity-50" />
          </Placeholder>
        )}
        {children}
      </Base>
    );
  }
);

const Base = styled('div', {
  baseStyle: {
    position: 'relative',
    bg: 'inherit',
    w: '100%',
    h: '100%',
  },
});

const Placeholder = styled('div', {
  baseStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    w: '100%',
    h: '100%',
    background: '#f8fafb',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10%',
    color: 'gray',
  },
});

ImageLoader.displayName = 'ImageLoader';

export default ImageLoader;
