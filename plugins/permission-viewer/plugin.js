(function(y,e,s,P){"use strict";const R=[];var d={patch:l=>l&&R.push(l),unpatchAll:()=>R.forEach(l=>l()),lazyPatchContextMenu:async(l,t)=>{const i=a=>a.default&&a.default.displayName===l,r=s.find(i,!1);if(r)t(r);else{const a=s.findByProps("openContextMenuLazy");R.unshift(y.before("openContextMenuLazy",a,n=>{const c=n[1];return n[1]=async()=>{const o=await c(n[0]);return B=>{const f=o(B);return f?.type?.displayName===l&&t&&(R[0](),t(s.find(i)),t=!1),f}},n}))}}};/**
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
*/const C=s.findByDisplayName("Flex"),I=s.findByDisplayName("Text"),M=s.findByDisplayName("TabBar"),g=s.findByDisplayName("Close"),D=s.findByDisplayName("Checkmark"),E=s.findByProps("ModalCloseButton"),{Permissions:u}=e.constants,h={TabBar:s.findByProps("tabBarContainer"),ReactionModal:s.findByProps("spinnerMore"),RoleMenu:s.findByProps("roleDot","sidebar")};var m=({event:l,roles:t={},permissions:i})=>{const[r,a]=e.React.useState(Object.keys(t)[0]);return e.React.createElement(E.ModalRoot,{transitionState:l.transitionState,className:h.ReactionModal.container,size:"large"},e.React.createElement(P.ErrorBoundary,null,i||e.React.createElement(E.ModalContent,null,e.React.createElement(M,{selectedItem:r,type:M.Types.SIDE,onItemSelect:a},Object.keys(t).map(n=>e.React.createElement(M.Item,{id:t[n].id,className:h.RoleMenu.row,itemType:M.Types.SIDE},e.React.createElement("div",{className:h.RoleMenu.roleDot,style:{backgroundColor:t[n].colorString||"#99aab5"}}),e.React.createElement(I,{className:h.RoleMenu.roleName},t[n].name))))),e.React.createElement(E.ModalContent,null,Object.keys(u).map(n=>{const c=r?t[r].permissions:i,o=t?.[r]?.permissionsDeny,B=(c&u.ADMINISTRATOR)===u.ADMINISTRATOR;return e.React.createElement(C,{style:{paddingLeft:"12px",paddingRight:"264px"},align:"alignCenter-14kD11",className:"reactorDefault-3GSyaV reactor-1J25Qp"},e.React.createElement(C.Child,{grow:0,shrink:0},(c&u[n])===u[n]&&(o?(o&u[n])!==u[n]:!0)||B?e.React.createElement(D,{className:!0,height:24,width:24,color:"#43B581"}):e.React.createElement(g,{height:24,width:24,color:"#F04747"})),e.React.createElement(C.Child,null,e.React.createElement(I,null,n.charAt(0).toUpperCase()+n.slice(1).toLowerCase().replace(/_\w/g,f=>" "+f.toUpperCase().slice(1)))))}))))};/**
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
*/const p=s.findByProps("MenuGroup","MenuItem"),{Permissions:N}=e.constants,{getGuild:O}=s.findByProps("getGuild"),{getMember:T}=s.findByProps("getMember"),{openModal:x}=s.findByProps("openModal","openModalLazy"),S=()=>{d.lazyPatchContextMenu("GuildContextMenu",l=>{d.patch(y.after("default",l,([t],i)=>{i?.props?.children?.splice(1,0,e.React.createElement(e.React.Fragment,null,e.React.createElement(p.MenuSeparator,null),e.React.createElement(p.MenuItem,{label:"View Permissions",id:"permissions",action:()=>{x(r=>e.React.createElement(m,{event:r,roles:t.guild.roles}))}})))}))})},z=()=>{d.lazyPatchContextMenu("GuildChannelUserContextMenu",l=>{d.patch(y.after("default",l,([t],i)=>{const r=O(t.guildId),a=T(t.guildId,t.user.id),n=r.ownerId===t.user.id?Object.values(N).reduce((c,o)=>c|o,0n):Object.values(r.roles).reduce((c,o)=>~a.roles.indexOf(o.id)?c|o.permissions:c,0n|r.roles[t.guildId].permissions);i?.props?.children?.props?.children?.splice(2,0,e.React.createElement(e.React.Fragment,null,e.React.createElement(p.MenuSeparator,null),e.React.createElement(p.MenuItem,{label:"View Permissions",id:"permissions",action:()=>{x(c=>e.React.createElement(m,{event:c,permissions:n}))}})))}))})},v=()=>{d.lazyPatchContextMenu("ChannelListTextChannelContextMenu",l=>{d.patch(y.after("default",l,([t],i)=>{const r=Object.values(t.guild.roles).map(a=>{if(!~Object.keys(t.channel.permissionOverwrites).indexOf(a.id))return;const n={...a};return n.permissions|=t.channel.permissionOverwrites[a.id].allow,n.permissionsDeny=t.channel.permissionOverwrites[a.id].deny,n}).filter(Boolean).reduce((a,n)=>Object.assign(a,{[n.id]:n}),{});i?.props?.children?.splice(1,0,e.React.createElement(e.React.Fragment,null,e.React.createElement(p.MenuSeparator,null),e.React.createElement(p.MenuItem,{label:"View Permissions",id:"permissions",action:()=>{x(a=>e.React.createElement(m,{event:a,roles:r}))}})))}))})};var L=()=>({onLoad(){S(),z(),v()},onUnload(){d.unpatchAll()}});return L})(cumcord.patcher,cumcord.modules.common,cumcord.modules.webpack,cumcord.ui.components);
