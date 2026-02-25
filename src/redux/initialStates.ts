export const baseState = (key = 'data', value = null) => ({
  loading: true,
  done: false,
  [key]: value,
  totalItems: 0,
});

export const dataArr = <T>() => ({
  status: 200,
  message: '',
  totalItems: 0,
  data: [] as T[],
});

export const dataObj = <T>() => ({
  status: 200,
  message: '',
  data: {} as T,
});
