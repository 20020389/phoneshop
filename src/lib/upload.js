import axios from 'axios';

export async function uploadFile(file, oldurl) {
  if (oldurl && oldurl != '') {
    try {
      await axios.delete(oldurl);
    } catch (error) {
      console.log(error);
    }
  }

  const date = new Date();
  const url = `/cloud/${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`;
  const uploadFile = new File([file], `${Date.now()}_${file.name}`);

  const formData = new FormData();
  formData.set('file', uploadFile);

  await axios.post(url, formData);

  return url + '/' + uploadFile.name;
}
