import { Semaphore } from 'async-mutex';

import type { LocaleData } from './global_locale';
import { isLocaleLoaded, setLocale } from './global_locale';

const localeLoadingSemaphore = new Semaphore(1);

export async function loadLocale() {
  const locale = document.querySelector<HTMLElement>('html')?.lang || 'en';

  // We use a Semaphore here so only one thing can try to load the locales at
  // the same time. If one tries to do it while its in progress, it will wait
  // for the initial load to finish before it is resumed (and will see that locale
  // data is already loaded)
  await localeLoadingSemaphore.runExclusive(async () => {
    // if the locale is already set, then do nothing
    if (isLocaleLoaded()) return;

    const upstreamLocaleData = await import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "locales/vanilla/[request]" */
      /* webpackInclude: /\.json$/ */
      /* webpackPreload: true */
      `mastodon/locales/${locale}.json`
    ) as LocaleData['messages'];

    const localeData = await import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "locales/glitch/[request]" */
      /* webpackInclude: /\.json$/ */
      /* webpackPreload: true */
      `flavours/glitch/locales/${locale}.json`
    ) as LocaleData['messages'];

    setLocale({ messages: { ...upstreamLocaleData, ...localeData }, locale });
  });
}
