import { uploadFile } from '../redux/actions';

export const uploadedFile = async (file, prevFile = '') => {
  const formData = new FormData();
  formData.append('file', file);
  const serverResponse = uploadFile(formData, 'image', prevFile);
  const imagePath = (await serverResponse.payload).data.data;
  return imagePath;
};
