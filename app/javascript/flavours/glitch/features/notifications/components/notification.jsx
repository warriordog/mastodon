//  Package imports.
import PropTypes from 'prop-types';

import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';

//  Our imports,
import StatusContainer from 'flavours/glitch/containers/status_container';

import NotificationAdminReportContainer from '../containers/admin_report_container';
import NotificationFollowRequestContainer from '../containers/follow_request_container';

import NotificationAdminSignup from './admin_signup';
import NotificationFollow from './follow';

export default class Notification extends ImmutablePureComponent {

  static propTypes = {
    notification: ImmutablePropTypes.map.isRequired,
    hidden: PropTypes.bool,
    onMoveUp: PropTypes.func.isRequired,
    onMoveDown: PropTypes.func.isRequired,
    onMention: PropTypes.func.isRequired,
    getScrollPosition: PropTypes.func,
    updateScrollBottom: PropTypes.func,
    cacheMediaWidth: PropTypes.func,
    cachedMediaWidth: PropTypes.number,
    onUnmount: PropTypes.func,
    unread: PropTypes.bool,
    useLocalLinks: PropTypes.bool,
  };

  render () {
    const {
      hidden,
      notification,
      onMoveDown,
      onMoveUp,
      onMention,
      getScrollPosition,
      updateScrollBottom,
      useLocalLinks,
    } = this.props;

    switch(notification.get('type')) {
    case 'follow':
      return (
        <NotificationFollow
          hidden={hidden}
          id={notification.get('id')}
          account={notification.get('account')}
          notification={notification}
          onMoveDown={onMoveDown}
          onMoveUp={onMoveUp}
          onMention={onMention}
          unread={this.props.unread}
          useLocalLinks={useLocalLinks}
        />
      );
    case 'follow_request':
      return (
        <NotificationFollowRequestContainer
          hidden={hidden}
          id={notification.get('id')}
          account={notification.get('account')}
          notification={notification}
          onMoveDown={onMoveDown}
          onMoveUp={onMoveUp}
          onMention={onMention}
          unread={this.props.unread}
          useLocalLinks={useLocalLinks}
        />
      );
    case 'admin.sign_up':
      return (
        <NotificationAdminSignup
          hidden={hidden}
          id={notification.get('id')}
          account={notification.get('account')}
          notification={notification}
          onMoveDown={onMoveDown}
          onMoveUp={onMoveUp}
          onMention={onMention}
          unread={this.props.unread}
          useLocalLinks={useLocalLinks}
        />
      );
    case 'admin.report':
      return (
        <NotificationAdminReportContainer
          hidden={hidden}
          id={notification.get('id')}
          account={notification.get('account')}
          notification={notification}
          onMoveDown={onMoveDown}
          onMoveUp={onMoveUp}
          onMention={onMention}
          unread={this.props.unread}
          useLocalLinks={useLocalLinks}
        />
      );
    case 'mention':
      return (
        <StatusContainer
          containerId={notification.get('id')}
          hidden={hidden}
          id={notification.get('status')}
          notification={notification}
          onMoveDown={onMoveDown}
          onMoveUp={onMoveUp}
          onMention={onMention}
          contextType='notifications'
          getScrollPosition={getScrollPosition}
          updateScrollBottom={updateScrollBottom}
          cachedMediaWidth={this.props.cachedMediaWidth}
          cacheMediaWidth={this.props.cacheMediaWidth}
          onUnmount={this.props.onUnmount}
          withDismiss
          unread={this.props.unread}
          useLocalLinks={useLocalLinks}
        />
      );
    case 'status':
      return (
        <StatusContainer
          containerId={notification.get('id')}
          hidden={hidden}
          id={notification.get('status')}
          account={notification.get('account')}
          prepend='status'
          muted
          notification={notification}
          onMoveDown={onMoveDown}
          onMoveUp={onMoveUp}
          onMention={onMention}
          contextType='notifications'
          getScrollPosition={getScrollPosition}
          updateScrollBottom={updateScrollBottom}
          cachedMediaWidth={this.props.cachedMediaWidth}
          cacheMediaWidth={this.props.cacheMediaWidth}
          onUnmount={this.props.onUnmount}
          withDismiss
          unread={this.props.unread}
          useLocalLinks={useLocalLinks}
        />
      );
    case 'favourite':
      return (
        <StatusContainer
          containerId={notification.get('id')}
          hidden={hidden}
          id={notification.get('status')}
          account={notification.get('account')}
          prepend='favourite'
          muted
          notification={notification}
          onMoveDown={onMoveDown}
          onMoveUp={onMoveUp}
          onMention={onMention}
          contextType='notifications'
          getScrollPosition={getScrollPosition}
          updateScrollBottom={updateScrollBottom}
          cachedMediaWidth={this.props.cachedMediaWidth}
          cacheMediaWidth={this.props.cacheMediaWidth}
          onUnmount={this.props.onUnmount}
          withDismiss
          unread={this.props.unread}
          useLocalLinks={useLocalLinks}
        />
      );
    case 'reblog':
      return (
        <StatusContainer
          containerId={notification.get('id')}
          hidden={hidden}
          id={notification.get('status')}
          account={notification.get('account')}
          prepend='reblog'
          muted
          notification={notification}
          onMoveDown={onMoveDown}
          onMoveUp={onMoveUp}
          onMention={onMention}
          contextType='notifications'
          getScrollPosition={getScrollPosition}
          updateScrollBottom={updateScrollBottom}
          cachedMediaWidth={this.props.cachedMediaWidth}
          cacheMediaWidth={this.props.cacheMediaWidth}
          onUnmount={this.props.onUnmount}
          withDismiss
          unread={this.props.unread}
          useLocalLinks={useLocalLinks}
        />
      );
    case 'poll':
      return (
        <StatusContainer
          containerId={notification.get('id')}
          hidden={hidden}
          id={notification.get('status')}
          account={notification.get('account')}
          prepend='poll'
          muted
          notification={notification}
          onMoveDown={onMoveDown}
          onMoveUp={onMoveUp}
          onMention={onMention}
          contextType='notifications'
          getScrollPosition={getScrollPosition}
          updateScrollBottom={updateScrollBottom}
          cachedMediaWidth={this.props.cachedMediaWidth}
          cacheMediaWidth={this.props.cacheMediaWidth}
          onUnmount={this.props.onUnmount}
          withDismiss
          unread={this.props.unread}
          useLocalLinks={useLocalLinks}
        />
      );
    case 'update':
      return (
        <StatusContainer
          containerId={notification.get('id')}
          hidden={hidden}
          id={notification.get('status')}
          account={notification.get('account')}
          prepend='update'
          muted
          notification={notification}
          onMoveDown={onMoveDown}
          onMoveUp={onMoveUp}
          onMention={onMention}
          contextType='notifications'
          getScrollPosition={getScrollPosition}
          updateScrollBottom={updateScrollBottom}
          cachedMediaWidth={this.props.cachedMediaWidth}
          cacheMediaWidth={this.props.cacheMediaWidth}
          onUnmount={this.props.onUnmount}
          withDismiss
          unread={this.props.unread}
          useLocalLinks={useLocalLinks}
        />
      );
    default:
      return null;
    }
  }

}
