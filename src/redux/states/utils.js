export const getPaginationParams = (additionalParams = []) => {
  let params = 'page=:page&pageSize=:pageSize';
  additionalParams.forEach((param) => {
    params += `&${param}=:${param}`;
  });
  return params;
};
