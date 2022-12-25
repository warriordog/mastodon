import { connect } from 'react-redux';
import StatusList from 'flavours/glitch/components/status_list';
import { loadPending, scrollTopTimeline } from 'flavours/glitch/actions/timelines';
import { List as ImmutableList, Map as ImmutableMap } from 'immutable';
import { createSelector } from 'reselect';
import { debounce } from 'lodash';
import { me } from 'flavours/glitch/initial_state';

const getRegex = createSelector([
  (state, { regex }) => regex,
], (rawRegex) => {
  let regex = null;

  try {
    regex = rawRegex && new RegExp(rawRegex.trim(), 'i');
  } catch (e) {
    // Bad regex, don't affect filters
  }
  return regex;
});

const makeGetStatusIds = (pending = false) => createSelector([
  (state, { type }) => state.getIn(['settings', type], ImmutableMap()),
  (state, { type }) => state.getIn(['timelines', type, pending ? 'pendingItems' : 'items'], ImmutableList()),
  (state)           => state.get('statuses'),
  getRegex,
], (columnSettings, statusIds, statuses, regex) => {
  return statusIds.filter(id => {
    if (id === null) return true;

    const statusForId = statuses.get(id);
    let showStatus    = true;

    if (statusForId.get('account') === me) return true;

    if (columnSettings.getIn(['shows', 'reblog']) === false) {
      showStatus = showStatus && statusForId.get('reblog') === null;
    }

    if (columnSettings.getIn(['shows', 'reply']) === false) {
      showStatus = showStatus && (statusForId.get('in_reply_to_id') === null || statusForId.get('in_reply_to_account_id') === me);
    }

    if (columnSettings.getIn(['shows', 'direct']) === false) {
      showStatus = showStatus && statusForId.get('visibility') !== 'direct';
    }

    if (showStatus && regex) {
      const searchIndex = statusForId.get('reblog') ? statuses.getIn([statusForId.get('reblog'), 'search_index']) : statusForId.get('search_index');
      showStatus = !regex.test(searchIndex);
    }

    return showStatus;
  });
});

const makeMapStateToProps = () => {
  const getStatusIds = makeGetStatusIds();
  const getPendingStatusIds = makeGetStatusIds(true);

  const mapStateToProps = (state, props) => {
    const settings = state.get('local_settings');
    const useLocalLinks = props.useLocalLinks || settings.get('use_local_links');

    return ({
      statusIds: getStatusIds(state, { type: props.timelineId, regex: props.regex }),
      isLoading: state.getIn(['timelines', props.timelineId, 'isLoading'], true),
      isPartial: state.getIn(['timelines', props.timelineId, 'isPartial'], false),
      hasMore: state.getIn(['timelines', props.timelineId, 'hasMore']),
      numPending: getPendingStatusIds(state, { type: props.timelineId }).size,
      useLocalLinks: props.useLocalLinks || useLocalLinks,
    });
  };

  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, { timelineId }) => ({

  onScrollToTop: debounce(() => {
    dispatch(scrollTopTimeline(timelineId, true));
  }, 100),

  onScroll: debounce(() => {
    dispatch(scrollTopTimeline(timelineId, false));
  }, 100),

  onLoadPending: () => dispatch(loadPending(timelineId)),

});

export default connect(makeMapStateToProps, mapDispatchToProps)(StatusList);