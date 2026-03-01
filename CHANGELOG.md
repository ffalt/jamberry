# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.6.3](https://github.com/ffalt/jamberry/compare/v0.6.2...v0.6.3) (2026-03-01)


### Features

* **csp:** add Content Security Policy meta tag to enhance security ([33ed404](https://github.com/ffalt/jamberry/commit/33ed40440d7488f9bbbefe15ac17b1452c5c7c7e))
* **queue:** better shuffle ([6e6d4ce](https://github.com/ffalt/jamberry/commit/6e6d4cea933ac00f030382bf0e5ac8e38c19532c))


### Bug Fixes

* **artwork-edit:** validate blob URLs before trusting image cropper output ([874f983](https://github.com/ffalt/jamberry/commit/874f98356ce067611a1ee595fe1053e43b76b78c))
* **auth,base:** remove password storage, simplify error handling and request building ([7b10daf](https://github.com/ffalt/jamberry/commit/7b10dafdecd43b1036dac531231ecf27c63b6d33))
* **components:** implement proper cleanup in ngOnDestroy for multiple components ([476c40b](https://github.com/ffalt/jamberry/commit/476c40b1e2c2af513dabbe40b571e7a785b01b2f))
* **contextmenu:** ensure proper overlay management and cleanup ([d67913f](https://github.com/ffalt/jamberry/commit/d67913fcee9fc43a487e4ca3db8d4144ece5a08f))
* **dependencies:** update @angular/cdk to 21.1.6 and other Angular packages to 21.1.5 ([3b711d4](https://github.com/ffalt/jamberry/commit/3b711d460118f1d4aa0fce65a5bd64bcf5e03c43))
* **dependencies:** update Angular packages and related dependencies to version 21.2.0 ([2296a89](https://github.com/ffalt/jamberry/commit/2296a89c091c1fc69aecc172af2b0f046108f137))
* **hotkeys:** return hotkey after removing from pausedHotkeys ([3c8a8a7](https://github.com/ffalt/jamberry/commit/3c8a8a797a44f75c14a35b944c59c0ff4b30b4b1))
* **login:** add credential validation for server URL, username, and password ([9800491](https://github.com/ffalt/jamberry/commit/98004912eb61f5ca7ef10922ddcfca53ef9ed94a))
* **mediasession:** add error handling for MediaMetadata assignment ([4de1822](https://github.com/ffalt/jamberry/commit/4de1822ff2f5b8a1fc69f7e83149558f4b303b80))
* **mediasession:** use mediaSession instance for setPositionState method ([21c66c0](https://github.com/ffalt/jamberry/commit/21c66c0b04a7bf407876c98854ce7d5079cb9fd5))
* **player:** clear current media to prevent potential playback loops ([cdb3d45](https://github.com/ffalt/jamberry/commit/cdb3d45dac534e30703200cacff773ea18895c83))
* **player:** improve song retrieval logic in togglePlayPause ([b63b34a](https://github.com/ffalt/jamberry/commit/b63b34a280cad2ba0af50d8bc1886128eacd4840))
* **player:** prevent scrobbling when totalTime is zero ([cb62fe6](https://github.com/ffalt/jamberry/commit/cb62fe678656f2060d94238182218d434c8ba233))
* **player:** prevent sound player initialization if media ID has changed ([a790d9d](https://github.com/ffalt/jamberry/commit/a790d9da4c61a0a70068058c39e151464ee8c4a6))
* **player:** remove unnecessary setTimeout when loading from storage ([11b7dbb](https://github.com/ffalt/jamberry/commit/11b7dbb737392106e3bdcb0c3e2a72bf4473282b))
* **player:** simplify play method logic for media playback control ([52ac875](https://github.com/ffalt/jamberry/commit/52ac875a672fd77974897dea98bcc95f24f17250))
* **player:** stop position store on component destruction ([43ae578](https://github.com/ffalt/jamberry/commit/43ae578a5578c57fe35aba9a8762deaaf159e210))
* **player:** throttle time updates during playback ([2be768a](https://github.com/ffalt/jamberry/commit/2be768ab61379caaea49ed8e0861873c702c780e))
* **player:** unload last media only if the new track is different ([6ac9ff3](https://github.com/ffalt/jamberry/commit/6ac9ff331c63f597e1525207f6153fb97c3c002b))
* **playlist:** correct track removal logic in removeFromPlaylist ([2320aef](https://github.com/ffalt/jamberry/commit/2320aef1238841a7518bca3cf49487223f1157f0))
* **queue:** adjust currentIndex when removing a track from entries ([3f90d16](https://github.com/ffalt/jamberry/commit/3f90d1638398290229d60f0283172f9fa3e7f46a))
* **queue:** optimize track addition with duplicate handling ([18febde](https://github.com/ffalt/jamberry/commit/18febde88abdb6a82476dda89f7a1d3076dafa39))
* **queue:** reset current index after shuffling entries ([4646996](https://github.com/ffalt/jamberry/commit/4646996b45152a369a21007b6920a3f52970b0fb))
* **tab-portal-outlet:** safely clear element content without using innerHTML ([f9acf24](https://github.com/ffalt/jamberry/commit/f9acf242e847f55f7b225c111a75815eb34b3735))
* **tag-editor:** prevent actions during saving and improve navigation logic ([ea77d2f](https://github.com/ffalt/jamberry/commit/ea77d2f7a5add2ba9ab9a6c4303eefc75cc3acab))
* **typing:** update parameter types from 'any' to 'unknown' in various services and interceptors ([322b430](https://github.com/ffalt/jamberry/commit/322b4304ae40fa4702c494607342177ab6172e2e))

## [0.6.2](https://github.com/ffalt/jamberry/compare/v0.6.1...v0.6.2) (2026-01-15)


### Features

* **obj-card:** show jam object details in cards ([b772665](https://github.com/ffalt/jamberry/commit/b772665eb6ed3edceb7c94492b74cd3b843c798a))


### Bug Fixes

* **tag-editor:** iterate fields object instead of build object ([6e1dc9a](https://github.com/ffalt/jamberry/commit/6e1dc9afcb8e836f396bf6216092db9e9cd2ab13))
* **tag-editor:** valid mass cell applying ([08c6089](https://github.com/ffalt/jamberry/commit/08c6089ba324a6ce7f7812109c783ea0c4ec2795))

## [0.6.1](https://github.com/ffalt/jamberry/compare/v0.6.0...v0.6.1) (2025-12-07)

## [0.6.0](https://github.com/ffalt/jamberry/compare/v0.4.27...v0.6.0) (2025-09-27)

## [0.4.27](https://github.com/ffalt/jamberry/compare/v0.4.26...v0.4.27) (2025-07-01)

* bump dependencies

## [0.4.26](https://github.com/ffalt/jamberry/compare/v0.4.25...v0.4.26) (2025-06-06)

* bump dependencies

## [0.4.25](https://github.com-ffalt/ffalt/jamberry/compare/v0.4.24...v0.4.25) (2024-10-07)

### Features

* **sessions:** create subsonic token ui ([44c8904](https://github.com-ffalt/ffalt/jamberry/commit/44c8904d51f2d842547fdcfd25c7614173f85d96))

## [0.4.24](https://github.com-ffalt/ffalt/jamberry/compare/v0.4.23...v0.4.24) (2024-09-13)

* bump dependencies

## [0.4.23](https://github.com-ffalt/ffalt/jamberry/compare/v0.4.22...v0.4.23) (2024-03-23)

### Features

* **i18n:** mark text to extract ([a4799a4](https://github.com-ffalt/ffalt/jamberry/commit/a4799a46e49ac19f5e794d41de3afbe9dde694cf))
* **i18n:** setup jest ([b3d25bd](https://github.com-ffalt/ffalt/jamberry/commit/b3d25bde078b63d46a070060da96d63e40f30e42))

## [0.4.22](https://github.com-ffalt/ffalt/jamberry/compare/v0.4.21...v0.4.22) (2023-05-19)

### Bug Fixes

* **sidebar:** browse entry active detection ([d14efa5](https://github.com-ffalt/ffalt/jamberry/commit/d14efa582be6bd35c25e56bd470f00c1c9b5b21f))
* **theme:** refine themes ([68c52fd](https://github.com-ffalt/ffalt/jamberry/commit/68c52fd467602bd1c1cafe00b02d6b0abe7b132b))

## [0.4.21](https://github.com-ffalt/ffalt/jamberry/compare/v0.4.20...v0.4.21) (2023-05-19)

### Features

* **search:** click search icon to recall last search ([30d1a91](https://github.com-ffalt/ffalt/jamberry/commit/30d1a9124aca2dc3dbcf93f0d9051ed9aa96088d))
* **search:** move header input to right ([605fc80](https://github.com-ffalt/ffalt/jamberry/commit/605fc803d1aee9f15b1355d08b6441ca775dfb1b))
* **theme:** refine themes; rework dark theme; add catppuccin theme ([5912428](https://github.com-ffalt/ffalt/jamberry/commit/59124282f103a84f2d20aa30378e17001da7e8eb))
* **themes:** add missing hover ([60d0cec](https://github.com-ffalt/ffalt/jamberry/commit/60d0cec864552f706b8f6a4bc52ff7df1881a76d))

### [0.4.20](https://github.com-ffalt/ffalt/jamberry/compare/v0.4.19...v0.4.20) (2023-01-14)

### Bug Fixes

* **services:** don't init class variable with constructor parameter ([b1338fb](https://github.com-ffalt/ffalt/jamberry/commit/b1338fbce7368f1d13949f17814ed069a49d2b78))

### [0.4.19](https://github.com-ffalt/ffalt/jamberry/compare/v0.4.17...v0.4.19) (2023-01-13)

chore(angular): bump angular to 15.1.0

### [0.4.18](https://github.com/ffalt/jamberry/compare/v0.4.17...v0.4.18) (2022-12-13)

### Features

* **dev:** autofill debug login via proxy config.js ([9041578](https://github.com/ffalt/jamberry/commit/9041578eed09485e9fb2d420bdf981c65cac94ef))
* **series:** enable grouping ([5cd35b8](https://github.com/ffalt/jamberry/commit/5cd35b82505422638f49980eb8c0f8fe7c14c597))

### [0.4.17](https://github.com/ffalt/jamberry/compare/v0.4.16...v0.4.17) (2022-09-19)

### Features

* **series:** sort series extras into own group ([e20972a](https://github.com/ffalt/jamberry/commit/e20972ac8031e164c9357b70d5bd05c8a6d9c480))

### Bug Fixes

* **angular:** use unique component selector ([89b58cc](https://github.com/ffalt/jamberry/commit/89b58cc7fccb10cbaac102314c8e9f13ee9573e1))

### [0.4.16](https://github.com/ffalt/jamberry/compare/v0.4.15...v0.4.16) (2022-03-26)

### Bug Fixes

* **playlist-dialog:** add missing entry styling ([f40c023](https://github.com/ffalt/jamberry/commit/f40c023784ad8891542d299596e1101140019b72))

### [0.4.15](https://github.com/ffalt/jamberry/compare/v0.4.14...v0.4.15) (2021-11-14)

### Features

* **mediasession:** support new actions seek, stop, update position ([ada0060](https://github.com/ffalt/jamberry/commit/ada00603aa2ef8ae5bc7d069f817eb46b3cb7374))

### [0.4.14](https://github.com/ffalt/jamberry/compare/v0.4.13...v0.4.14) (2021-10-29)

### Bug Fixes

* **theme:** remove debugging focus color ([cb431fe](https://github.com/ffalt/jamberry/commit/cb431fe8b3b7b42259df67e81c30ec5f0ce6bfc6))

### [0.4.13](https://github.com/ffalt/jamberry/compare/v0.4.12...v0.4.13) (2021-10-13)

### Features

* **accessibility:** sidebar keyboard navigation ([02e0de0](https://github.com/ffalt/jamberry/commit/02e0de0b3778bd3be6f1a576833ac0d27ae7dbf9))
* **accessibility:** start using semantic html, support tab & keyboard navigation ([ff3d5dd](https://github.com/ffalt/jamberry/commit/ff3d5dd662f1fc1de21298b6260f1d943ce2a292))
* **accessibility:** support keyboard navigation in queue, menus, player, tabs ([2db2db6](https://github.com/ffalt/jamberry/commit/2db2db66a83dd10288e1928f13d5f7704eb17c47))
* **accessibility:** support tab & keyboard navigation ([db358db](https://github.com/ffalt/jamberry/commit/db358dbaa45f5975d3bde2fe04bd94b0397b5fd8))
* **accessibility:** tracklist & indexlist keyboard navigation ([baf8ec6](https://github.com/ffalt/jamberry/commit/baf8ec641870dac1fd4c91828fc114a9441c4f8d))
* **accessibility:** using semantic html, support tab & keyboard navigation ([7bfb4b2](https://github.com/ffalt/jamberry/commit/7bfb4b221251c547c6ea43ec4b75fa273ce86c61))

### [0.4.12](https://github.com/ffalt/jamberry/compare/v0.4.11...v0.4.12) (2021-08-06)

### Features

* **tag-editor:** add set-compilation cmd ([1b56941](https://github.com/ffalt/jamberry/commit/1b5694106d266db1d64842e1ebf2ca0ce990d8dd))

### [0.4.11](https://github.com/ffalt/jamberry/compare/v0.4.10...v0.4.11) (2021-07-31)

### Features

* **images:** request images in webp format ([6bbb1e7](https://github.com/ffalt/jamberry/commit/6bbb1e7686ecf5d24ea60af75eda4f6d1202eb07))

### [0.4.10](https://github.com///compare/v0.4.9...v0.4.10) (2021-07-31)

### Bug Fixes

* **overlays:** anchorElement for cdk-overlay context menu ([7058167](https://github.com///commit/7058167b963924db674d751097cefe54e3ee441c))

### [0.4.9](https://github.com///compare/v0.4.8...v0.4.9) (2021-05-17)

### Bug Fixes

* **angular & csp:** inlined css uses inlined js, use external css ([c09c03d](https://github.com///commit/c09c03d782259829c39717426664be0d14bd8bdd))
* **overlays:** cdk-overlay-pane must have pointer-events enabled ([25917d9](https://github.com///commit/25917d9ce9e3b8653ffc070700fbf7870ae9d5e7))

### [0.4.8](https://github.com///compare/v0.4.7...v0.4.8) (2021-05-16)

### [0.4.7](https://github.com///compare/v0.4.6...v0.4.7) (2021-04-04)

### Bug Fixes

* **player:** repeat track did not repeat track ([19a928c](https://github.com///commit/19a928c23021a5cedf111716fcd6a63b76dd0f02))

### [0.4.6](https://github.com/ffalt/jamberry/compare/v0.4.5...v0.4.6) (2020-12-21)

### Bug Fixes

* **api:** if downloading binary via js, include content-type into return result ([ccb1f52](https://github.com/ffalt/jamberry/commit/ccb1f520083ba17727a035316a92a7d7932f7879))
* **api:** if downloading binary via js, include content-type into return result ([da77a21](https://github.com/ffalt/jamberry/commit/da77a21c22e80ed353b8a3bacf1451e011415afa))

### [0.4.5](https://github.com/ffalt/jamberry/compare/v0.4.4...v0.4.5) (2020-12-18)

### Features

* **meta:** use proxy coverartarchive request to avoid csp violations ([f3a5470](https://github.com/ffalt/jamberry/commit/f3a54708323cd2ac23f314c983c046587e4f91f6))

### [0.4.4](https://github.com/ffalt/jamberry/compare/v0.4.3...v0.4.4) (2020-09-24)

### Features

* **podcast discover:** use jam api & gpodder scaled images ([a262a3f](https://github.com/ffalt/jamberry/commit/a262a3f4921747903af919f30623fbbb3c8c0b79))

### Bug Fixes

* **css:** invalid vertical-align value ([adcc46d](https://github.com/ffalt/jamberry/commit/adcc46d5274744786400a45df52be656667f3071))

### [0.4.3](https://github.com/ffalt/jamberry/compare/v0.4.2...v0.4.3) (2020-09-23)

### Bug Fixes

* **mediasession:** extending global MediaMetaData obj no longer works, just declare it where it's used ([b3362ee](https://github.com/ffalt/jamberry/commit/b3362eecf4fd978b224c3b81241e593f71e50f1c))

### [0.4.2](https://github.com/ffalt/jamberry/compare/v0.4.0...v0.4.2) (2020-09-22)

### Features

* **admin:** refresh root meta cmd ([afe64a2](https://github.com/ffalt/jamberry/commit/afe64a2bc893c7208608685d9367c205a47ec150))
* **genre:** genres with id & state support ([e4083d8](https://github.com/ffalt/jamberry/commit/e4083d80c10f4913c1f83a2135bc96c6c7c8d24c))
* **info:** show info if server api mismatch client version ([0342500](https://github.com/ffalt/jamberry/commit/03425000d1c48ef62858c8c91173e9252f3d4f3d))

### Bug Fixes

* **genre:** use genre ids ([a5e6474](https://github.com/ffalt/jamberry/commit/a5e64740dc662c39ace75e43618545db75ff621f))

## 0.4.1 (2020-09-17)

skipped

## 0.4.0 (2020-09-17)

Start using standard-version changelog
