# Attribution and License

Version 1.1.0 adds an independently implemented Reddit UI dictionary and DOM translator (reddit.js), site-specific content script registration, and a Reddit preference in the popup. These local changes are also GPL-3.0-or-later. Reddit translations are not supplied by the upstream GitHub Chinese project.

This extension redistributes the translation engine (upstream.user.js) and dictionary (upstream-locals.js) from https://github.com/maboloshi/github-chinese, gh-pages branch, downloaded on 2026-11-02. Engine version: 1.9.4.4-2026-10-14.

Original authors: 楼教主 (52cik), 沙漠之子 (maboloshi), and upstream contributors. Original copyright headers are preserved in the source files and generated content.js.

The combined extension and local adapter are distributed under GPL-3.0-or-later. See LICENSE for the complete GPL v3 text.

Local changes: Chrome Manifest V3 packaging, local dictionary bundling, extension storage settings, popup, and a userscript compatibility adapter. Online description translation and userscript menu commands are disabled. No upstream engine or dictionary changes are made. All corresponding source files and the reproducible build script are included.
