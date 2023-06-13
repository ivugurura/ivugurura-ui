import { appStates } from './states';

export const baseState = (key = 'data', value = null) => ({
  loading: true,
  done: false,
  [key]: value,
  totalItems: 0,
});

function startCase(str = '', action = 'toUpperCase') {
  const sentences = str.toLowerCase().split(' ');
  sentences.forEach((_, i) => {
    sentences[i] = sentences[i].charAt(0)[action]() + sentences[i].slice(1);
  });
  return sentences.join(' ');
}

export function formatStateName(entity = '') {
  if (entity) {
    const title = startCase(entity.toLowerCase());

    return title.replace(' ', '');
  }
  return '';
}

const buildState = (state) => {
  const { actions, entity } = state;

  //   const entity = formatStateName(spacedEntity);

  const newActions = actions; // { add: {}}
  Object.keys(actions).forEach((key) => {
    if (actions[key]) {
      const action = `${key + entity}${actions[key].suffix || ''}`;
      newActions[key] = { ...actions[key], action };
    }
  });

  return newActions;
};

export const buildAppStates = () => appStates.map((s) => ({ ...s, actions: buildState(s) }));
