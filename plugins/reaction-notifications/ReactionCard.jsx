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

import { persist } from '@cumcord/pluginData';
import { findByProps, findByDisplayName, findByDisplayNameAll, find } from '@cumcord/modules/webpack';

const Text = findByDisplayName('Text');
const Reactions = findByDisplayName('Reactions');
const Header = findByDisplayNameAll('Header')[1];
const Channel = find(m => m.prototype?.getGuildId);
const CheckmarkIcon = findByDisplayName('Checkmark');
const FormDivider = findByDisplayName('FormDivider');
const Avatar = findByProps('AnimatedAvatar').default;
const IconButton = findByDisplayName('CircleIconButton');
const ContextMenu = findByProps('MenuGroup', 'MenuItem');
const EmojiSmile = findByDisplayNameAll('EmojiSmile')[1];
const EmptyStars = findByDisplayName('InboxEmptyStateStars');
const Timestamp = find(m => m.prototype?.toDate && m.prototype.month);
const RecentsChannelHeader = findByDisplayName('RecentsChannelHeader');
const ChannelMessage = find(m => m.type?.displayName === 'ChannelMessage');
const Message = find(m => m.prototype?.getReaction && m.prototype.isSystemDM);

const { transitionTo } = findByProps('transitionTo');
const { openUserProfileModal } = findByProps('openUserProfileModal');
const { openContextMenu, closeContextMenu } = findByProps('openContextMenu');

const Classes = {
  Sizes: findByProps('size10'),
  Button: findByProps('size32'),
  Stars: findByProps('stars', 'protip'),
  Colors: findByProps('colorStatusGreen'),
};

const RapeLMAO = () => (
  <div className='reaction-notifications-container'
    style={{ borderRadius: '8px', marginTop: '8px', marginLeft: '16px' }}>
    <ChannelMessage channel={new Channel({ id: 'uwu' })} message={
      new Message({
        content: 'rape',
        timestamp: new Timestamp('2021-09-24T22:20:42.723Z'),
        author: {
          id: '192760945766957066',
          username: 'creatable',
          toString: () => 'creatable',
          isSystemUser: () => false,
          getAvatarURL: () => 'https://cdn.discordapp.com/avatars/192760945766957066/629d2de47aab4d95fe45d846abfb083a.webp?size=80'
        }
      })}
      style={{
        paddingTop: '8px',
        marginLeft: '4px',
        textAlign: 'left',
        marginRight: '132px'
      }}
    />
    <ChannelMessage channel={new Channel({ id: 'uwu' })} message={
      new Message({
        content: 'LMAO',
        timestamp: new Timestamp('2021-09-24T22:20:42.723Z'),
        author: {
          id: '257109471589957632',
          username: 'Beef',
          toString: () => 'Beef',
          isSystemUser: () => false,
          getAvatarURL: () => 'https://cdn.discordapp.com/avatars/257109471589957632/d1edbec71d56736a68bc639ed7da43d0.webp?size=80'
        }
      })}
      style={{
        marginLeft: '4px',
        textAlign: 'left',
        paddingBottom: '8px'
      }}
    />
  </div>);

export const NoReactions = () => (
  <div className={Classes.Stars.container}>
    <div className={Classes.Stars.iconContainer}>
      <EmojiSmile className={Classes.Stars.icon} width={36} height={36} />
      <EmptyStars className={Classes.Stars.stars}></EmptyStars>
    </div>
    <Header className={Classes.Stars.header} size={Classes.Sizes.size24}>
      No reactions here!
    </Header>
    <Text className={Classes.Colors.colorHeaderSecondary} size={Classes.Sizes.size12}>
      <Text tag='span' className={Classes.Stars.protip} color={Classes.Colors.colorStatusGreen} size={Classes.Sizes.size12}>
        Protip:{' '}
      </Text>
      {Math.random() < 0.1 ? (
        <RapeLMAO />
      ) : (
        'Cumming is always funner with friends!'
      )}
    </Text>
  </div>
);

export const ReactionCardHeader = (props) => (
  <RecentsChannelHeader
    channel={props.channel}
    gotoChannel={() => {
      transitionTo(`/channels/${props.channel.guildId || '@me'}/${props.channel.id}/${props.message}`);
    }}>
    <IconButton
      className={`${Classes.Button.button} ${Classes.Button.tertiary}`}
      onClick={() => delete persist.store.reactions[props.channel.id]}
      tooltip='Mark as Read'
      icon={<CheckmarkIcon height={16} width={16} />}
    />
  </RecentsChannelHeader>
);

export const RenderMessage = (props) => (<>
  {props.isFirstMessage || <FormDivider />}
  <div className={`reaction-notifications-message ${!props.isFirstMessage || 'reaction-notifications-first-message'} reaction-notifications-container`}>
    <ChannelMessage message={props.message} channel={props.channel} onContextMenu={(event) => (
      openContextMenu(event, () => (<>
        <ContextMenu.default onClose={closeContextMenu}>
          <ContextMenu.MenuItem
            label='Jump to Message' id='jump'
            action={() => {
              transitionTo(`/channels/${props.channel.guildId || '@me'}/${props.channel.id}/${props.message.id}`);
            }}
          />
          <ContextMenu.MenuItem
            label='Delete Message' id='delete'
            action={() => {
              delete persist.store.reactions[props.channel.id][props.message.id];
            }}
          />
        </ContextMenu.default>
      </>))
    )} />
  </div>
</>
);

export const ReactionCardBody = (props) => (<>
  <FormDivider />
  <div className={`reaction-notifications-body ${!props.isLastReaction || 'reaction-notifications-last-reaction'} reaction-notifications-container`}>
    <Avatar src={props.user.getAvatarURL()} size={Avatar.Sizes.SIZE_32} onClick={() => openUserProfileModal({ userId: props.user.id })} />
    <div className='reaction-notifications-username' onClick={() => openUserProfileModal({ userId: props.user.id })}>
      {props.user.username}#{props.user.discriminator}
    </div>
    <div className='reaction-notifications-reactions'>
      <Reactions
        channel={new Channel({ id: 'uwu' })}
        message={{
          getChannelId: () => 'uwu!',
          reactions: [{
            count: props.count,
            emoji: props.reaction.emoji,
            me: false,
          }]
        }}
        disableReactionCreates={true}
        disableReactionUpdates={true}
      />
    </div>
  </div>
</>);