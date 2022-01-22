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
 * @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/tree/main/plugins/reaction-notifications
 */

import { useNest } from '@cumcord/utils';
import { persist } from '@cumcord/pluginData';
import { findByDisplayName, findByProps } from '@cumcord/modules/webpack';

const { colorStatusRed } = findByProps('colorStatusRed');

const Text = findByDisplayName('Text');
const Slider = findByDisplayName('Slider');
const Divider = findByDisplayName('Divider');
const FormText = findByDisplayName('FormText');
const SpeakerIcon = findByDisplayName('Speaker');
const TextInput = findByDisplayName('TextInput');
const FormTitle = findByDisplayName('FormTitle');
const SwitchItem = findByDisplayName('SwitchItem');

const classes = findByProps('soundRow');

export default () => {
  useNest(persist);

  const defaults = {
    inbox: true,
    createSound: true,
    volume: 1,
    mentionSound: true,
    link: ''
  };

  for (let value in defaults)
    if (!persist.ghost.hasOwnProperty(value))
      persist.store[value] = defaults[value];
  return (
    <>
      <FormTitle>INBOX</FormTitle>
      <SwitchItem
        onChange={() => persist.store.inbox = !persist.ghost.inbox}
        value={persist.ghost.inbox}>
        Enable Recent Reactions in Inbox
      </SwitchItem>
      <FormTitle>NOTIFICATIONS</FormTitle>
      <SwitchItem
        onChange={() => persist.store.disableNotifications = !persist.ghost.disableNotifications}
        value={persist.ghost.disableNotifications}
        hideBorder={true}>
        Disable Notifications
      </SwitchItem>
      <SwitchItem
        onChange={() => persist.store.sendInDND = !persist.ghost.sendInDND}
        value={persist.ghost.sendInDND}
        disabled={persist.ghost.disableNotifications}>
        Send Notifications while in DND Mode
      </SwitchItem>
      <FormTitle className={`${classes.notificationSound} ${classes.soundRow}`}>
        AUDIO
        <div className={classes.soundIcon} onClick={() => {
          if (!persist.ghost.createSound) return;
          const mentionSound = 'https://discord.com/assets/dd920c06a01e5bb8b09678581e29d56f.mp3';
          const audio = new Audio(persist.ghost.mentionSound ? mentionSound : persist.ghost.link);
          audio.volume = persist.ghost.volume;
          audio.play();
        }}>
          <SpeakerIcon width={15} height={24} />
        </div>
      </FormTitle>
      <SwitchItem
        note='Psst! You can preview the sound by hovering over "Audio" and clicking on the speaker!'
        onChange={() => persist.store.createSound = !persist.ghost.createSound}
        value={persist.ghost.createSound}
        hideBorder={true}>
        Create Sound on Notification
      </SwitchItem>
      <SwitchItem
        onChange={() => persist.store.mentionSound = !persist.ghost.mentionSound}
        value={persist.ghost.mentionSound}
        disabled={!persist.ghost.createSound}
        hideBorder={true}>
        Use Default Mention Sound
      </SwitchItem>
      <FormTitle>AUDIO LINK</FormTitle>
      <TextInput
        size='default'
        className='codeRedemptionInput-fKM0fu'
        onChange={(val) => persist.store.link = val}
        disabled={persist.ghost.mentionSound || !persist.ghost.createSound}
        value={persist.ghost.link}
      />
      <div style={{ paddingBottom: '20px' }} />
      <FormTitle>VOLUME (DEFAULT IS 100%)</FormTitle>
      <Slider
        initialValue={persist.ghost.volume * 100}
        minValue={0}
        maxValue={100}
        disabled={!persist.ghost.createSound}
        onValueChange={(value) => persist.store.volume = value / 100}
      />
      <div style={{ paddingBottom: '20px' }} />
    </>
  );
};