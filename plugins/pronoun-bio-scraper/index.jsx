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
 * @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/tree/main/plugins/pronoun-bio-scraper
 */

import Patcher from './apis/Patcher';

import Pronouns from './components/Pronouns';
import Settings from './components/Settings';
import OverrideModal from './components/OverrideModal';

import { after } from '@cumcord/patcher';
import { findInReactTree } from '@cumcord/utils';
import { find, findByProps } from '@cumcord/modules/webpack';

const { openModal } = findByProps('openModal', 'openModalLazy');

const Menu = findByProps('MenuGroup', 'MenuItem');
const MessageHeader = find((m) => typeof m.default === 'function' && m.default.toString().includes('showAvatarPopout'));

export default () => {
  return {
    onLoad() {
      Patcher.patch(after('default', MessageHeader, ([args], ret) => {
        const props = findInReactTree(ret, c => Array.isArray(c?.children) && !c.children[0]);
        if (!props) return;

        props.children.push(<Pronouns author={args.message.author} />);
      }));

      Patcher.lazyPatchContextMenu('MessageContextMenu', MessageContextMenu => {
        Patcher.patch(after('default', MessageContextMenu, ([args], ret) => {
          if (findInReactTree(ret, c => c?.props?.id == 'pronouns')) return;
          ret.props.children.push(
            <Menu.MenuGroup>
              <Menu.MenuItem
                id='pronouns'
                label='Overide Pronouns'
                action={() => openModal(event =>
                  <OverrideModal event={event} author={args.message.author} />
                )}
              />
            </Menu.MenuGroup>
          );
        }));
      });
    },
    onUnload() { Patcher.unpatchAll(); },
    settings: <Settings />,
  };
};
