/* The below code is licensed under MIT. */

import type { MessageJSON } from 'discord-types';

import { findByProps } from '@cumcord/modules/webpack';
import { FluxDispatcher } from '@cumcord/modules/common';

const UnreadStore = findByProps('getUnreadCount');
const ChannelStateStore = findByProps('isChannelMuted');
const UnreadActions = findByProps('ackCategory', 'ack');

// cba to add thread support
const onMessage = (event: {
  channelId: string;
  isPushNotification: boolean;
  message: MessageJSON;
  optimistic: boolean;
}) => {
  if (
    !event.message ||
    event.optimistic ||
    UnreadStore.getUnreadCount(event.channelId) >= 2 ||
    !event.message.embeds?.[0]?.title?.includes('star') ||
    ChannelStateStore.isChannelMuted(event.message.guild_id, event.channelId)
  ) return;

  UnreadActions.ack(event.channelId, true, true);
};

export default () => {
  return {
    onLoad: () => FluxDispatcher.subscribe('MESSAGE_CREATE', onMessage),
    onUnload: () => FluxDispatcher.unsubscribe('MESSAGE_CREATE', onMessage)
  };
};