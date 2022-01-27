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
import { findByProps } from '@cumcord/modules/webpack';

const classes = findByProps('timestampInline');

export default ({ author }) => {
  const [pronouns, setPronouns] = React.useState('still loading');
  React.useEffect(async () => {
    if (persist.ghost[author.id])
      return setPronouns(persist.ghost[author.id]);

    setPronouns(await combinePronouns(author));
  });

  return (
    <span className={`${classes.timestamp} ${classes.timestampInline}`}>
      {pronouns ? `• ${pronouns}` : ''}
    </span>
  );
};