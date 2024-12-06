import { useState } from 'react';

const alertInitial = {
  current: null,
  actionType: '',
  message: '',
  open: false,
};
export const useAlertDialog = () => {
  const [alertData, setAlertData] = useState(alertInitial);

  const reset = () => {
    setAlertData(alertInitial);
  };

  const setAlertValues = (values = {}) => {
    const newValues = Object.entries(values).reduce(
      (prev, [key, value]) => ({ ...prev, [key]: value }),
      {},
    );

    setAlertData((prev) => ({ ...prev, ...newValues }));
  };

  return { alertValues: alertData, reset, setAlertValues };
};
