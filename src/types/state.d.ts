declare namespace ST {
  interface IFile {
    fileName: string;
  }
  interface IAuth {
    isAuthenticated: boolean;
    user: APP.IUser;
  }
  interface IFileDownload {
    blob: Blob;
    filename: string;
  }
}
