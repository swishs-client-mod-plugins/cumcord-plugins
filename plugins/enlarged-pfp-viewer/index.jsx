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
 * @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/tree/main/plugins/enlarged-pfp-viewer
 */

import { after } from '@cumcord/patcher';
import { findByProps, findByDisplayName } from '@cumcord/modules/webpack';

import Patcher from './patch-handler';

const ImageModal = findByDisplayName('ImageModal');
const MaskedLink = findByDisplayName('MaskedLink');
const ContextMenu = findByProps('MenuGroup', 'MenuItem');
const ModalComponents = findByProps('ModalCloseButton');

const { downloadLink } = findByProps('downloadLink');
const { openModal } = findByProps('openModal', 'openModalLazy');

const enlargify = (url) => `${url.substring(0, url.lastIndexOf('.'))}.png?size=1024`;

export default () => {
  return {
    onLoad() {
      ['DMUserContextMenu', 'GuildChannelUserContextMenu'].map(displayName => {
        Patcher.lazyPatchContextMenu(displayName, module => {
          Patcher.patch(after('default', module, ([args], ret) => {
            ret?.props?.children?.props?.children?.splice(2, 0, <>
              <ContextMenu.MenuSeparator />
              <ContextMenu.MenuItem label='Enlarge PFP' id='enlarge' action={() => {
                openModal(event => <ModalComponents.ModalRoot
                  transitionState={event.transitionState}
                  size='medium'>
                  <ImageModal
                    height={1024} width={1024}
                    src={enlargify(args.user.getAvatarURL())} />
                  <MaskedLink
                    className={downloadLink}
                    href={enlargify(args.user.getAvatarURL())}>
                    Open original
                  </MaskedLink>
                </ModalComponents.ModalRoot>);
              }} />
            </>);
          }));
        });
      });
    },
    onUnload() {
      Patcher.unpatchAll();
    }
  };
};