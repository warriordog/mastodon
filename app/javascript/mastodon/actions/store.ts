import { hydrateCompose } from './compose';
import { importFetchedAccounts } from './importer';

export const STORE_HYDRATE = 'STORE_HYDRATE';
export const STORE_HYDRATE_LAZY = 'STORE_HYDRATE_LAZY';

export function hydrateStore(rawState) {
  return dispatch => {

    dispatch({
      type: STORE_HYDRATE,
      rawState,
    });

    dispatch(hydrateCompose());
    dispatch(importFetchedAccounts(Object.values(rawState.accounts)));
  };
}
