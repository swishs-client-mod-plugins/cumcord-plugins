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
import { after, before } from '@cumcord/patcher';
import { findInReactTree } from '@cumcord/utils';
import { ErrorBoundary } from '@cumcord/ui/components';
import { FluxDispatcher } from '@cumcord/modules/common';
import { find, findByProps } from '@cumcord/modules/webpack';

import styles from './styles.css';
import Settings from './Settings';
import Patcher from './patch-handler';
import * as ReactionCard from './ReactionCard';

const { getGuild } = findByProps('getGuild');
const { getChannel } = findByProps('getDMUserIds');
const { transitionTo } = findByProps('transitionTo');
const { getChannelId } = findByProps('getVoiceChannelId');
const { showNotification } = findByProps('showNotification');
const { getStatus } = findByProps('getStatus', 'getPresence');
const { getMessage } = findByProps('getMessage', 'getMessages');
const { AdvancedScrollerThin } = findByProps('AdvancedScrollerThin');
const { getUser, getCurrentUser } = findByProps('getUser', 'getCurrentUser');

const HeaderComponents = findByProps('Header', 'Item');
const SettingsStore = findByProps('getFullState', 'settings');
const RecentsHeader = find(m => m.default?.displayName === 'RecentsHeader');
const RecentMentions = find(m => m.default?.displayName === 'RecentMentions');
const UnreadMessages = find(m => m.default?.displayName === 'UnreadMessages');

const classes = {
  ...findByProps('tab', 'header'),
  ...findByProps('messageContainer'),
};

const onReaction = reaction => {
  if (persist.ghost.disableNotifications) return;
  const currentUser = getCurrentUser().id;
  if (reaction?.userId !== currentUser) {
    const message = getMessage(reaction.channelId, reaction.messageId);
    if (message?.author.id === currentUser) {
      const user = getUser(reaction.userId);
      const channel = getChannel(reaction.channelId);
      const guild = getGuild(channel.guild_id);

      if (!(!persist.ghost.addFromCurrent && getChannelId() === channel.id)) {
        if (!persist.ghost.disableInbox) {
          if (!persist.ghost.reactions[channel.id])
            persist.store.reactions[channel.id] = { channel };

          if (!persist.ghost.reactions[channel.id][message.id])
            persist.store.reactions[channel.id][message.id] = [message];

          persist.store.reactions[channel.id][message.id].push({
            reaction, guild, user, message, channel,
            count: message.reactions.find(_reaction =>
              _reaction.emoji.name === reaction.emoji.name
              && _reaction.emoji.id === reaction.emoji.id).count,
          });
        }
      }

      if (!(!persist.ghost.sendInCurrent && getChannelId() === channel.id)) {
        if (persist.ghost.sendInDND || getStatus(currentUser) !== 'dnd') {
          showNotification(
            user.getAvatarURL(),
            `${user.username}${guild ? ` (#${channel.name}, ${guild.name})` : ''}`,
            `New Reaction: ${reaction.emoji.name}`, {
            onClick: () => transitionTo(path)
          });

          if (persist.ghost.createSound) {
            const mentionSound = 'https://discord.com/assets/dd920c06a01e5bb8b09678581e29d56f.mp3';
            const audio = new Audio(persist.ghost.mentionSound ? mentionSound : persist.ghost.link);
            audio.volume = persist.ghost.volume; audio.play();
          }
        }
      }
    }
  }
};

const PopoutContent = () => {
  const reactions = persist.ghost.reactions;
  const components = [[]];
  useNest(persist);

  Object.keys(reactions).forEach((channel, index) => {
    if (!components[index]) components.push([]);
    if (Object.keys(reactions[channel]).length === 1) {
      delete reactions[channel]; return;
    }

    components[index].push(<ReactionCard.ReactionCardHeader
      channel={reactions[channel].channel}
      message={reactions[channel][Object.keys(reactions[channel])[1]][0].id}
    />);

    Object.keys(reactions[channel]).forEach((message, messageIndex, array) => {
      if (message === 'channel') return;

      const isFirstMessage = messageIndex === 1;
      const isLastMessage = messageIndex === array.length - 1;

      components[index].push(<ReactionCard.RenderMessage
        isFirstMessage={isFirstMessage}
        message={reactions[channel][message][0]}
        channel={reactions[channel].channel}
      />);

      reactions[channel][message].forEach((reaction, rindex, array) => {
        if (rindex === 0) return; if (array.length === 1) delete reactions[channel][message];
        const isLastReaction = isLastMessage && (array.length === 1 || rindex === array.length - 1);

        components[index].push(<ReactionCard.ReactionCardBody
          {...reaction} isLastReaction={isLastReaction}
        />);
      });
    });
  });

  return (
    <ErrorBoundary>
      <AdvancedScrollerThin fade={true}>
        {components[0].length ? components.map((component) =>
          <div className={classes.container}>{component}</div>
        ) : <ReactionCard.NoReactions />}
      </AdvancedScrollerThin>
    </ErrorBoundary>
  );
};

// credits to strencher for helping me out with this
const patchInboxComponents = () => {
  const PatchedRecentMentions = ({ __originalType: original, ...props }) => {
    const rendered = original.call(this, props);

    try {
      if (SettingsStore.settings.inbox.currentTab === 3)
        rendered.props.children[1] = <PopoutContent />;
    } catch (error) {
      console.error('RecentMentions patch failed:', error);
    }

    return rendered;
  };

  Patcher.patch(after('default', RecentMentions, (_, ret) => {
    Object.assign(ret.props, { __originalType: ret.type });
    ret.type = PatchedRecentMentions;
  }));

  Patcher.patch(after('default', UnreadMessages, (_, ret) => {
    if (SettingsStore.settings.inbox.currentTab !== 3) return;
    ret.props.children[1] = <PopoutContent />;
  }));
};

const patchRecentsHeader = () => {
  const PatchedReadAllButton = ({ __originalType: original, ...props }) => {
    const rendered = original.call(this, props);
    if (props.tab !== 3) return rendered;

    try {
      const button = findInReactTree(rendered, e => typeof e?.onClick === 'function');
      if (!button) return rendered;
      button.onClick = () => (persist.store.reactions = {});
    } catch (error) {
      console.error('ReadAllButton patch failed:', error);
    }

    return rendered;
  };

  Patcher.patch(before('default', RecentsHeader, ([props]) => {
    props.tab = SettingsStore.settings.inbox.currentTab;
  }));

  Patcher.patch(after('default', RecentsHeader, ([props], ret) => {
    const header = findInReactTree(ret, e => e?.onItemSelect);
    const readAllButton = findInReactTree(ret, e => typeof e?.props?.onClick === 'function');
    const childs = header?.children;

    if (!Array.isArray(childs)) return;

    if (readAllButton) {
      Object.assign(readAllButton.props, { __originalType: readAllButton.type, tab: props.tab });
      readAllButton.type = PatchedReadAllButton;
    }

    childs.push(
      <HeaderComponents.Item id={3} look={0} className={`${classes.tab}${props.tab === 3 ? ` ${classes.active}` : ''}`}>
        Reactions
      </HeaderComponents.Item>
    );
  }));
};

export default () => {
  return {
    onLoad() {
      if (!persist.ghost.reactions) persist.store.reactions = {};
      FluxDispatcher.subscribe('MESSAGE_REACTION_ADD', onReaction);
      if (!persist.ghost.disableInbox) {
        Patcher.patch(styles());
        patchInboxComponents();
        patchRecentsHeader();
      }
    },
    onUnload() {
      FluxDispatcher.unsubscribe('MESSAGE_REACTION_ADD', onReaction);
      Patcher.unpatchAll();
    },
    settings: <Settings />
  };
};