(function(c,t,n){"use strict";const i=[];var d={patch:e=>e&&i.push(e),unpatchAll:()=>i.forEach(e=>e()),lazyPatchContextMenu:async(e,a)=>{const l=o=>o.default&&o.default.displayName===e,r=t.find(l);if(r)a(r);else{const o=t.findByProps("openContextMenuLazy");let x=c.before("openContextMenuLazy",o,s=>{const z=s[1];return s[1]=async()=>{const L=await z(s[0]);return R=>{const f=L(R);return f?.type?.displayName===e&&a&&(x(),a(t.find(l)),a=!1),f}},s})}}};/**
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
* @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/tree/main/plugins/enlarged-pfp-viewer
*/const p=t.findByDisplayName("ImageModal"),y=t.findByDisplayName("MaskedLink"),u=t.findByProps("MenuGroup","MenuItem"),h=t.findByProps("ModalCloseButton"),{downloadLink:m}=t.findByProps("downloadLink"),{openModal:C}=t.findByProps("openModal","openModalLazy"),M=e=>`${e.substring(0,e.lastIndexOf("."))}.png?size=1024`;var P=()=>({onLoad(){["DMUserContextMenu","GuildChannelUserContextMenu"].map(e=>{d.lazyPatchContextMenu(e,a=>{d.patch(c.after("default",a,([l],r)=>{r?.props?.children?.props?.children?.splice(2,0,n.React.createElement(n.React.Fragment,null,n.React.createElement(u.MenuSeparator,null),n.React.createElement(u.MenuItem,{label:"Enlarge PFP",id:"enlarge",action:()=>{C(o=>n.React.createElement(h.ModalRoot,{transitionState:o.transitionState,size:"medium"},n.React.createElement(p,{height:1024,width:1024,src:M(l.user.getAvatarURL())}),n.React.createElement(y,{className:m,href:M(l.user.getAvatarURL())},"Open original")))}})))}))})})},onUnload(){d.unpatchAll()}});return P})(cumcord.patcher,cumcord.modules.webpack,cumcord.modules.common);
