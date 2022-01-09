(function(r,M,a,t,f,R){"use strict";/**
* NOTICE OF LICENSE
*
* This source file is subject to the GNU General Public License (GPL-3.0).
* You can find more information in the LICENSE.md file.
* More information is also avaliable at this URL:
* https://opensource.org/licenses/GPL-3.0
* 
*
* @copyright Copyright (c) 2021 Paige Jordan
* @license   GPL-3.0 GNU General Public License v3.0
* @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/pronoun-bio-scraper
*/const g=r.findByDisplayName("Flex"),l=r.findByProps("DropdownSizes"),E=r.findByProps("Sizes","Tags"),P=r.findByDisplayName("TextInput"),i=r.findByProps("ModalCloseButton"),m=r.findByProps("getUser","filter").getUser;var B=({e,author:n,extract:s})=>{const p=n in a.persist?a.persist[n]:s(m(n).bio),[d,c]=t.React.useState(p),h=o=>{o.key==="Enter"&&(a.persist[n]=d,e.onClose())};return t.React.useEffect(()=>(document.addEventListener("keydown",h),()=>document.removeEventListener("keydown",h))),t.React.createElement(i.ModalRoot,{transitionState:e.transitionState,className:"pronoun-overide-modal",size:"small"},t.React.createElement(M.ErrorBoundary,null,t.React.createElement(i.ModalHeader,{separator:!1},t.React.createElement(g.Child,{basis:"auto",grow:1,shrink:1,wrap:!1},t.React.createElement(E,{tag:"h2",size:E.Sizes.SIZE_20},"Override Pronouns")),t.React.createElement(g.Child,{basis:"auto",grow:0,shrink:1,wrap:!1},t.React.createElement(i.ModalCloseButton,{onClick:e.onClose}))),t.React.createElement(i.ModalContent,null,t.React.createElement(P,{onChange:o=>{console.log(o),c(o)},value:d})),t.React.createElement(i.ModalFooter,null,t.React.createElement(l,{onClick:()=>{a.persist[n]=d,e.onClose()},color:l.Colors.BRAND_NEW},"Change Pronouns"),t.React.createElement(l,{onClick:e.onClose,look:l.Looks.LINK,color:l.Colors.TRANSPARENT},"Cancel"))))};/**
* NOTICE OF LICENSE
*
* This source file is subject to the GNU General Public License (GPL-3.0).
* You can find more information in the LICENSE.md file.
* More information is also avaliable at this URL:
* https://opensource.org/licenses/GPL-3.0
* 
*
* @copyright Copyright (c) 2021 Paige Jordan
* @license   GPL-3.0 GNU General Public License v3.0
* @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/pronoun-bio-scraper
*/const{getMessage:x}=r.findByProps("getMessages"),{getUserProfile:v}=r.findByProps("getUserProfile"),{getChannelId:z}=r.findByProps("getVoiceChannelId"),{openModal:N}=r.findByProps("openModal","openModalLazy"),{getUser:U}=r.findByProps("getUser","getCurrentUser"),y=r.findByProps("MenuGroup","MenuItem"),I=r.find(e=>e.default?.displayName==="MessageTimestamp"),S=r.find(e=>e.default?.displayName==="MessageContextMenu"),C=e=>{if(!e)return;e=e.replace(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,"");let n=e.match(/[a-z]+?(?:\/[a-z]+)+/i);if(!n&&~e.indexOf("pronouns")){if(~e.indexOf("any"))return"any pronouns";if(~e.indexOf("avoid"))return"avoid pronouns, use my name";if(~e.indexOf("ask"))return"ask for pronouns"}if(n)return n[0]};let u=[];var T=()=>({onLoad(){u.push(f.after("default",I,([e],n)=>{let s=x(z(),e.id?.substring(18)),p=U(s?.author?.id),d=v(s?.author?.id),c=s?.author?.id in a.persist?a.persist[s.author.id]:d?C(p?.bio):"still loading";!c||u.push(f.after("children",n.props.children.props,(h,o)=>{if(o.props.children.props.children[1]!=="edited")return o.props.children.props.children[1]+=` \u2022 ${c}`,o}))})),u.push(f.after("default",S,([e],n)=>(R.findInReactTree(n,s=>s?.props?.id=="pronouns")||n.props.children.push(t.React.createElement(y.MenuGroup,null,t.React.createElement(y.MenuItem,{id:"pronouns",label:"Overide Pronouns",action:()=>N(s=>t.React.createElement(B,{e:s,author:e.message.author.id,extract:C}))}))),n)))},onUnload(){u.forEach(e=>e())}});return T})(cumcord.modules.webpack,cumcord.ui.components,cumcord.pluginData,cumcord.modules.common,cumcord.patcher,cumcord.utils);
