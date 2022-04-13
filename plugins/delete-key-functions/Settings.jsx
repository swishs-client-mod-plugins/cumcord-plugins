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

import { useNest } from '@cumcord/utils';
import { persist } from '@cumcord/pluginData';
import { findByDisplayName, findByProps } from '@cumcord/modules/webpack';

const { colorStatusRed } = findByProps('colorStatusRed');

const Text = findByDisplayName('Text');
const FormText = findByDisplayName('FormText');
const SwitchItem = findByDisplayName('SwitchItem');

export default () => {
  useNest(persist);
  return (
    <>
      <SwitchItem
        note='Delete messages (if you can) when you hold delete and click on them.'
        onChange={() => (persist.store.deleteMessages = !persist.ghost.deleteMessages)}
        value={persist.ghost.deleteMessages}>
        Delete Messages
      </SwitchItem>
      <SwitchItem
        note='Delete all channel types when you hold delete and click on them.'
        onChange={() => (persist.store.deleteChannels = !persist.ghost.deleteChannels)}
        value={persist.ghost.deleteChannels}>
        Delete Channels
      </SwitchItem>
      <SwitchItem
        note='Close direct message channels when you hold delete and click on them.'
        onChange={() => (persist.store.closeDMs = !persist.ghost.closeDMs)}
        value={persist.ghost.closeDMs}>
        Close DMs
      </SwitchItem>
      <SwitchItem
        note='Will leave guilds when you hold down delete and click on them.'
        onChange={() => (persist.store.leaveGuilds = !persist.ghost.leaveGuilds)}
        value={persist.ghost.leaveGuilds}>
        Leave Guilds
      </SwitchItem>
      <SwitchItem
        note='Delete roles in the role menu when you hold delete and click on them.'
        onChange={() => (persist.store.deleteRoles = !persist.ghost.deleteRoles)}
        value={persist.ghost.deleteRoles}>
        Delete Roles
      </SwitchItem>
      <SwitchItem
        note={
          <FormText type='description'>
            <Text tag='span' style={{ fontWeight: 'bold' }} color={colorStatusRed}>
              WARNING:{' '}
            </Text>
            no confirmation will be asked for, I would recommend leaving this off.
          </FormText>
        }
        onChange={() => (persist.store.deleteGuilds = !persist.ghost.deleteGuilds)}
        value={persist.ghost.deleteGuilds}
        disabled={!persist.ghost.leaveGuilds}>
        Delete Guilds
      </SwitchItem>
    </>
  );
};
