(function(y,r,a,s,P,B){"use strict";const E=[];var f={patch:e=>e&&E.push(e),unpatchAll:()=>E.forEach(async e=>await e()),lazyPatchContextMenu:async(e,t)=>{const n=i=>i.default&&i.default.displayName===e,o=r.find(n);if(o)t(o);else{const i=r.findByProps("openContextMenuLazy");let u=y.before("openContextMenuLazy",i,p=>{const Z=p[1];return p[1]=async()=>{const k=await Z(p[0]);return q=>{const x=k(q);return x?.type?.displayName===e&&t&&(u(),t(r.find(n)),t=!1),x}},p})}}};/**
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
*/const{fetchProfile:z}=r.findByProps("fetchProfile"),{getUserProfile:S}=r.findByProps("getUserProfile"),{getUser:N}=r.findByProps("getUser","getCurrentUser"),h=[];var O=async e=>{!S(e.id)&&!h.includes(e.id)&&(h.push(e.id),await z(e.id),h.splice(h.length-1,1));const n=N(e.id);if(!!n)return I(n.bio)};const I=e=>{if(!e)return;e=e.replace(/(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-z0-9@:%_\+.~#?&//=]*)/gi,"");let t=e.match(/[a-z]+?(?:\/[a-z]+)+/i);if(!t)if(~e.indexOf("pronouns")){if(~e.indexOf("any"))return"any pronouns";if(~e.indexOf("avoid"))return"avoid pronouns, use my name";if(~e.indexOf("ask"))return"ask for pronouns"}else{if(~e.indexOf("male"))return"possibly he/him";if(~e.indexOf("female"))return"possibly she/her";if(~e.indexOf("boy"))return"possibly he/him";if(~e.indexOf("girl"))return"possibly she/her"}return t?.[0]?.toLowerCase()};/**
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
*/const R={},A="https://pronoundb.org/api/v1/lookup?platform=discord&id=",L={hh:"he/him",hs:"he/she",si:"she/it",ih:"it/him",ii:"it/its",is:"it/she",hi:"he/it",ht:"he/they",sh:"she/her",shh:"she/he",th:"they/he",ti:"they/it",it:"it/they",st:"she/they",ts:"they/she",tt:"they/them",any:"any pronouns",other:"other pronouns",ask:"ask me my pronouns",avoid:"avoid pronouns, use my name"};var T=async e=>{if(R[e.id])return R[e.id];const t=await(await fetch(A+e.id)).json(),n=L[t.pronouns];return R[e.id]=n??"undefined",n};/**
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
*/var C=async e=>{if(!e)return;const t=await O(e);if(!a.persist.ghost.pronoundb)return t;let n=await T(e);n=n!=="undefined"?n:void 0;let o=t;return n&&t&&n!==t?o=`${n} | ${t} (scraped)`:o||(o=n),o};/**
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
*/const m=r.findByProps("timestampInline");var U=({author:e})=>{const[t,n]=s.React.useState("still loading");return s.React.useEffect(async()=>{if(a.persist.ghost[e.id])return n(a.persist.ghost[e.id]);n(await C(e))}),s.React.createElement("span",{className:`${m.timestamp} ${m.timestampInline}`},t?`\u2022 ${t}`:"")};/**
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
*/const w=r.findByDisplayName("SwitchItem");var $=()=>(P.useNest(a.persist),s.React.createElement(s.React.Fragment,null,s.React.createElement(w,{onChange:()=>a.persist.store.pronoundb=!a.persist.ghost.pronoundb,value:a.persist.ghost.pronoundb},"PronounDB Support")));/**
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
*/const M=r.findByDisplayName("Flex"),F=r.findByDisplayName("Anchor"),l=r.findByProps("DropdownSizes"),v=r.findByProps("Sizes","Tags"),H=r.findByDisplayName("TextInput"),_=r.findByProps("anchorUnderlineOnHover"),d=r.findByProps("ModalCloseButton");let c;var G=({event:e,author:t})=>{const[n,o]=s.React.useState("Loading..."),i=u=>{u.key==="Enter"&&(a.persist[t]=n,e.onClose())};return s.React.useEffect(()=>(document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i))),console.log(c),s.React.useEffect(async()=>{c=await C(t)??"";const u=a.persist.ghost[t.id]?a.persist.ghost[t.id]:c;o(u)},[]),s.React.createElement(d.ModalRoot,{transitionState:e.transitionState,className:"pronoun-overide-modal",size:"small"},s.React.createElement(B.ErrorBoundary,null,s.React.createElement(d.ModalHeader,{separator:!1},s.React.createElement(M.Child,{basis:"auto",grow:1,shrink:1,wrap:!1},s.React.createElement(v,{tag:"h2",size:v.Sizes.SIZE_20},"Override Pronouns")),s.React.createElement(M.Child,{basis:"auto",grow:0,shrink:1,wrap:!1},s.React.createElement(d.ModalCloseButton,{onClick:e.onClose}))),s.React.createElement(d.ModalContent,null,s.React.createElement(H,{placeholder:"cum/cumself",onChange:o,value:n}),s.React.createElement("div",{style:{marginTop:"3px"}}),s.React.createElement(F,{onClick:()=>o(c),className:_.anchorUnderlineOnHover,style:{fontSize:"14px"},cursor:"pointer"},"Reset Pronouns")),s.React.createElement(d.ModalFooter,null,s.React.createElement(l,{onClick:()=>{n===c?delete a.persist.store[t.id]:a.persist.store[t.id]=n,e.onClose()},color:l.Colors.BRAND_NEW},"Change Pronouns"),s.React.createElement(l,{onClick:e.onClose,look:l.Looks.LINK,color:l.Colors.TRANSPARENT},"Cancel"))))};/**
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
*/const{openModal:j}=r.findByProps("openModal","openModalLazy"),g=r.findByProps("MenuGroup","MenuItem"),K=r.find(e=>typeof e.default=="function"&&e.default.toString().includes("showAvatarPopout"));var W=()=>({onLoad(){f.patch(y.after("default",K,([e],t)=>{const n=P.findInReactTree(t,o=>Array.isArray(o?.children)&&!o.children[0]);!n||n.children.push(s.React.createElement(U,{author:e.message.author}))})),f.lazyPatchContextMenu("MessageContextMenu",e=>{f.patch(y.after("default",e,([t],n)=>{P.findInReactTree(n,o=>o?.props?.id=="pronouns")||n.props.children.push(s.React.createElement(g.MenuGroup,null,s.React.createElement(g.MenuItem,{id:"pronouns",label:"Overide Pronouns",action:()=>j(o=>s.React.createElement(G,{event:o,author:t.message.author}))})))}))})},onUnload(){f.unpatchAll()},settings:s.React.createElement($,null)});return W})(cumcord.patcher,cumcord.modules.webpack,cumcord.pluginData,cumcord.modules.common,cumcord.utils,cumcord.ui.components);
