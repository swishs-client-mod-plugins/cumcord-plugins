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

import combinePronouns from '../apis/combinePronouns';

import { persist } from '@cumcord/pluginData';
import { ErrorBoundary } from '@cumcord/ui/components';
import { findByProps, findByDisplayName } from '@cumcord/modules/webpack';

const Flex = findByDisplayName('Flex');
const Anchor = findByDisplayName('Anchor');
const Button = findByProps('DropdownSizes');
const Header = findByProps('Sizes', 'Tags');
const TextInput = findByDisplayName('TextInput');
const classes = findByProps('anchorUnderlineOnHover');
const ModalComponents = findByProps('ModalCloseButton');

let defaultPronouns;
export default ({ event, author }) => {
  const [pronouns, setPronouns] = React.useState('Loading...');

  const onEnter = (keyPressEvent) => {
    if (keyPressEvent.key !== 'Enter') return;
    persist[author] = pronouns;
    event.onClose();
  };

  React.useEffect(() => {
    document.addEventListener('keydown', onEnter);
    return () => document.removeEventListener('keydown', onEnter);
  });
  console.log(defaultPronouns);

  React.useEffect(async () => {
    defaultPronouns = await combinePronouns(author) ?? '';

    const pronouns = persist.ghost[author.id]
      ? persist.ghost[author.id] : defaultPronouns;

    setPronouns(pronouns);
  }, []);

  return (
    <ModalComponents.ModalRoot
      transitionState={event.transitionState}
      className='pronoun-overide-modal'
      size='small'
    >
      <ErrorBoundary>
        <ModalComponents.ModalHeader separator={false}>
          <Flex.Child basis='auto' grow={1} shrink={1} wrap={false}>
            <Header tag='h2' size={Header.Sizes.SIZE_20}>
              Override Pronouns
            </Header>
          </Flex.Child>
          <Flex.Child basis='auto' grow={0} shrink={1} wrap={false}>
            <ModalComponents.ModalCloseButton onClick={event.onClose} />
          </Flex.Child>
        </ModalComponents.ModalHeader>
        <ModalComponents.ModalContent>
          <TextInput
            placeholder='cum/cumself'
            onChange={setPronouns}
            value={pronouns}
          />
          <div style={{ marginTop: '3px' }} />
          <Anchor
            onClick={() => setPronouns(defaultPronouns)}
            className={classes.anchorUnderlineOnHover}
            style={{ fontSize: '14px' }}
            cursor='pointer'>
            Reset Pronouns
          </Anchor>
        </ModalComponents.ModalContent>
        <ModalComponents.ModalFooter>
          <Button
            onClick={() => {
              if (pronouns === defaultPronouns)
                delete persist.store[author.id];
              else persist.store[author.id] = pronouns;
              event.onClose();
            }}
            color={Button.Colors.BRAND_NEW}>
            Change Pronouns
          </Button>
          <Button
            onClick={event.onClose}
            look={Button.Looks.LINK}
            color={Button.Colors.TRANSPARENT}>
            Cancel
          </Button>
        </ModalComponents.ModalFooter>
      </ErrorBoundary>
    </ModalComponents.ModalRoot>
  );
};