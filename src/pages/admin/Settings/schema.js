export const navSchema = () => [
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
];
