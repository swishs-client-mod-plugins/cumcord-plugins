namespace GlobalSub {
  const CHUNK_NAME = 'webpackChunkdiscord_app';

  let __webpack_require__;
  export function initialize() {
    if (__webpack_require__) return __webpack_require__;

    const chunk = [[Symbol('global-substitution')], {}, _ => _];
    __webpack_require__ = window[CHUNK_NAME].push(chunk);
    window[CHUNK_NAME].splice(window[CHUNK_NAME].indexOf(chunk), 1);

    return __webpack_require__;
  }

  let cachedModule;
  export function onLoad() {
    const req = initialize();

    const id = (Object.values(req.c) as any)
      .find(m => m.exports.parseAndRebuild).id;

    const module = req.m[id];
    const cached = req.c[id];

    // Save for the unpatch.
    cachedModule = cached;

    // I'm still not sure if any webpack modules use this but it's here in case.
    const firstArg = { exports: {}, id, loaded: false };

    const replacedFunction = module.toString().replace(/var (.)=(.)\.content.replace/, 'var $1=$2\.content.replaceAll');

    // This mutates the second argument.
    eval(replacedFunction)(firstArg, cached.exports, req);
  }

  export function onUnload() {
    if (!cachedModule) return;

    const req = initialize();

    const id = (Object.values(req.c) as any)
      .find(m => m.exports.parseAndRebuild).id;

    Object.assign(req.c[id].exports, cachedModule);
  }
}

export default GlobalSub;
