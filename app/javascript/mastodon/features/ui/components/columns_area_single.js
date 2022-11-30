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
import {
  hideCompose,
  mountCompose,
  showCompose,
  toggleCompose,
  unmountCompose,
} from '../../../actions/compose';
import { connect } from 'react-redux';

const messages = defineMessages({
  post: { id: 'columns_area_single.post', defaultMessage: 'Post' },
});

class ColumnsAreaSingle extends ImmutablePureComponent {

  static contextTypes = {
    identity: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  static propTypes = {
    router: PropTypes.object.isRequired,
    children: PropTypes.node,
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,
    changeComposing: PropTypes.func,
    showCompose: PropTypes.func,
    hideCompose: PropTypes.func,
    toggleCompose: PropTypes.func,
    composeIsVisible: PropTypes.bool,
  };

  componentDidMount () {
    const { onMount } = this.props;
    onMount?.();
  }

  componentWillUnmount () {
    const { onUnmount } = this.props;
    onUnmount?.();
  }

  render () {
    const { children, composeIsVisible, hideCompose, toggleCompose } = this.props;
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
                onClick={toggleCompose}
              />
            )}
            <SearchContainer openInRoute />
          </div>

          {/*This might need to be a CSS class instead*/}
          {composeIsVisible && (
            <div className='columns-area-publish'>
              <ComposeFormContainer
                singleColumn
                inlineButtons
                onCancel={hideCompose}
                onSubmit={hideCompose}
              />
            </div>
          )}

          <div className='columns-area-sidebar'>
            <div className='sidebar-content'>
              {signedIn && (
                <NavigationContainer />
              )}

              {!signedIn && (
                <ServerBanner />
              )}

              <hr />

              <NavigationPanel />

              <LinkFooter intl={intl} />
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

function mapStateToProps(state) {
  return {
    composeIsVisible: state.getIn(['compose', 'visible']),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { router } = ownProps;
  return {
    onMount: () => dispatch(mountCompose()),
    onUnmount: () => dispatch(unmountCompose()),
    showCompose: () => dispatch(showCompose(router.history)),
    hideCompose: () => dispatch(hideCompose()),
    toggleCompose: () => dispatch(toggleCompose(router.history)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ColumnsAreaSingle);
