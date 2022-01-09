/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to the GNU General Public License (GPL-3.0).
 * You can find more information in the LICENSE.md file.
 * More information is also avaliable at this URL:
 * https://opensource.org/licenses/GPL-3.0
 * 
 *
 * @copyright Copyright (c) 2021 Paige Jordan
 * @license   GPL-3.0 GNU General Public License v3.0
 * @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/pronoun-bio-scraper
 */

import { findByProps, findByDisplayName } from '@cumcord/modules/webpack';
import { ErrorBoundary } from '@cumcord/ui/components';
import { persist } from '@cumcord/pluginData';

const Flex = findByDisplayName('Flex');
const Button = findByProps('DropdownSizes');
const Header = findByProps('Sizes', 'Tags');
const TextInput = findByDisplayName('TextInput');
const ModalComponents = findByProps('ModalCloseButton');
const getUser = findByProps('getUser', 'filter').getUser;

export default ({ e, author, extract }) => {
  const defaultPronouns = author in persist
    ? persist[author] : extract(getUser(author).bio);
  const [pronouns, setPronouns] = React.useState(defaultPronouns);
  const onEnter = (event) => {
    if (event.key !== 'Enter') return;
    persist[author] = pronouns;
    e.onClose();
  };
  React.useEffect(() => {
    document.addEventListener('keydown', onEnter);
    return () => document.removeEventListener('keydown', onEnter);
  });
  return (
    <ModalComponents.ModalRoot
      transitionState={e.transitionState}
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
            <ModalComponents.ModalCloseButton onClick={e.onClose} />
          </Flex.Child>
        </ModalComponents.ModalHeader>
        <ModalComponents.ModalContent>
          <TextInput
            onChange={(p) => { console.log(p); setPronouns(p); }}
            value={pronouns}
          />
        </ModalComponents.ModalContent>
        <ModalComponents.ModalFooter>
          <Button
            onClick={() => {
              persist[author] = pronouns;
              e.onClose();
            }}
            color={Button.Colors.BRAND_NEW}>
            Change Pronouns
          </Button>
          <Button
            onClick={e.onClose}
            look={Button.Looks.LINK}
            color={Button.Colors.TRANSPARENT}>
            Cancel
          </Button>
        </ModalComponents.ModalFooter>
      </ErrorBoundary>
    </ModalComponents.ModalRoot>
  );
};