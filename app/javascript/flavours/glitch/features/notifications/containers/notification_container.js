//  Package imports.
import { connect } from 'react-redux';

//  Our imports.
import { mentionCompose } from 'flavours/glitch/actions/compose';
import { makeGetNotification } from 'flavours/glitch/selectors';

import Notification from '../components/notification';

const makeMapStateToProps = () => {
  const getNotification = makeGetNotification();

  const mapStateToProps = (state, props) => {
    const settings = state.get('local_settings');
    const useLocalLinks = props.useLocalLinks || settings.get('use_local_links');
    return ({
      notification: getNotification(state, props.notification, props.accountId),
      notifCleaning: state.getIn(['notifications', 'cleaningMode']),
      useLocalLinks,
    });
  };

  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  onMention: (account, router) => {
    dispatch(mentionCompose(account, router));
  },
});

export default connect(makeMapStateToProps, mapDispatchToProps)(Notification);
