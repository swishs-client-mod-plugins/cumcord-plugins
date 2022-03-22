(function(z,m,r,i,y,O){"use strict";function N(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach(function(n){if(n!=="default"){var s=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,s.get?s:{enumerable:!0,get:function(){return e[n]}})}}),t.default=e,Object.freeze(t)}var o=N(z);const E=[];var f={patch:e=>e&&E.push(e),unpatchAll:()=>E.forEach(async e=>await e()),lazyPatchContextMenu:async(e,t)=>{const n=a=>a.default&&a.default.displayName===e,s=r.find(n);if(s)t(s);else{const a=r.findByProps("openContextMenuLazy");let u=m.before("openContextMenuLazy",a,h=>{const J=h[1];return h[1]=async()=>{const Q=await J(h[0]);return V=>{const B=Q(V);return B?.type?.displayName===e&&t&&(u(),t(r.find(n)),t=!1),B}},h})}}};/**
* NOTICE OF LICENSE
*
* This source file is subject to the GNU General Public License (GPL-3.0).
* You can find more information in the LICENSE.md file.
* More information is also avaliable at this URL:
* https://opensource.org/licenses/GPL-3.0
* 
*
* @copyright Copyright (c) 2022 Paige Jordan
* @license   GPL-3.0 GNU General Public License v3.0
* @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/tree/main/plugins/pronoun-bio-scraper
*/const{fetchProfile:S}=r.findByProps("fetchProfile"),{getUserProfile:I}=r.findByProps("getUserProfile"),{getUser:A}=r.findByProps("getUser","getCurrentUser"),p=[];var L=async e=>{!I(e.id)&&!p.includes(e.id)&&(p.push(e.id),await S(e.id),p.splice(p.length-1,1));const n=A(e.id);if(!!n)return R(n.bio)};const R=e=>{if(!e)return;e=e.replace(/(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-z0-9@:%_\+.~#?&//=]*)/gi,"");let t=e.match(/[a-z]+?(?:\/[a-z]+)+/i);if(!t)if(~e.indexOf("pronouns")){if(~e.indexOf("any"))return"any pronouns";if(~e.indexOf("avoid"))return"avoid pronouns, use my name";if(~e.indexOf("ask"))return"ask for pronouns"}else{if(~e.indexOf("male"))return"possibly he/him";if(~e.indexOf("female"))return"possibly she/her";if(~e.indexOf("boy"))return"possibly he/him";if(~e.indexOf("girl"))return"possibly she/her"}return t?.[0]?.toLowerCase()};/**
* NOTICE OF LICENSE
*
* This source file is subject to the GNU General Public License (GPL-3.0).
* You can find more information in the LICENSE.md file.
* More information is also avaliable at this URL:
* https://opensource.org/licenses/GPL-3.0
* 
*
* @copyright Copyright (c) 2022 Paige Jordan
* @license   GPL-3.0 GNU General Public License v3.0
* @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/tree/main/plugins/pronoun-bio-scraper
*/const P={},_="https://pronoundb.org/api/v1/lookup?platform=discord&id=",w={hh:"he/him",hs:"he/she",si:"she/it",ih:"it/him",ii:"it/its",is:"it/she",hi:"he/it",ht:"he/they",sh:"she/her",shh:"she/he",th:"they/he",ti:"they/it",it:"it/they",st:"she/they",ts:"they/she",tt:"they/them",any:"any pronouns",other:"other pronouns",ask:"ask me my pronouns",avoid:"avoid pronouns, use my name"};var T=async e=>{if(P[e.id])return P[e.id];const t=await(await fetch(_+e.id)).json(),n=w[t.pronouns];return P[e.id]=n??"undefined",n};/**
* NOTICE OF LICENSE
*
* This source file is subject to the GNU General Public License (GPL-3.0).
* You can find more information in the LICENSE.md file.
* More information is also avaliable at this URL:
* https://opensource.org/licenses/GPL-3.0
* 
*
* @copyright Copyright (c) 2022 Paige Jordan
* @license   GPL-3.0 GNU General Public License v3.0
* @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/tree/main/plugins/pronoun-bio-scraper
*/var C=async e=>{if(!e)return;const t=await L(e);if(!i.persist.ghost.pronoundb)return t;let n=await T(e);n=n!=="undefined"?n:void 0;let s=t;return n&&t&&n!==t?s=`${n} | ${t} (scraped)`:s||(s=n),s};const v=r.findByProps("timestampInline");var U=({author:e})=>{const[t,n]=o.useState("still loading");return o.useEffect(async()=>{if(i.persist.ghost[e.id])return n(i.persist.ghost[e.id]);n(await C(e))}),o.createElement("span",{className:`${v.timestamp} ${v.timestampInline}`},t?`\u2022 ${t}`:"")};const $=r.findByDisplayName("SwitchItem");var j=()=>(y.useNest(i.persist),o.createElement(o.Fragment,null,o.createElement($,{onChange:()=>i.persist.store.pronoundb=!i.persist.ghost.pronoundb,value:i.persist.ghost.pronoundb},"PronounDB Support")));const M=r.findByDisplayName("Flex"),F=r.findByDisplayName("Anchor"),l=r.findByProps("DropdownSizes"),g=r.findByProps("Sizes","Tags"),H=r.findByDisplayName("TextInput"),G=r.findByProps("anchorUnderlineOnHover"),c=r.findByProps("ModalCloseButton");let d;var K=({event:e,author:t})=>{const[n,s]=o.useState("Loading..."),a=u=>{u.key==="Enter"&&(i.persist[t]=n,e.onClose())};return o.useEffect(()=>(document.addEventListener("keydown",a),()=>document.removeEventListener("keydown",a))),console.log(d),o.useEffect(async()=>{d=await C(t)??"";const u=i.persist.ghost[t.id]?i.persist.ghost[t.id]:d;s(u)},[]),o.createElement(c.ModalRoot,{transitionState:e.transitionState,className:"pronoun-overide-modal",size:"small"},o.createElement(O.ErrorBoundary,null,o.createElement(c.ModalHeader,{separator:!1},o.createElement(M.Child,{basis:"auto",grow:1,shrink:1,wrap:!1},o.createElement(g,{tag:"h2",size:g.Sizes.SIZE_20},"Override Pronouns")),o.createElement(M.Child,{basis:"auto",grow:0,shrink:1,wrap:!1},o.createElement(c.ModalCloseButton,{onClick:e.onClose}))),o.createElement(c.ModalContent,null,o.createElement(H,{placeholder:"cum/cumself",onChange:s,value:n}),o.createElement("div",{style:{marginTop:"3px"}}),o.createElement(F,{onClick:()=>s(d),className:G.anchorUnderlineOnHover,style:{fontSize:"14px"},cursor:"pointer"},"Reset Pronouns")),o.createElement(c.ModalFooter,null,o.createElement(l,{onClick:()=>{n===d?delete i.persist.store[t.id]:i.persist.store[t.id]=n,e.onClose()},color:l.Colors.BRAND_NEW},"Change Pronouns"),o.createElement(l,{onClick:e.onClose,look:l.Looks.LINK,color:l.Colors.TRANSPARENT},"Cancel"))))};const{openModal:W}=r.findByProps("openModal","openModalLazy"),x=r.findByProps("MenuGroup","MenuItem"),Z=r.find(e=>typeof e.default=="function"&&e.default.toString().includes("showAvatarPopout"));var q=()=>({onLoad(){f.patch(m.after("default",Z,([e],t)=>{const n=y.findInReactTree(t,s=>Array.isArray(s?.children)&&!s.children[0]);!n||n.children.push(o.createElement(U,{author:e.message.author}))})),f.lazyPatchContextMenu("MessageContextMenu",e=>{f.patch(m.after("default",e,([t],n)=>{y.findInReactTree(n,s=>s?.props?.id=="pronouns")||n.props.children.push(o.createElement(x.MenuGroup,null,o.createElement(x.MenuItem,{id:"pronouns",label:"Overide Pronouns",action:()=>W(s=>o.createElement(K,{event:s,author:t.message.author}))})))}))})},onUnload(){f.unpatchAll()},settings:o.createElement(j,null)});return q})(cumcord.modules.common.React,cumcord.patcher,cumcord.modules.webpack,cumcord.pluginData,cumcord.utils,cumcord.ui.components);
