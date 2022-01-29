(function(R,e,s,g){"use strict";const B=[];var d={patch:l=>l&&B.push(l),unpatchAll:()=>B.forEach(l=>l()),lazyPatchContextMenu:async(l,t)=>{const c=a=>a.default&&a.default.displayName===l,r=s.find(c);if(r)t(r);else{const a=s.findByProps("openContextMenuLazy");let n=R.before("openContextMenuLazy",a,i=>{const o=i[1];return i[1]=async()=>{const m=await o(i[0]);return x=>{const P=m(x);return P?.type?.displayName===l&&t&&(n(),t(s.find(c)),t=!1),P}},i})}}};/**
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
* @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/tree/main/plugins/permission-viewer
*/const M=s.findByDisplayName("Flex"),I=s.findByDisplayName("Text"),h=s.findByDisplayName("TabBar"),D=s.findByDisplayName("Close"),N=s.findByDisplayName("Checkmark"),C=s.findByProps("ModalCloseButton"),{Permissions:u}=e.constants,y={TabBar:s.findByProps("tabBarContainer"),ReactionModal:s.findByProps("spinnerMore"),RoleMenu:s.findByProps("roleDot","sidebar")};var f=({event:l,roles:t={},permissions:c})=>{const[r,a]=e.React.useState(Object.keys(t)[0]);return e.React.createElement(C.ModalRoot,{transitionState:l.transitionState,className:y.ReactionModal.container,size:"large"},e.React.createElement(g.ErrorBoundary,null,c||e.React.createElement(C.ModalContent,null,e.React.createElement(h,{selectedItem:r,type:h.Types.SIDE,onItemSelect:a},Object.keys(t).map(n=>e.React.createElement(h.Item,{id:t[n].id,className:y.RoleMenu.row,itemType:h.Types.SIDE},e.React.createElement("div",{className:y.RoleMenu.roleDot,style:{backgroundColor:t[n].colorString||"#99aab5"}}),e.React.createElement(I,{className:y.RoleMenu.roleName},t[n].name))))),e.React.createElement(C.ModalContent,null,Object.keys(u).map(n=>{const i=r?t[r].permissions:c,o=t?.[r]?.permissionsDeny,m=(i&u.ADMINISTRATOR)===u.ADMINISTRATOR;return e.React.createElement(M,{style:{paddingLeft:"12px",paddingRight:"264px"},align:M.Align.CENTER,className:y.ReactionModal.reactorDefault},e.React.createElement(M.Child,{grow:0,shrink:0},(i&u[n])===u[n]&&(o?(o&u[n])!==u[n]:!0)||m?e.React.createElement(N,{height:24,width:24,color:"#43B581"}):e.React.createElement(D,{height:24,width:24,color:"#F04747"})),e.React.createElement(M.Child,null,e.React.createElement(I,null,n.charAt(0).toUpperCase()+n.slice(1).toLowerCase().replace(/_\w/g,x=>" "+x.toUpperCase().slice(1)))))}))))};/**
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
* @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/tree/main/plugins/permission-viewer
*/const p=s.findByProps("MenuGroup","MenuItem"),{Permissions:O}=e.constants,{getGuild:T}=s.findByProps("getGuild"),{getMember:z}=s.findByProps("getMember"),{openModal:E}=s.findByProps("openModal","openModalLazy"),S=()=>{d.lazyPatchContextMenu("GuildContextMenu",l=>{d.patch(R.after("default",l,([t],c)=>{c?.props?.children?.splice(1,0,e.React.createElement(e.React.Fragment,null,e.React.createElement(p.MenuSeparator,null),e.React.createElement(p.MenuItem,{label:"View Permissions",id:"permissions",action:()=>{E(r=>e.React.createElement(f,{event:r,roles:t.guild.roles}))}})))}))})},v=()=>{d.lazyPatchContextMenu("GuildChannelUserContextMenu",l=>{d.patch(R.after("default",l,([t],c)=>{const r=T(t.guildId),a=z(t.guildId,t.user.id),n=r.ownerId===t.user.id?Object.values(O).reduce((i,o)=>i|o,0n):Object.values(r.roles).reduce((i,o)=>~a.roles.indexOf(o.id)?i|o.permissions:i,0n|r.roles[t.guildId].permissions);c?.props?.children?.props?.children?.splice(2,0,e.React.createElement(e.React.Fragment,null,e.React.createElement(p.MenuSeparator,null),e.React.createElement(p.MenuItem,{label:"View Permissions",id:"permissions",action:()=>{E(i=>e.React.createElement(f,{event:i,permissions:n}))}})))}))})},L=()=>{d.lazyPatchContextMenu("ChannelListTextChannelContextMenu",l=>{d.patch(R.after("default",l,([t],c)=>{const r=Object.values(t.guild.roles).map(a=>{if(!~Object.keys(t.channel.permissionOverwrites).indexOf(a.id))return;const n={...a};return n.permissions|=t.channel.permissionOverwrites[a.id].allow,n.permissionsDeny=t.channel.permissionOverwrites[a.id].deny,n}).filter(Boolean).reduce((a,n)=>Object.assign(a,{[n.id]:n}),{});c?.props?.children?.splice(1,0,e.React.createElement(e.React.Fragment,null,e.React.createElement(p.MenuSeparator,null),e.React.createElement(p.MenuItem,{label:"View Permissions",id:"permissions",action:()=>{E(a=>e.React.createElement(f,{event:a,roles:r}))}})))}))})};var A=()=>({onLoad(){S(),v(),L()},onUnload(){d.unpatchAll()}});return A})(cumcord.patcher,cumcord.modules.common,cumcord.modules.webpack,cumcord.ui.components);