import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) => {
  if (!file) return callback(new Error('File is empty'), null);

  const fileExtension = file.mimetype.split('/').at(1);
  const fileName = `${uuid()}.${fileExtension}`;

  callback(null, fileName);
};
