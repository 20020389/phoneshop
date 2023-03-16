import axios from 'axios';

function getBasename(url) {
  if (typeof url !== 'string') {
    return null;
  }
  const list = url.split('?')[0];
  return list.split('/').at(-1);
}

export async function uploadFile(file, oldurl) {
  const formData = new FormData();
  formData.set('file', file);

  let res;

  if (oldurl) {
    const uuid = getBasename(oldurl);
    console.log(uuid);
    const test =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    if (test.test(uuid)) {
      try {
        res = await axios.put(`/api/upload/${uuid}`, formData);
      } catch {
        res = await axios.post('/api/upload', formData);
      } finally {
        return res.data?.data ?? '';
      }
    }
  }

  res = await axios.post('/api/upload', formData);

  return res.data?.data ?? '';
}
