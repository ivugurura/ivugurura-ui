import { uploadFile } from '../redux/actions';

export const uploadedFile = async (file, prevFile = '') => {
	const formData = new FormData();
	formData.append('file', file);
	const serverResponse = uploadFile(formData, 'image', prevFile);
	const imagePath = (await serverResponse.payload).data.data;
	return imagePath;
};
/**
 *
 * @param {Array} radioUsers All users
 * @param {Array} onlineUsers Online users
 */
export const chatUsers = (radioUsers, onlineUsers) => {
	let allUsers = [radioUsers, ...onlineUsers];
	let users = [];
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
	let curr = date ? new Date(date) : new Date();
	curr.setDate(curr.getDate());
	return curr.toISOString().substr(0, 10);
};
