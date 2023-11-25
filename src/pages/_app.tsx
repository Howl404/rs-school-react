import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { wrapper } from 'src/store';

import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';

import './_app.scss';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}
