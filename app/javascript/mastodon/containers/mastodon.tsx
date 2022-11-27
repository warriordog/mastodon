import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { addLocaleData, IntlProvider } from 'react-intl';
import { Provider as ReduxProvider, ReactReduxContextValue } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import UI from 'mastodon/features/ui';
import { fetchCustomEmojis } from 'mastodon/actions/custom_emojis';
import { hydrateStore } from 'mastodon/actions/store';
import { connectUserStream } from 'mastodon/actions/streaming';
import ErrorBoundary from 'mastodon/components/error_boundary';
import initialState, { title as siteTitle } from 'mastodon/initial_state';
import { getLocale } from 'mastodon/locales';
import { RootState, store } from '../store/configureStore';

const { localeData, messages } = getLocale();
addLocaleData(localeData);

const title = process.env.NODE_ENV === 'production' ? siteTitle : `${siteTitle} (Dev)`;

// export const store = configureStore();
const hydrateAction = hydrateStore(initialState);

store.dispatch(hydrateAction);
store.dispatch(fetchCustomEmojis());

/**
 * Global context, available anywhere in mastodon SPA
 */
export type RootContext = MastodonContext & ReactReduxContextValue<RootState>;

interface MastodonContext {
  readonly identity: ReturnType<typeof createIdentityContext>;
}

const createIdentityContext = (state) => ({
  signedIn: !!state.meta.me,
  accountId: state.meta.me,
  disabledAccountId: state.meta.disabled_account_id,
  accessToken: state.meta.access_token,
  permissions: state.role ? state.role.permissions : 0,
});

export interface MastodonProps {
  readonly locale: string;
}

export default class Mastodon extends React.PureComponent<MastodonProps> {

  static propTypes = {
    locale: PropTypes.string.isRequired,
  };

  static childContextTypes = {
    identity: PropTypes.shape({
      signedIn: PropTypes.bool.isRequired,
      accountId: PropTypes.string,
      disabledAccountId: PropTypes.string,
      accessToken: PropTypes.string,
    }).isRequired,
  };

  identity = createIdentityContext(initialState);
  disconnect?: () => void = null;

  getChildContext(): MastodonContext {
    return {
      identity: this.identity,
    };
  }

  componentDidMount() {
    if (this.identity.signedIn) {
      this.disconnect = store.dispatch(connectUserStream());
    }
  }

  componentWillUnmount () {
    if (this.disconnect) {
      this.disconnect();
      this.disconnect = null;
    }
  }

  shouldUpdateScroll (prevRouterProps, { location }) {
    return !(location.state?.mastodonModalKey && location.state?.mastodonModalKey !== prevRouterProps?.location?.state?.mastodonModalKey);
  }

  render () {
    const { locale } = this.props;

    return (
      <IntlProvider locale={locale} messages={messages}>
        <ReduxProvider store={store}>
          <ErrorBoundary>
            <BrowserRouter>
              <ScrollContext shouldUpdateScroll={this.shouldUpdateScroll}>
                <Route path='/' component={UI} />
              </ScrollContext>
            </BrowserRouter>

            <Helmet defaultTitle={title} titleTemplate={`%s - ${title}`} />
          </ErrorBoundary>
        </ReduxProvider>
      </IntlProvider>
    );
  }

}
