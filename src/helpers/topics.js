export const dashboardActions = (type, topic) => {
  const action = {
    action: type,
    title: topic.title,
  };
  if (type === 'publish') {
    action.action = topic.isPublished ? 'Unpublish' : 'Publish';
    return action;
  }
  if (type === 'home') {
    action.action = topic.entities?.length ? 'Remove from home' : 'Add to home';
    return action;
  }
  return action;
};
