import { useEffect, useRef, useState } from 'react';

/**
 * @param {{ autoRevoke?: boolean }} p
 * @returns {UseUpload}
 */
export function useUpload({ autoRevoke } = { autoRevoke: true }) {
  const [listen, setListen] = useState(null);
  const imageRef = useRef(document.createElement('input'));
  const avatarRef = useRef(null);

  /** @type {State<Partial<ImageData>[]>} */
  const [image, setImage] = useState([]);
  useEffect(() => {
    imageRef.current.type = 'file';
    imageRef.current.accept = 'image/*';
    imageRef.current.multiple = true;
    function hanle(e) {
      /**@type {HTMLInputElement} */
      const target = e.target;

      if (target.files.length > 0) {
        setImage(() => {
          const list = [];
          for (let file of target.files) {
            list.push({
              file: file,
              src: URL.createObjectURL(file),
            });
          }
          return updateImage(list);
        });

        if (avatarRef.current) {
          avatarRef.current.setAttribute('data-loaded', 'true');
        }
      } else {
        setImage(updateImage([]));

        if (avatarRef.current) {
          avatarRef.current.removeAttribute('data-loaded');
        }
      }
    }

    imageRef.current.addEventListener('input', hanle);

    return () => {
      imageRef.current.removeEventListener('input', hanle);
    };
  }, [imageRef.current, listen]);

  useEffect(() => {
    return () => {
      image.forEach((item) => {
        if (item.src) {
          URL.revokeObjectURL(item.src);
        }
      });
    };
  }, []);

  function picker(e) {
    e.stopPropagation();
    imageRef.current.click();
  }

  function onChange(callback) {
    setListen((prev) => callback);
    return () => {
      setListen((prev) => null);
    };
  }

  function updateImage(img) {
    listen && listen(img);
    return img;
  }

  return {
    ref: avatarRef,
    image,
    picker,
    onChange,
  };
}
