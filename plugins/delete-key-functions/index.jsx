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
 * @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/tree/main/plugins/delete-key-functions
 */

import { persist } from '@cumcord/pluginData';
import { after, instead } from '@cumcord/patcher';
import { constants } from '@cumcord/modules/common';
import { find, findByProps } from '@cumcord/modules/webpack';

import Patcher from './patch-handler';
import Settings from './Settings';

const patchMessages = () => {
  if (!persist.ghost.deleteMessages) return;
  const Permissions = findByProps('canManageUser');
  const { deleteMessage } = findByProps('deleteMessage');
  const { getCurrentUser } = findByProps('getCurrentUser');
  const Message = find(m => m.default?.displayName === 'Message');
  return after('default', Message, ([args], ret) => {
    if (!args?.childrenAccessories?.props || !ret?.props) return ret;
    const message = args.childrenAccessories.props.message;
    const channel = args.childrenAccessories.props.channel;
    const canDelete = Permissions.can(constants.Permissions.MANAGE_MESSAGES, channel);
    const isOwnMessage = getCurrentUser().id === message?.author?.id;

    ret.props.children.props.onClick = () => {
      if (!holdingDelete) return;
      if (!(canDelete || isOwnMessage)) return;
      deleteMessage(channel.id, message.id);
    };
  });
};

const patchSelectChannel = () => {
  if (!persist.ghost.closeDMs && !persist.ghost.deleteChannels) return;
  const { deleteChannel } = findByProps('deleteChannel');
  const selectChannel = findByProps('selectChannel');
  return instead('selectChannel', selectChannel, (args, original) => {
    if (args[0] === '@me' && !persist.ghost.closeDMs) return original(...args);
    if (args[0] !== '@me' && !persist.ghost.deleteChannels) return original(...args);
    if (!holdingDelete) return original(...args);
    deleteChannel(args[1]);
  });
};

const patchSelectVoiceChannel = () => {
  if (!persist.ghost.deleteChannels) return;
  const { deleteChannel } = findByProps('deleteChannel');
  const selectVoiceChannel = findByProps('selectVoiceChannel');
  return instead('selectVoiceChannel', selectVoiceChannel, (args, original) => {
    if (!holdingDelete) return original(...args);
    deleteChannel(args[0]);
  });
};

const patchSelectGuild = () => {
  if (!persist.ghost.leaveGuilds) return;
  const { leaveGuild, deleteGuild } = findByProps('leaveGuild');
  const { getGuild } = findByProps('getGuild');
  const selectGuild = findByProps('selectGuild');
  return instead('selectGuild', selectGuild, ([args], original) => {
    if (!holdingDelete) return original(...args);
    leaveGuild(args).catch(() => !persist.ghost.deleteGuilds || deleteGuild(args, getGuild(args).name));
  });
};

const patchSelectRole = () => {
  if (!persist.ghost.deleteRoles) return;
  const { deleteRole } = findByProps('deleteRole');
  const { getGuildId } = findByProps('getGuildId');
  const selectRole = findByProps('selectRole');
  return instead('selectRole', selectRole, (args, original) => {
    if (!holdingDelete) return original(...args);
    deleteRole(getGuildId(), args[0]);
  });
};

let holdingDelete;
const deleteHandler = e => e.key === 'Delete' && (holdingDelete = e.type === 'keydown');
export default () => {
  return {
    onLoad() {
      document.addEventListener('keydown', deleteHandler);
      document.addEventListener('keyup', deleteHandler);
      Patcher.patch(patchMessages());
      Patcher.patch(patchSelectChannel());
      Patcher.patch(patchSelectVoiceChannel());
      Patcher.patch(patchSelectGuild());
      Patcher.patch(patchSelectRole());
    },
    onUnload() {
      document.removeEventListener('keydown', deleteHandler);
      document.removeEventListener('keyup', deleteHandler);
      Patcher.unpatchAll();
    },
    settings: <Settings />,
  };
};
