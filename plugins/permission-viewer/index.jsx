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
 * @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/tree/main/plugins/permission-viewer
 */

import { after } from '@cumcord/patcher';
import { findInReactTree } from '@cumcord/utils';
import { constants } from '@cumcord/modules/common';
import { findByProps } from '@cumcord/modules/webpack';

import Patcher from './Patcher';
import PermissionList from './PermissionList';

const ContextMenu = findByProps('MenuGroup', 'MenuItem');

const { Permissions } = constants;
const { getGuild } = findByProps('getGuild');
const { getMember } = findByProps('getMember');
const { openModal } = findByProps('openModal', 'openModalLazy');

const patchGuildContextMenu = () => {
  Patcher.lazyPatchContextMenu('GuildContextMenu', GuildContextMenu => {
    Patcher.patch(after('default', GuildContextMenu, ([args], ret) => {
      const MenuItems = findInReactTree(ret, c => Array.isArray(c.children))?.children;
      MenuItems?.splice(1, 0, <>
        <ContextMenu.MenuSeparator />
        <ContextMenu.MenuItem label='View Permissions' id='permissions' action={() => {
          openModal(event => <PermissionList event={event} roles={args.guild.roles} />);
        }} />
      </>);
    }));
  });
};

const patchGuildChannelUserContextMenu = () => {
  Patcher.lazyPatchContextMenu('GuildChannelUserContextMenu', GuildChannelUserContextMenu => {
    Patcher.patch(after('default', GuildChannelUserContextMenu, ([args], ret) => {
      const MenuItems = findInReactTree(ret, c => Array.isArray(c.children))?.children;
      const guild = getGuild(args.guildId);
      const member = getMember(args.guildId, args.user.id);
      const permissions = guild.ownerId === args.user.id
        ? Object.values(Permissions).reduce(
          (accum, perm) => accum | perm, 0n)
        : Object.values(guild.roles).reduce(
          (accum, role) => ~member.roles.indexOf(role.id)
            ? accum | role.permissions
            : accum, 0n | guild.roles[args.guildId].permissions);

      MenuItems?.splice(2, 0, <>
        <ContextMenu.MenuSeparator />
        <ContextMenu.MenuItem label='View Permissions' id='permissions' action={() => {
          openModal(event => <PermissionList event={event} permissions={permissions} />);
        }} />
      </>);
    }));
  });
};

const patchChannelListTextChannelContextMenu = () => {
  Patcher.lazyPatchContextMenu('ChannelListTextChannelContextMenu', ChannelListTextChannelContextMenu => {
    Patcher.patch(after('default', ChannelListTextChannelContextMenu, ([args], ret) => {
      const MenuItems = findInReactTree(ret, c => Array.isArray(c.children))?.children;
      const newPermissions = Object.values(args.guild.roles).map(role => {
        if (!~Object.keys(args.channel.permissionOverwrites).indexOf(role.id)) return;
        const _role = { ...role };
        _role.permissions |= args.channel.permissionOverwrites[role.id].allow;
        _role.permissionsDeny = args.channel.permissionOverwrites[role.id].deny;
        return _role;
      }).filter(Boolean).reduce((accum, role) => Object.assign(accum, { [role.id]: role }), {});

      MenuItems?.splice(1, 0, <>
        <ContextMenu.MenuSeparator />
        <ContextMenu.MenuItem label='View Permissions' id='permissions' action={() => {
          openModal(event => <PermissionList event={event} roles={newPermissions} />);
        }} />
      </>);
    }));
  });
};

export default () => {
  return {
    onLoad() {
      patchGuildContextMenu();
      patchGuildChannelUserContextMenu();
      patchChannelListTextChannelContextMenu();
    },
    onUnload() {
      Patcher.unpatchAll();
    }
  };
};