import { useRef, useState } from 'react';
import { util } from '../lib/util';

/**
 * @param {{
 *    rules?: DynamicObject;
 *    defaultValue?: DynamicObject
 * }} param0
 */
export function useMyForm({ rules, defaultValue } = {}) {
  /**@type {State<DynamicObject>} */
  const [state, setState] = useState(defaultValue ?? {});
  /**@type {State<DynamicObject>} */
  const [error, setError] = useState({});
  /**@type {React.MutableRefObject<DynamicObject>} */
  const stateOptions = useRef({});
  const [isSubmitting, setSubmitting] = useState(false);
  const requireProperty = useRef(new Set());

  /**@type {RegisterField} */
  function register(key, options = {}) {
    stateOptions.current[key] = options;
    const attributes = {
      defaultValue: options?.defaultValue ?? state[key],
      onChange: (e) => {
        if (e?.target?.value !== undefined) {
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

  function handleSubmit(callback, throwError) {
    /**
     * @param {import('react').FormEvent} e
     */
    return async (e) => {
      let hasError = false;
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      requireProperty.current.forEach((key) => {
        const options = stateOptions.current[key] ?? {};
        if (state[key] === undefined || state[key] === '') {
          updateError(key, `Trường ${options.name ?? key} không thể bỏ trống`);
          hasError = true;
        }
      });

      if (!hasError) {
        setSubmitting(true);
        const data = callback(state, { setSubmitting });
        if (data?.then) {
          await data;
        }
      } else if (throwError) {
        throw new Error('Form error');
      }
    };
  }

  return {
    register,
    handleSubmit,
    error,
    isSubmitting,
    setSubmitting,
    setValue: updateState,
    values: state,
  };
}
