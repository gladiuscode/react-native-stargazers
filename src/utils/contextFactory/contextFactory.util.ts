import {createContext, useContext} from 'react';

/**
 * This function takes care of initializing a context and a hook
 * that wraps the inner useContext call, so we don't pollute our
 * codebase with multiple imports.
 * @param context
 */
const contextFactory = <T>(context: string) => {
  const Context = createContext<T | null>(null);

  const useCtx = () => {
    const ctx = useContext(Context);
    if (!ctx) {
      throw new Error(`${context} is not initialized yet`);
    }

    return ctx;
  };

  return [useCtx, Context.Provider] as const;
};

export default contextFactory;
