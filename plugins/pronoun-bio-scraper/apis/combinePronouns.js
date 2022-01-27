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

import scrapePronouns from './scrapePronouns';
import fetchFromPDB from './fetchFromPDB';

import { persist } from '@cumcord/pluginData';

export default async (author) => {
  if (!author) return;

  const scraped = await scrapePronouns(author);
  if (!persist.ghost.pronoundb) return scraped;

  let pronoundb = await fetchFromPDB(author);
  pronoundb = pronoundb !== 'undefined' ? pronoundb : undefined;

  let combinedPronouns = scraped;
  if ((pronoundb && scraped) && pronoundb !== scraped)
    combinedPronouns = `${pronoundb} | ${scraped} (scraped)`;
  else if (!combinedPronouns) combinedPronouns = pronoundb;

  return combinedPronouns;
};