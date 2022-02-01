/* feel free to copy this code */
const patches = [];
export const patch = unpatch => unpatch && patches.push(unpatch);
export const unpatchAll = () => patches.forEach(async unpatch => await unpatch());

// credits to juby and i think xinos
import { before } from '@cumcord/patcher';
import { find, findByProps } from '@cumcord/modules/webpack';
const lazyPatchContextMenu = async (displayName, patch) => {
  const filter = m => m.default && m.default.displayName === displayName;
  const module = find(filter); if (module) patch(module);
  else {
    const openContextMenuLazy = findByProps('openContextMenuLazy');
    let lazyPatch = before('openContextMenuLazy', openContextMenuLazy, args => {
      const lazyRender = args[1];
      args[1] = async () => {
        const render = await lazyRender(args[0]);

        return config => {
          const menu = render(config);

          if (menu?.type?.displayName === displayName && patch) {
            lazyPatch(); patch(find(filter)); patch = false;
          }

          return menu;
        };
      };
      return args;
    });
  }
};

export default { patch, unpatchAll, lazyPatchContextMenu };