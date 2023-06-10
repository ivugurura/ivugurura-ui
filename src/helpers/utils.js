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

export const startCase = (str = '', toUpper = true) => {
  const sentences = str.toLowerCase().split(' ');
  sentences.forEach((_, i) => {
    const firstChar = sentences[i].charAt(0);
    if (toUpper) {
      firstChar.toUpperCase();
    }
    sentences[i] = firstChar + sentences[i].slice(1);
  });
  return sentences.join(' ');
};

/**
 *
 * @param url a string to be formatted
 * @param params an object of parametters to be appended to the string
 * @returns formatted string
 */
export const formatParamaterizedUrl = (url = '', params = {}) => {
  let endpoint = url;
  /**
   * When a @url like /employee?pageNumber=:pageNumber&search=:searchKey
   * formulated without passing the @params object like
   * {pageNumber:0, searchKey:doe}, it turns out to be an invalid url.
   * However, if the @params was not provided at all, we should send an
   * empty string in every place of a param
   * So we replace ":paramName" placeholder with an empty string
   *
   * The result would be /employee?pageNumber=&search=
   */

  const paramPattern = /:\w+/g;
  const searchParams = endpoint.match(paramPattern);
  if (searchParams) {
    for (const searchParam of searchParams) {
      const param = searchParam.slice(1); // Remove the leading colon
      endpoint = endpoint.replace(searchParam, params[param] || '');
    }
  }
  return endpoint;
};
