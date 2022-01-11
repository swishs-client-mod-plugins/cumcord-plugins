(function(s,o,P,t,m,f){"use strict";/**
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
* @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/pronoun-bio-scraper
*/const B=s.findByDisplayName("SwitchItem");var v=()=>(P.useNest(o.persist),t.React.createElement(B,{note:"This may get you rate limited if you hop to a bunch of servers in quick succession but you should for the most part be fine. (Use at your own discretion)",onChange:()=>o.persist.store.fetch=!o.persist.ghost.fetch,value:o.persist.ghost.fetch},'Automatically Fetch Pronouns (get rid of "still loading")'));/**
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
* @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/pronoun-bio-scraper
*/const g=s.findByDisplayName("Flex"),l=s.findByProps("DropdownSizes"),E=s.findByProps("Sizes","Tags"),x=s.findByDisplayName("TextInput"),d=s.findByProps("ModalCloseButton"),N=s.findByProps("getUser","filter").getUser;var z=({e,author:n,extract:r})=>{const h=n in o.persist?o.persist[n]:r(N(n).bio),[a,c]=t.React.useState(h),y=i=>{i.key==="Enter"&&(o.persist[n]=a,e.onClose())};return t.React.useEffect(()=>(document.addEventListener("keydown",y),()=>document.removeEventListener("keydown",y))),t.React.createElement(d.ModalRoot,{transitionState:e.transitionState,className:"pronoun-overide-modal",size:"small"},t.React.createElement(m.ErrorBoundary,null,t.React.createElement(d.ModalHeader,{separator:!1},t.React.createElement(g.Child,{basis:"auto",grow:1,shrink:1,wrap:!1},t.React.createElement(E,{tag:"h2",size:E.Sizes.SIZE_20},"Override Pronouns")),t.React.createElement(g.Child,{basis:"auto",grow:0,shrink:1,wrap:!1},t.React.createElement(d.ModalCloseButton,{onClick:e.onClose}))),t.React.createElement(d.ModalContent,null,t.React.createElement(x,{onChange:i=>{c(i)},value:a})),t.React.createElement(d.ModalFooter,null,t.React.createElement(l,{onClick:()=>{o.persist[n]=a,e.onClose()},color:l.Colors.BRAND_NEW},"Change Pronouns"),t.React.createElement(l,{onClick:e.onClose,look:l.Looks.LINK,color:l.Colors.TRANSPARENT},"Cancel"))))};/**
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
* @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/pronoun-bio-scraper
*/const{getMessage:I}=s.findByProps("getMessages"),{fetchProfile:S}=s.findByProps("fetchProfile"),{getUserProfile:U}=s.findByProps("getUserProfile"),{getChannelId:T}=s.findByProps("getVoiceChannelId"),{openModal:O}=s.findByProps("openModal","openModalLazy"),{getUser:A}=s.findByProps("getUser","getCurrentUser"),C=s.findByProps("MenuGroup","MenuItem"),L=s.find(e=>e.default?.displayName==="MessageTimestamp"),_=s.find(e=>e.default?.displayName==="MessageContextMenu"),M=e=>{if(!e)return;e=e.replace(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,"");let n=e.match(/[a-z]+?(?:\/[a-z]+)+/i);if(!n&&~e.indexOf("pronouns")){if(~e.indexOf("any"))return"any pronouns";if(~e.indexOf("avoid"))return"avoid pronouns, use my name";if(~e.indexOf("ask"))return"ask for pronouns"}if(n)return n[0]};let u=[],p=[],R=[];var F=()=>({onLoad(){u.push(f.after("default",L,([e],n)=>{let r=I(T(),e.id?.substring(18)),h=A(r?.author?.id),a=!U(r?.author?.id);a&&o.persist.ghost.fetch&&!R.includes(r?.author?.id)&&p.includes(r?.id)&&(R.push(r?.author?.id),S(r?.author?.id)),p.includes(r?.id)||p.push(r?.id);let c=r?.author?.id in o.persist?o.persist[r.author.id]:a?"still loading":M(h?.bio);!c||u.push(f.after("children",n.props.children.props,(y,i)=>{if(i.props.children.props.children[1]!=="edited")return i.props.children.props.children[1]+=` \u2022 ${c}`,i}))})),u.push(f.after("default",_,([e],n)=>(filndInReactTree(n,r=>r?.props?.id=="pronouns")||n.props.children.push(t.React.createElement(C.MenuGroup,null,t.React.createElement(C.MenuItem,{id:"pronouns",label:"Overide Pronouns",action:()=>O(r=>t.React.createElement(z,{e:r,author:e.message.author.id,extract:M}))}))),n)))},onUnload(){u.forEach(e=>e())},settings:t.React.createElement(v,null)});return F})(cumcord.modules.webpack,cumcord.pluginData,cumcord.utils,cumcord.modules.common,cumcord.ui.components,cumcord.patcher);
