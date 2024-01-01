export const navSchema = (navs = [], states = {}) => [
  [{
    name: 'name',
    label: 'Category Name',
  }],
  [{
    name: 'hasParent',
    label: 'Does it have a parent',
    fieldType: 'switch-field',
    isBool: true,
  }],
  [{
    name: 'categoryId',
    label: 'Parent category',
    select: true,
    hide: !states.hasParent,
    options: navs,
  }],
];
