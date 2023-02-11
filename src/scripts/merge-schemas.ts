import { readdir, readFile, appendFile, truncate } from 'fs/promises';
import path from 'path';

const header = `# Do not change this file manually
# All schemas here are merged programmatically from *.graphql files in this directory

`;

const srcFolderPath = path.join(__dirname, '../graphql/schemas');

const destinationFile = 'index.graphql';
const destinationFilePath = path.join(srcFolderPath, destinationFile);

const main = async () => {
  const files = await readdir(srcFolderPath);
  const filteredFiles = files.filter((file) => file !== destinationFile);

  await truncate(destinationFilePath, 0);

  await appendFile(destinationFilePath, header, 'utf-8');

  await Promise.all(
    filteredFiles.map(async (file) => {
      const filePath = path.join(srcFolderPath, file);
      const content = await readFile(filePath, 'utf-8');

      await appendFile(destinationFilePath, `${content}\n`, 'utf-8');
    }),
  ).catch(console.error);
};

main()
  .then(() => {
    console.info('✔ Schemas merged successfully');
  })
  .catch(console.error);
