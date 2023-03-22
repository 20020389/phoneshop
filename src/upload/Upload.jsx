import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { useUpload } from '../hooks/useUpload';
import { uploadFile } from '../lib/upload';

/**@param {UploadImageProps} p */
function Upload({ onChange, defaultValue }, ref) {
  /**@type {State<Array<any>>} */
  const [list, setList] = useState(defaultValue ?? []);
  const [task, setTask] = useState([]);
  const [uploading, setUploading] = useState(false);

  const { picker, onChange: onImageChanged } = useUpload();

  useImperativeHandle(ref, () => ({
    submit,
  }));

  useEffect(() => {
    const unlisten = onImageChanged((e) => {
      setList((prev) => [...prev, ...e]);
    });

    return () => {
      unlisten();
    };
  }, []);

  useEffect(() => {
    onChange && onChange(list);
  }, [list, list.length]);

  function submit() {
    setTask(new Array(list.length).fill(0));
    setUploading(true);
    return Promise.all(
      list.map((item, index) => {
        return uploadFile(item.file).then((res) => {
          setTask((prev) => {
            const newList = [...prev];
            newList[index] = 100;
            return newList;
          });
          return res;
        });
      })
    ).then((res) => {
      setTimeout(() => {
        setUploading(false);
      }, 1000);
      return res;
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {list.map((item, index) => (
        <div
          key={item?.src}
          className="w-24 h-24 text-[0.9em] relative flex flex-col items-center justify-center gap-1 border-[2px] border-dashed rounded-[2px] p-2"
        >
          <img className="w-full h-full" src={item?.src} alt="" />
          {uploading && (
            <div className="absolute bottom-[2px] left-2 bg-gray-300 w-[calc(100%_-_1rem)] h-[4px]">
              <div
                className="h-full bg-blue-400 duration-[300ms]"
                style={{
                  width: `${task[index] ?? 0}%`,
                }}
              />
            </div>
          )}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-2 bg-[rgba(0,_0,_0,_0.4)] duration-[200ms] opacity-0 hover:opacity-100">
            <button
              className="text-white hover:text-blue-400 p-3"
              type="button"
              onClick={() => {
                setList((prev) => {
                  try {
                    URL.revokeObjectURL(item?.src);
                  } catch (error) {
                    console.log(error);
                  }
                  return prev.filter((i) => i !== item);
                });
              }}
            >
              <FaTrashAlt fontSize="1em" />
            </button>
          </div>
        </div>
      ))}
      {list.length < 6 && (
        <button
          className="w-24 h-24 text-[0.9em] flex flex-col items-center justify-center gap-1 border-[2px] border-dashed rounded-[2px]"
          type="button"
          onClick={picker}
          disabled={uploading}
        >
          <IoMdAdd />
          Thêm ảnh
        </button>
      )}
    </div>
  );
}

const UploadImage = forwardRef(Upload);

UploadImage.displayName = 'UploadImage';

export { UploadImage };
