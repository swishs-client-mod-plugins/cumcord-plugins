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
      note='This may get you rate limited if you hop to a bunch of servers in quick succession but you should for the most part be fine. (Use at your own discretion)'
      onChange={() => (persist.store.fetch = !persist.ghost.fetch)}
      value={persist.ghost.fetch}>
      Automatically Fetch Pronouns (get rid of "still loading")
    </SwitchItem>
  </>
};