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
 * @link      https://github.com/swishs-client-mod-plugins/cumcord-plugins/tree/main/plugins/permission-viewer
 */

import { constants } from '@cumcord/modules/common';
import { ErrorBoundary } from '@cumcord/ui/components';
import { findByProps, findByDisplayName } from '@cumcord/modules/webpack';

const Flex = findByDisplayName('Flex');
const Text = findByDisplayName('Text');
const TabBar = findByDisplayName('TabBar');
const CrossmarkIcon = findByDisplayName('Close');
const CheckmarkIcon = findByDisplayName('Checkmark');
const ModalComponents = findByProps('ModalCloseButton');

const { Permissions } = constants;

const Classes = {
  TabBar: findByProps('tabBarContainer'),
  ReactionModal: findByProps('spinnerMore'),
  RoleMenu: findByProps('roleDot', 'sidebar'),
};

export default ({ event, roles = {}, permissions }) => {
  const [role, selectRole] = React.useState(Object.keys(roles)[0]);
  return (
    <ModalComponents.ModalRoot
      transitionState={event.transitionState}
      className={Classes.ReactionModal.container}
      size='large'>
      <ErrorBoundary>
        {permissions ||
          <ModalComponents.ModalContent>
            <TabBar selectedItem={role} type={TabBar.Types.SIDE} onItemSelect={selectRole}>
              {Object.keys(roles).map((role) => (
                <TabBar.Item id={roles[role].id} className={Classes.RoleMenu.row} itemType={TabBar.Types.SIDE}>
                  <div className={Classes.RoleMenu.roleDot}
                    style={{ backgroundColor: roles[role].colorString || '#99aab5' }} />
                  <Text className={Classes.RoleMenu.roleName}>{roles[role].name}</Text>
                </TabBar.Item>
              ))}
            </TabBar>
          </ModalComponents.ModalContent>}
        <ModalComponents.ModalContent>
          {Object.keys(Permissions).map((listPermission) => {
            const permission = role ? roles[role].permissions : permissions;
            const permissionDeny = roles?.[role]?.permissionsDeny;
            const administrator = (permission & Permissions.ADMINISTRATOR) === Permissions.ADMINISTRATOR;
            return (
              <Flex style={{ paddingLeft: '12px', paddingRight: '264px' }} align={'alignCenter-14kD11'} className='reactorDefault-3GSyaV reactor-1J25Qp'>
                <Flex.Child grow={0} shrink={0}>
                  {((permission & Permissions[listPermission]) === Permissions[listPermission]
                    && (permissionDeny ? (permissionDeny & Permissions[listPermission]) !== Permissions[listPermission] : true)) || administrator
                    ? <CheckmarkIcon className height={24} width={24} color='#43B581' />
                    : <CrossmarkIcon height={24} width={24} color='#F04747' />}
                </Flex.Child>
                <Flex.Child>
                  <Text>
                    {listPermission.charAt(0).toUpperCase()
                      + listPermission.slice(1).toLowerCase().replace(/_\w/g,
                        (m) => ' ' + m.toUpperCase().slice(1))}
                  </Text>
                </Flex.Child>
              </Flex>
            );
          })}
        </ModalComponents.ModalContent>
      </ErrorBoundary>
    </ModalComponents.ModalRoot>
  );
};