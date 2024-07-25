export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/').at(1);
  const validExtensions = ['jpg', 'png', 'jpeg', 'gif'];

  if (validExtensions.includes(fileExtension)) {
    return callback(null, true);
  }
  callback(null, false);
};
