import { appStates } from './states';

function startCase(str: string) {
  const sentences = str.toLowerCase().split(' ');
  sentences.forEach((_, i) => {
    sentences[i] = sentences[i].charAt(0).toUpperCase() + sentences[i].slice(1);
  });
  return sentences.join(' ');
}

export function formatStateName(entity: string) {
  if (entity) {
    const title = startCase(entity.toLowerCase());

    return title.replace(' ', '');
  }
  return '';
}

const buildState = (state: APP.IState) => {
  const { actions, entity } = state;

  const newActions = actions;
  Object.keys(actions).forEach((key) => {
    if (actions[key]) {
      const action = `${key + entity}${actions[key].suffix ?? ''}`;
      newActions[key] = { ...actions[key], action };
    }
  });

  return newActions;
};

export const buildAppStates = (): APP.IState[] =>
  appStates.map((s) => ({ ...s, actions: buildState(s) }));
