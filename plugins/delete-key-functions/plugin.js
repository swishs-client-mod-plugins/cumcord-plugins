(function(e,u,l,s,C){"use strict";const y=[];var c={patch:t=>t&&y.push(t),unpatchAll:()=>y.forEach(t=>t())};/**
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
* @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/tree/main/plugins/delete-key-functions
*/const{colorStatusRed:v}=s.findByProps("colorStatusRed"),G=s.findByDisplayName("Text"),R=s.findByDisplayName("FormText"),i=s.findByDisplayName("SwitchItem");var M=()=>(C.useNest(e.persist),l.React.createElement(l.React.Fragment,null,l.React.createElement(i,{note:"Delete messages (if you can) when you hold delete and clock on them.",onChange:()=>e.persist.store.deleteMessages=!e.persist.ghost.deleteMessages,value:e.persist.ghost.deleteMessages},"Delete Messages"),l.React.createElement(i,{note:"Delete all channel types when you hold delete and click on them.",onChange:()=>e.persist.store.deleteChannels=!e.persist.ghost.deleteChannels,value:e.persist.ghost.deleteChannels},"Delete Channels"),l.React.createElement(i,{note:"Close direct message channels when you hold delete and click on them.",onChange:()=>e.persist.store.closeDMs=!e.persist.ghost.closeDMs,value:e.persist.ghost.closeDMs},"Close DMs"),l.React.createElement(i,{note:"Will leave guilds when you hold down delete and click on them.",onChange:()=>e.persist.store.leaveGuilds=!e.persist.ghost.leaveGuilds,value:e.persist.ghost.leaveGuilds},"Leave Guilds"),l.React.createElement(i,{note:"Delete roles in the role menu when you hold delete and click on them.",onChange:()=>e.persist.store.deleteRoles=!e.persist.ghost.deleteRoles,value:e.persist.ghost.deleteRoles},"Delete Roles"),l.React.createElement(i,{note:l.React.createElement(R,{type:"description"},l.React.createElement(G,{tag:"span",style:{fontWeight:"bold"},color:v},"WARNING:"," "),"no confirmation will be asked for, I would recommend leaving this off."),onChange:()=>e.persist.store.deleteGuilds=!e.persist.ghost.deleteGuilds,value:e.persist.ghost.deleteGuilds,disabled:!e.persist.ghost.leaveGuilds},"Delete Guilds")));/**
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
* @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/tree/main/plugins/delete-key-functions
*/const E=()=>{if(!e.persist.ghost.deleteMessages)return;const t=s.findByProps("canManageUser"),{deleteMessage:d}=s.findByProps("deleteMessage"),{getCurrentUser:n}=s.findByProps("getCurrentUser"),o=s.find(r=>r.default?.displayName==="Message");return u.after("default",o,([r],a)=>{if(!r?.childrenAccessories?.props||!a?.props)return a;const p=r.childrenAccessories.props.message,m=r.childrenAccessories.props.channel,N=t.can(l.constants.Permissions.MANAGE_MESSAGES,m),I=n().id===p?.author?.id;a.props.children.props.onClick=()=>{!h||!(N||I)||d(m.id,p.id)}})},g=()=>{if(!e.persist.ghost.closeDMs&&!e.persist.ghost.deleteChannels)return;const{deleteChannel:t}=s.findByProps("deleteChannel"),d=s.findByProps("selectChannel");return u.instead("selectChannel",d,(n,o)=>{if(n[0]==="@me"&&!e.persist.ghost.closeDMs)return o(...n);if(n[0]!=="@me"&&!e.persist.ghost.deleteChannels)return o(...n);if(!h)return o(...n);t(n[1])})},B=()=>{if(!e.persist.ghost.deleteChannels)return;const{deleteChannel:t}=s.findByProps("deleteChannel"),d=s.findByProps("selectVoiceChannel");return u.instead("selectVoiceChannel",d,(n,o)=>{if(!h)return o(...n);t(n[0])})},P=()=>{if(!e.persist.ghost.leaveGuilds)return;const{leaveGuild:t,deleteGuild:d}=s.findByProps("leaveGuild"),{getGuild:n}=s.findByProps("getGuild"),o=s.findByProps("selectGuild");return u.instead("selectGuild",o,([r],a)=>{if(!h)return a(...r);t(r).catch(()=>!e.persist.ghost.deleteGuilds||d(r,n(r).name))})},S=()=>{if(!e.persist.ghost.deleteRoles)return;const{deleteRole:t}=s.findByProps("deleteRole"),{getGuildId:d}=s.findByProps("getGuildId"),n=s.findByProps("selectRole");return u.instead("selectRole",n,(o,r)=>{if(!h)return r(...o);t(d(),o[0])})};let h;const f=t=>t.key==="Delete"&&(h=t.type==="keydown");var A=()=>({onLoad(){document.addEventListener("keydown",f),document.addEventListener("keyup",f),c.patch(E()),c.patch(g()),c.patch(B()),c.patch(P()),c.patch(S())},onUnload(){document.removeEventListener("keydown",f),document.removeEventListener("keyup",f),c.unpatchAll()},settings:l.React.createElement(M,null)});return A})(cumcord.pluginData,cumcord.patcher,cumcord.modules.common,cumcord.modules.webpack,cumcord.utils);
