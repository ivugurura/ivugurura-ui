/* eslint-disable no-restricted-syntax */
// import { uploadFile } from '../redux/actions';

import { http } from './http';

// export const uploadedFile = async (file, prevFile = '') => {
//   const formData = new FormData();
//   formData.append('file', file);
//   const serverResponse = uploadFile(formData, 'image', prevFile);
//   const imagePath = (await serverResponse.payload).data.data;
//   return imagePath;
// };
/**
 *
 * @param {Array} radioUsers All users
 * @param {Array} onlineUsers Online users
 */
export const chatUsers = (radioUsers, onlineUsers) => {
  const allUsers = [radioUsers, ...onlineUsers];
  const users = [];
  allUsers.forEach((aUsr) => {
    const userId = aUsr.senderId || aUsr.userId;
    const userName = aUsr.senderName || aUsr.name;
    const thisUser = users.find((usr) => usr.userId === userId);
    if (!thisUser) {
      users.push({ userId, name: userName });
    }
  });
  return users;
};
export const audioPath = `${process.env.REACT_APP_API_URL}/songs/`;
export const imagesPath = `${process.env.REACT_APP_API_URL}/images/`;
export const toDate = (date = null) => {
  const curr = date ? new Date(date) : new Date();
  curr.setDate(curr.getDate());
  return curr.toISOString().substr(0, 10);
};
export const uploadFileWithProgress = (
  file,
  prevFile,
  type,
  onUploadProgress,
) => {
  const formData = new FormData();

  formData.append('file', file);

  const uploadUrl = `/albums/upload/${type}?prevFile=${prevFile}`;

  return http.post(uploadUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
};

export const validateUserAuthentication = async () => {
  const result = {
    isAuthenticated: false,
    errorMessage: '',
    data: null,
  };

  return http
    .get('/users/my-profile')
    .then((response) => {
      if (response.data.data) {
        result.isAuthenticated = true;
        result.data = response.data.data;
      } else {
        result.errorMessage = response.data.message;
      }
      return result;
    })
    .catch((error) => {
      if (error.response) {
        result.errorMessage = error.response.data.message;
      } else {
        result.errorMessage = error.message;
      }
      return result;
    });
};

export const toNewObj = (current = {}, old = {}) => {
  const newObj = { ...current };
  Object.keys(current).forEach((c) => {
    newObj[c] = old[c];
  });
  return newObj;
};

export const toFCap = (str = '') => str.match(/\b\w/g).join('');

export const getYtbDefaultVideoId = (lang) => {
  const ids = {
    en: 'Mo_T_U3EvZE',
    fr: 'xqKPTRk3zY0',
    sw: 'JkDg7nqoni8',
    kn: 'IP3GCBB4pWA',
  };

  return ids[lang] || ids.en;
};

export const getRadioKingId = (lang) => {
  const ids = {
    en: 'la-reforme',
    fr: 'la-reforme',
    sw: 'la-reforme',
    kn: 'ubugorozi',
  };

  return ids[lang] || ids.en;
};
