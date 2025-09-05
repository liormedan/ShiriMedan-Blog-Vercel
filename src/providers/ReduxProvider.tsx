"use client";
import { Provider } from 'react-redux';
import { store } from '@/src/store/store';
import { Theme } from '@radix-ui/themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Theme>{children}</Theme>
    </Provider>
  );
}

export default Providers;

