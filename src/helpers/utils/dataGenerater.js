/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';

export const dataGenerator = (schema, len = 1) => Array.from({
  length: len,
}).map(() => {
  const innerGen = (anySchema) => Object.keys(anySchema).reduce((entity, key) => {
    if (
      Object.prototype.toString.call(anySchema[key]) === '[object Object]'
    ) {
      entity[key] = innerGen(anySchema[key]);
      return entity;
    }
    entity[key] = faker.helpers.fake(anySchema[key]);
    return entity;
  }, {});

  return innerGen(schema);
});
