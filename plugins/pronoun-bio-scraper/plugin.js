(function(r,s,y,t,R,f){"use strict";/**
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
*/const P=r.findByDisplayName("SwitchItem");var m=()=>(y.useNest(s.persist),t.React.createElement(P,{note:"This may get you rate limited if you hop to a bunch of servers in quick succession but you should for the most part be fine. (Use at your own discretion)",onChange:()=>s.persist.store.fetch=!s.persist.ghost.fetch,value:s.persist.ghost.fetch},'Automatically Fetch Pronouns (get rid of "still loading")'));/**
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
*/const g=r.findByDisplayName("Flex"),l=r.findByProps("DropdownSizes"),E=r.findByProps("Sizes","Tags"),B=r.findByDisplayName("TextInput"),d=r.findByProps("ModalCloseButton"),v=r.findByProps("getUser","filter").getUser;var x=({e,author:n,extract:o})=>{const p=n in s.persist?s.persist[n]:o(v(n).bio),[i,c]=t.React.useState(p),h=a=>{a.key==="Enter"&&(s.persist[n]=i,e.onClose())};return t.React.useEffect(()=>(document.addEventListener("keydown",h),()=>document.removeEventListener("keydown",h))),t.React.createElement(d.ModalRoot,{transitionState:e.transitionState,className:"pronoun-overide-modal",size:"small"},t.React.createElement(R.ErrorBoundary,null,t.React.createElement(d.ModalHeader,{separator:!1},t.React.createElement(g.Child,{basis:"auto",grow:1,shrink:1,wrap:!1},t.React.createElement(E,{tag:"h2",size:E.Sizes.SIZE_20},"Override Pronouns")),t.React.createElement(g.Child,{basis:"auto",grow:0,shrink:1,wrap:!1},t.React.createElement(d.ModalCloseButton,{onClick:e.onClose}))),t.React.createElement(d.ModalContent,null,t.React.createElement(B,{onChange:a=>{c(a)},value:i})),t.React.createElement(d.ModalFooter,null,t.React.createElement(l,{onClick:()=>{s.persist[n]=i,e.onClose()},color:l.Colors.BRAND_NEW},"Change Pronouns"),t.React.createElement(l,{onClick:e.onClose,look:l.Looks.LINK,color:l.Colors.TRANSPARENT},"Cancel"))))};/**
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
*/const{getMessage:N}=r.findByProps("getMessages"),{fetchProfile:z}=r.findByProps("fetchProfile"),{getUserProfile:I}=r.findByProps("getUserProfile"),{getChannelId:S}=r.findByProps("getVoiceChannelId"),{openModal:U}=r.findByProps("openModal","openModalLazy"),{getUser:T}=r.findByProps("getUser","getCurrentUser"),C=r.findByProps("MenuGroup","MenuItem"),O=r.find(e=>e.default?.displayName==="MessageTimestamp"),A=r.find(e=>e.default?.displayName==="MessageContextMenu"),M=e=>{if(!e)return;e=e.replace(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,"");let n=e.match(/[a-z]+?(?:\/[a-z]+)+/i);if(!n&&~e.indexOf("pronouns")){if(~e.indexOf("any"))return"any pronouns";if(~e.indexOf("avoid"))return"avoid pronouns, use my name";if(~e.indexOf("ask"))return"ask for pronouns"}if(n)return n[0]};let u=[];var L=()=>({onLoad(){u.push(f.after("default",O,([e],n)=>{let o=N(S(),e.id?.substring(18)),p=T(o?.author?.id),i=I(o?.author?.id),c=o?.author?.id in s.persist?s.persist[o.author.id]:i?M(p?.bio):"still loading";!c||(!i&&s.persist.ghost.fetch&&z(o?.author?.id),u.push(f.after("children",n.props.children.props,(h,a)=>{if(a.props.children.props.children[1]!=="edited")return a.props.children.props.children[1]+=` \u2022 ${c}`,a})))})),u.push(f.after("default",A,([e],n)=>(y.findInReactTree(n,o=>o?.props?.id=="pronouns")||n.props.children.push(t.React.createElement(C.MenuGroup,null,t.React.createElement(C.MenuItem,{id:"pronouns",label:"Overide Pronouns",action:()=>U(o=>t.React.createElement(x,{e:o,author:e.message.author.id,extract:M}))}))),n)))},onUnload(){u.forEach(e=>e())},settings:t.React.createElement(m,null)});return L})(cumcord.modules.webpack,cumcord.pluginData,cumcord.utils,cumcord.modules.common,cumcord.ui.components,cumcord.patcher);
