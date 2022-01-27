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

const cached = {};
const endpoint = 'https://pronoundb.org/api/v1/lookup?platform=discord&id=';
const Pronouns = {
  // sorted non-alphabetically to induce the most amount of bias possible
  hh: 'he/him',

  // everything else
  hs: 'he/she',
  si: 'she/it',
  ih: 'it/him',
  ii: 'it/its',
  is: 'it/she',
  hi: 'he/it',
  ht: 'he/they',
  sh: 'she/her',
  shh: 'she/he',
  th: 'they/he',
  ti: 'they/it',
  it: 'it/they',
  st: 'she/they',
  ts: 'they/she',
  tt: 'they/them',
  any: 'any pronouns',
  other: 'other pronouns',
  ask: 'ask me my pronouns',
  avoid: 'avoid pronouns, use my name',
};

export default async (author) => {
  if (cached[author.id]) return cached[author.id];

  const fetched = await (await fetch(endpoint + author.id)).json();
  const pronouns = Pronouns[fetched.pronouns];

  cached[author.id] = pronouns ?? 'undefined';
  return pronouns;
};