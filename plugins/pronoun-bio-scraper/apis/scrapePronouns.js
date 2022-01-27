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

import { findByProps } from '@cumcord/modules/webpack';

const { fetchProfile } = findByProps('fetchProfile');
const { getUserProfile } = findByProps('getUserProfile');
const { getUser } = findByProps('getUser', 'getCurrentUser');

const fetched = [];
export default async (author) => {
  let unloaded = !getUserProfile(author.id);

  if (unloaded && !fetched.includes(author.id)) {
    fetched.push(author.id);
    await fetchProfile(author.id);
    fetched.splice(fetched.length - 1, 1);
  }

  const user = getUser(author.id);
  if (!user) return;

  return filter(user.bio);
};

const filter = (bio) => {
  if (!bio) return;
  bio = bio.replace(/(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-z0-9@:%_\+.~#?&//=]*)/gi, '');
  let match = bio.match(/[a-z]+?(?:\/[a-z]+)+/i);
  if (!match) {
    if (~bio.indexOf('pronouns')) {
      if (~bio.indexOf('any')) return 'any pronouns';
      if (~bio.indexOf('avoid')) return 'avoid pronouns, use my name';
      if (~bio.indexOf('ask')) return 'ask for pronouns';
    } else {
      if (~bio.indexOf('male')) return 'possibly he/him';
      if (~bio.indexOf('female')) return 'possibly she/her';
      if (~bio.indexOf('boy')) return 'possibly he/him';
      if (~bio.indexOf('girl')) return 'possibly she/her';
    }
  }
  return match?.[0]?.toLowerCase();
};