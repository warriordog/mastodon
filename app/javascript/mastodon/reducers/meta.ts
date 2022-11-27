import { STORE_HYDRATE } from 'mastodon/actions/store';
import { APP_LAYOUT_CHANGE } from 'mastodon/actions/app';
import { layoutFromWindow } from 'mastodon/is_mobile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {InitialState} from "../initial_state";

interface MetaState {
  streaming_api_base_url: string | null;
  access_token: string | null;
  layout: string;
  permissions: string;
}

const initialState: MetaState = {
  streaming_api_base_url: null,
  access_token: null,
  layout: layoutFromWindow(),
  permissions: '0',
};

const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {},
  extraReducers: {
    [STORE_HYDRATE]: (state, action: PayloadAction<InitialState>) => {
      state.streaming_api_base_url = action.payload.meta.streaming_api_base_url;
      state.access_token = action.payload.meta.access_token;
    },
    [APP_LAYOUT_CHANGE]: (state, action: PayloadAction<string>) => {
      state.layout = action.payload;
    },
  },
});

export default metaSlice.reducer;
