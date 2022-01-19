/* feel free to copy this code */
const patches = [];
export const patch = unpatch => unpatch && patches.push(unpatch);
export const unpatchAll = () => patches.forEach(unpatch => unpatch());
export default { patch, unpatchAll };
