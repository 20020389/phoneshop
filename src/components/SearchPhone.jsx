import { Input, InputGroup, InputRightElement, Portal } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import lodash from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { http } from '../lib/axios';
import { util } from '../lib/util';

export function SearchPhone() {
  const [inSearch, setInSearch] = useState(false);

  /**@type {[SearchData, import('react').Dispatch<import('react').SetStateAction<SearchData>>]}*/
  const [data, setData] = useState({
    phones: [],
    lastCalled: Date.now(),
  });

  /**
   * @param {React.FormEvent<HTMLInputElement>} e
   */
  function searchPhone(e) {
    const value = e.currentTarget.value;
    const now = Date.now();

    if (!value) {
      setData({
        phones: [],
        lastCalled: now,
      });
      return;
    }
    http.get(`/api/phone/search?keyword=${value}&limit=5`).then((res) => {
      setData((prev) => {
        if (prev.lastCalled < now && Array.isArray(res.data?.data)) {
          return {
            phones: res.data?.data,
            lastCalled: now,
          };
        }
        return prev;
      });
    });
  }

  useEffect(() => {
    const handle = (e) => {
      /** @type {HTMLElement} */
      const target = e.target;
      console.log(document.activeElement?.tagName);
      if (
        !target.closest('#search_group') &&
        document.activeElement?.tagName !== 'INPUT' &&
        inSearch
      ) {
        setInSearch(false);
      }
    };
    window.addEventListener('click', handle);

    return () => {
      window.removeEventListener('click', handle);
    };
  }, [inSearch]);

  const renderPhones = useMemo(() => {
    return data.phones.map((phone, index) => {
      const images = JSON.parse(phone.images);
      let offer = {};
      console.log(phone.phoneoffers);
      if (phone.phoneoffers && Array.isArray(phone.phoneoffers)) {
        offer = {
          price: util.formatPrice(
            lodash.min(phone.phoneoffers.map((item) => item.price)).toString()
          ),
          count: phone.phoneoffers.reduce((prev, current) => {
            return prev + current.count;
          }, 0),
        };
      }
      return (
        <Link to={`/phones/${phone.uid}`} className="!contents">
          <div
            className="flex text-gray-700 hover:bg-gray-100"
            onClick={() => setInSearch(false)}
          >
            <div className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] p-2">
              <img src={images[0]} className="object-contain" />
            </div>
            <div className="flex flex-col items-start justify-center py-2">
              <div className="text-[0.9em] font-semibold line-clamp-2">
                {phone.name}
              </div>
              <div className="text-[0.9em] text-gray-500 font-[500]">
                Giá: {offer.price}
              </div>
            </div>
          </div>
        </Link>
      );
    });
  }, [data.lastCalled]);

  return (
    <>
      <InputGroup id="search_group" className="!w-[300px] !h-[43px]">
        <Input
          background="white"
          placeholder="Tìm kiếm..."
          borderWidth="2px"
          _hover={{ borderColor: '#CBD5E0' }}
          _focus={{ boxShadow: 'none', borderColor: '#80befc' }}
          className="!w-full !h-full"
          onFocus={() => setInSearch(true)}
          onInput={searchPhone}
        />
        <InputRightElement className="!h-full">
          <button
            className="w-full h-full flex items-center justify-center 
                    cursor-pointer hover:border-transparent focus-within:outline-none"
          >
            <svg
              viewBox="-1 -1 26 26"
              focusable="false"
              stroke="#9299a6"
              className="w-5 h-5"
            >
              <path
                fill="#9299a6"
                d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"
              ></path>
            </svg>
          </button>
        </InputRightElement>
        <AnimatePresence>
          {inSearch && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              className="absolute top-full left-0 w-full border-[1px] border-gray-300 rounded-[5px] bg-white mt-1 shadow-2xl"
            >
              {renderPhones.length > 0 ? (
                renderPhones
              ) : (
                <div className="min-h-[150px] flex flex-col items-center justify-center">
                  <svg
                    width="64"
                    height="41"
                    viewBox="0 0 64 41"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      transform="translate(0 1)"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <ellipse
                        fill="#f5f5f5"
                        cx="32"
                        cy="33"
                        rx="32"
                        ry="7"
                      ></ellipse>
                      <g fill-rule="nonzero" stroke="#d9d9d9">
                        <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                        <path
                          d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                          fill="#fafafa"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <div className="text-gray-400">Không có dữ liệu</div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </InputGroup>
    </>
  );
}

/*  duration-200 focus-within:!w-[50vw] focus-within:!h-[50px] focus-within:-t-ranslate-x-1/2 focus-within:translate-y-[60px] */
