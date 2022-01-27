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

import { useNest } from '@cumcord/utils';
import { persist } from '@cumcord/pluginData';
import { findByDisplayName } from '@cumcord/modules/webpack';

const SwitchItem = findByDisplayName('SwitchItem');

export default () => {
  useNest(persist);
  return <>
    <SwitchItem
      onChange={() => (persist.store.pronoundb = !persist.ghost.pronoundb)}
      value={persist.ghost.pronoundb}>
      PronounDB Support
    </SwitchItem>
  </>;
};