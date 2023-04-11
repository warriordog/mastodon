# Feature roadmap

Planned features are listed here in roughly priority order.
No timeline is offered and plans may be changed or dropped at any time.

- Case-sensitive filter fix
  - [ ] Stage 1 - make whole-word case-insensitive for consistency
  - [ ] Stage 2 - add toggle for case sensitivity
- Client app filters - restrict which applications can be connected by users. This enables an administrator to block scrapers which utilize [Mastodon's Client API](https://docs.joinmastodon.org/client/intro/).
  - [ ] Deny lists - prohibit clients based on `client_name`
  - [ ] Allow lists - allow clients based on `client_name` (tentative - we don't want to restrict users too much. Consider adding a banner warning to administrators?)
  - [ ] Universal block - disable all client apps (tentative - same issue as allow-list)
- Search filters - additional filters to improve search without increasing the risk of abuse
  - [ ] Filter by favorite - only include posts that were favorited by the current user
  - [ ] Filter by boosted - only include posts that were boosted by the current user
  - [ ] Filter by bookmarked - only include posts that were bookmarked by the current user
- Fix missed cases of Use Local Links
  - [ ] Apply to mentions
  - [ ] Apply to hashtags
  - [ ] Apply in search results
  - [ ] Apply to trends
  - [ ] Apply in settings area (tentative, would be a significant technical change)
- Federation tab improvements
  - [ ] Count accounts from subdomains. Show as a separate number (ex. `12 + 2 + 0`) to indicate the number of accounts for the base domain and each known subdomain. In the previous example, the base domain would have 12 accounts, one subdomain has 2 accounts, and another subdomain is federating but has no known accounts.
  - [ ] List subdomains on the instance information screen
- [ ] Separate profile tabs for "Posts" and "Posts and Boosts"
- Non-blocking filters - alternative to "show with warning" and "hide completely"
  - [ ] Highlight word
  - [ ] Flag post
- Followers / Follows list improvements
  - [ ] Sort by name
  - [ ] Sort by date
  - [ ] Filter by name
  - [ ] Load All button
- [ ] Moderation filters - filters applied at the server level to detect and notify moderators upon receipt of flagged messages.
  - [ ] Quick action to create a domain block for the originating instance
  - [ ] Quick action to create a fediblock post for the originating instance
- [ ] Bookmark folders - group bookmarks for easier searching
  - [ ] Subfolders (tentative, may not be a good idea)
- [ ] Proxy mode (name TBD) - utilize the instance as a client to browse a remote instance via ActivityPub. Goal is to allow moderators to review instances with a restricted frontend / without exposing their IP address). Needs extensive thought and planning.
  - [ ] Restrict by role (most instances would lock this down to moderators only, I imagine)
  - [ ] Safe mode (hide media if instance is suspected to host illegal or unlicensed content)
    - [ ] All media is hidden by default (including PFPs)
    - [ ] Media is not cached locally
    - [ ] Media is not cached in browser
  - [ ] Quick action to enter proxy mode for an instance
  - [ ] Quick action to enter proxy mode for a remote post
  - [ ] Quick action to enter proxy mode for a remote profile
