import { useState, useEffect, useCallback, useRef } from 'react';

type ParamConfig<T> = {
  key: string;
  defaultValue: T;
  parse: (value: string) => T;
  serialize: (value: T) => string;
};

/**
 * Hook to sync state with URL search params.
 * On mount, reads URLSearchParams to pre-fill values.
 * On change, uses replaceState to update the URL without navigation.
 */
export function useUrlParam<T>(config: ParamConfig<T>): [T, (val: T) => void] {
  const { key, defaultValue, parse, serialize } = config;
  const isInitialized = useRef(false);

  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;
    const params = new URLSearchParams(window.location.search);
    const raw = params.get(key);
    if (raw !== null) {
      try {
        return parse(raw);
      } catch {
        return defaultValue;
      }
    }
    return defaultValue;
  });

  // Sync to URL on change (skip initial mount to avoid replacing URL on page load with defaults)
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const serialized = serialize(value);
    if (serialized && serialized !== serialize(defaultValue)) {
      params.set(key, serialized);
    } else {
      params.delete(key);
    }
    const newSearch = params.toString();
    const newUrl = window.location.pathname + (newSearch ? '?' + newSearch : '');
    window.history.replaceState(null, '', newUrl);
  }, [value, key, serialize, defaultValue]);

  return [value, setValue];
}

// Convenience helpers for common param types
export function stringParam(key: string, defaultValue: string = ''): ParamConfig<string> {
  return {
    key,
    defaultValue,
    parse: (v) => v,
    serialize: (v) => v,
  };
}

export function numberParam(key: string, defaultValue: number = 0): ParamConfig<number> {
  return {
    key,
    defaultValue,
    parse: (v) => {
      const n = parseFloat(v);
      return isNaN(n) ? defaultValue : n;
    },
    serialize: (v) => (v === defaultValue ? '' : String(v)),
  };
}
