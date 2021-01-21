import { enableES5, produce } from 'immer';

const es5produce = (...args) => {
  enableES5();
  return produce(...args);
};
export default es5produce;
