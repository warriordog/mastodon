interface Emoji {
  readonly shortcode: string;
  readonly static_url: string;
  readonly url: string;
}

interface AccountField {
  readonly name: string;
  readonly value: string;
  readonly verified_at: string;
}

interface Account {
  readonly acct: string;
  readonly avatar: string;
  readonly avatar_static: string;
  readonly bot: boolean;
  readonly created_at: string;
  readonly discoverable?: boolean;
  readonly display_name: string;
  readonly emojis: Emoji[];
  readonly fields: AccountField[];
  readonly followers_count: number;
  readonly following_count: number;
  readonly group: boolean;
  readonly header: string;
  readonly header_static: string;
  readonly id: string;
  readonly last_status_at?: string;
  readonly locked: boolean;
  readonly note: string;
  readonly statuses_count: number;
  readonly url: string;
  readonly username: string;
}

interface InitialStateLanguage {
  readonly code: string;
  readonly name: string;
  readonly localName: string;
}

interface InitialStateMeta {
  readonly access_token: string;
  readonly advanced_layout?: boolean;
  readonly auto_play_gif: boolean;
  readonly activity_api_enabled: boolean;
  readonly admin: string;
  readonly boost_modal?: boolean;
  readonly crop_images: boolean;
  readonly delete_modal?: boolean;
  readonly disable_swiping?: boolean;
  readonly disabled_account_id?: string;
  readonly display_media: boolean;
  readonly domain: string;
  readonly expand_spoilers?: boolean;
  readonly limited_federation_mode: boolean;
  readonly locale: string;
  readonly mascot: string | null;
  readonly me?: string;
  readonly moved_to_account_id?: string;
  readonly owner?: string;
  readonly profile_directory: boolean;
  readonly registrations_open: boolean;
  readonly reduce_motion: boolean;
  readonly repository: string;
  readonly search_enabled: boolean;
  readonly single_user_mode: boolean;
  readonly source_url: string;
  readonly streaming_api_base_url: string;
  readonly timeline_preview: boolean;
  readonly title: string;
  readonly trends: boolean;
  readonly unfollow_modal: boolean;
  readonly use_blurhash: boolean;
  readonly use_pending_items?: boolean;
  readonly version: string;
  readonly translation_enabled: boolean;
}

export interface InitialState {
  readonly accounts: Record<string, Account>;
  readonly languages: InitialStateLanguage[];
  readonly meta: InitialStateMeta;
}

const element = document.getElementById('initial-state');
const initialState: InitialState | undefined = element?.textContent ? JSON.parse(element.textContent) : undefined;

const getMeta = <K extends keyof InitialStateMeta>(prop: K): InitialStateMeta[K] | undefined => initialState?.meta ? initialState.meta[prop] : undefined;

export const activityApiEnabled = getMeta('activity_api_enabled');
export const autoPlayGif = getMeta('auto_play_gif');
export const boostModal = getMeta('boost_modal');
export const cropImages = getMeta('crop_images');
export const deleteModal = getMeta('delete_modal');
export const disableSwiping = getMeta('disable_swiping');
export const disabledAccountId = getMeta('disabled_account_id');
export const displayMedia = getMeta('display_media');
export const domain = getMeta('domain');
export const expandSpoilers = getMeta('expand_spoilers');
export const forceSingleColumn = !getMeta('advanced_layout');
export const limitedFederationMode = getMeta('limited_federation_mode');
export const mascot = getMeta('mascot');
export const me = getMeta('me');
export const movedToAccountId = getMeta('moved_to_account_id');
export const owner = getMeta('owner');
export const profile_directory = getMeta('profile_directory');
export const reduceMotion = getMeta('reduce_motion');
export const registrationsOpen = getMeta('registrations_open');
export const repository = getMeta('repository');
export const searchEnabled = getMeta('search_enabled');
export const showTrends = getMeta('trends');
export const singleUserMode = getMeta('single_user_mode');
export const source_url = getMeta('source_url');
export const timelinePreview = getMeta('timeline_preview');
export const title = getMeta('title');
export const unfollowModal = getMeta('unfollow_modal');
export const useBlurhash = getMeta('use_blurhash');
export const usePendingItems = getMeta('use_pending_items');
export const version = getMeta('version');
export const translationEnabled = getMeta('translation_enabled');
export const languages = initialState?.languages;

export default initialState;
