import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePureComponent from 'react-immutable-pure-component';
import NavigationPanel from './navigation_panel';
import SearchContainer from '../../compose/containers/search_container';
import ServerBanner from '../../../components/server_banner';
import NavigationContainer from '../../compose/containers/navigation_container';
import ComposeFormContainer from '../../compose/containers/compose_form_container';
import LinkFooter from './link_footer';
import { Link } from 'react-router-dom';
import Logo from '../../../components/logo';
import Button from '../../../components/button';
import { defineMessages, intlShape } from 'react-intl';

const messages = defineMessages({
  post: { id: 'columns_area_single.post', defaultMessage: 'Post' },
});

export default class ColumnsAreaSingle extends ImmutablePureComponent {

  static contextTypes = {
    router: PropTypes.object.isRequired,
    identity: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  static propTypes = {
    children: PropTypes.node,
  };

  state = {
    composeIsOpen: false,
  }

  openCompose = () => {
    this.setState({ composeIsOpen: true });
  }

  closeCompose = () => {
    this.setState({ composeIsOpen: false });
  }

  render () {
    const { children } = this.props;
    const { composeIsOpen } = this.state;
    const { identity, intl } = this.context;
    const signedIn = identity.signedIn;

    return (
      <div className='columns-area__wide'>
        <div className='columns-area__wide-grid'>
          <div className='columns-area-title'>
            <div className='navigation-panel__logo'>
              <Link to='/' className='column-link column-link--logo'>
                <Logo />
              </Link>
            </div>
          </div>

          <div className='columns-area-search'>
            {signedIn && (
              <Button
                type='button'
                className='toggle-compose-button'
                text={intl.formatMessage(messages.post)}
                onClick={this.openCompose}
              />
            )}
            <SearchContainer openInRoute />
          </div>

          {composeIsOpen && (
            <div className='columns-area-publish'>
              <ComposeFormContainer
                singleColumn
                inlineButtons
                onCancel={this.closeCompose}
                onSubmit={this.closeCompose}
              />
            </div>
          )}

          <div className='columns-area-sidebar'>
            <div className='sidebar-content'>
              {signedIn && (
                <NavigationContainer onClose={this.onBlur} />
              )}

              {!signedIn && (
                <ServerBanner />
              )}

              <hr />

              <NavigationPanel />

              <LinkFooter />
            </div>
          </div>

          <div className='columns-area-header'>
            <div id='tabs-bar__portal' />
          </div>

          <div className='columns-area-body'>
            {children}
          </div>
        </div>
      </div>
    );
  }

}
