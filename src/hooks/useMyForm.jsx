import { useRef, useState } from 'react';
import { util } from '../lib/util';

export function useMyForm({ rules, defaultValue } = {}) {
  /**@type {State<DynamicObject>} */
  const [state, setState] = useState({});
  /**@type {State<DynamicObject>} */
  const [error, setError] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const requireProperty = useRef(new Set());

  function register(key, options) {
    const attributes = {
      defaultValue: state[key],
      onChange: (e) => {
        if (e.target.value !== undefined) {
          /**@ts-ignore */
          updateState(key, e.target.value);
        } else {
          updateState(key, e);
        }
        if (error[key]) {
          updateError(key, undefined);
        }
      },
      ['data-input-error']: error[key],
    };

    if (options?.required === true && !requireProperty.current.has(key)) {
      requireProperty.current.add(key);
    } else if (
      options?.required === false &&
      requireProperty.current.has(key)
    ) {
      requireProperty.current.delete(key);
    }

    return attributes;
  }

  function updateState(key, value) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function updateError(key, value) {
    setError((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(callback) {
    return async (e) => {
      let hasError = false;
      e.preventDefault();
      requireProperty.current.forEach((key) => {
        if (state[key] === undefined || state[key] === '') {
          updateError(key, `Trường ${key} không thể bỏ trống`);
          hasError = true;
        }
      });

      if (!hasError) {
        setSubmitting(true);
        const data = callback(state, { setSubmitting });
        if (data?.then) {
          await data;
        }
      }
    };
  }

  return { register, handleSubmit, error, isSubmitting, setSubmitting };
}
