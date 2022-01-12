/**
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
 */

import Settings from './Settings';
import OverrideModal from './OverrideModal';

import { after } from '@cumcord/patcher';
import { persist } from '@cumcord/pluginData';
import { findInReactTree } from '@cumcord/utils';
import { FluxDispatcher } from '@cumcord/modules/common';
import { find, findByProps } from '@cumcord/modules/webpack';

const { fetchProfile } = findByProps('fetchProfile');
const { getUserProfile } = findByProps('getUserProfile');
const { getChannelId } = findByProps('getVoiceChannelId');
const { openModal } = findByProps('openModal', 'openModalLazy');
const { getMessage } = findByProps('getMessages', 'getMessage');
const { getUser: getCachedUser } = findByProps('getUser', 'getCurrentUser');

const Menu = findByProps('MenuGroup', 'MenuItem');
const MessageTimestamp = find(m => m.default?.displayName === 'MessageTimestamp');
const MessageContextMenu = find(m => m.default?.displayName === 'MessageContextMenu');

const extractPronouns = (bio) => {
  if (!bio) return;
  bio = bio.replace(/(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-z0-9@:%_\+.~#?&//=]*)/gi, '');
  let match = bio.match(/[a-z]+?(?:\/[a-z]+)+/i);
  if (!match && ~bio.indexOf('pronouns')) {
    if (~bio.indexOf('any')) return 'any pronouns';
    if (~bio.indexOf('avoid')) return 'avoid pronouns, use my name';
    if (~bio.indexOf('ask')) return 'ask for pronouns';
  };
  if (match) return match[0];
};

let unpatch = [], loaded = [], fetched = [];
export default () => {
  return {
    onLoad() {
      unpatch.push(after('default', MessageTimestamp, ([args], res) => {
        let message = getMessage(getChannelId(), args.id?.substring(18));
        let author = getCachedUser(message?.author?.id);
        let unloaded = !getUserProfile(message?.author?.id);
        if (unloaded && persist.ghost.fetch && !(fetched.includes(message?.author?.id)) && loaded.includes(message?.id) && !FluxDispatcher._currentDispatchActionType) {
          fetched.push(message?.author?.id); fetchProfile(message?.author?.id); // fetched is used to make sure that the plugin doesn't fire more than one api request serving the same purpose
        } // loaded is used so that the message must be rerendered at least once before it fetches the user so you don't spam the api when you open a new channel
        if (persist.ghost.fetch && !loaded.includes(message?.id))
          loaded.push(message?.id);
        let bio = message?.author?.id in persist
          ? persist[message.author.id]
          : !unloaded ? extractPronouns(author?.bio)
            : 'still loading';
        if (!bio) return;
        unpatch.push(after('children', res.props.children.props, (_, res) => {
          if (res.props.children.props.children[1] === 'edited') return;
          res.props.children.props.children[1] += ` • ${bio}`;
          return res;
        }));
      }));
      unpatch.push(after('default', MessageContextMenu, ([args], res) => {
        if (!findInReactTree(res, c => c?.props?.id == 'pronouns'))
          res.props.children.push(
            <Menu.MenuGroup>
              <Menu.MenuItem
                id='pronouns' label='Overide Pronouns'
                action={() => openModal((e) =>
                  <OverrideModal e={e} author={args.message.author.id} extract={extractPronouns} />
                )}
              />
            </Menu.MenuGroup>
          );
        return res;
      }));
    },
    onUnload() { unpatch.forEach(unpatch => unpatch()); },
    settings: <Settings />
  };
};