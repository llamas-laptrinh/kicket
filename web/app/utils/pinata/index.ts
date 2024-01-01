import axios from 'axios';
const PINATA_API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYzY5MWI0OC02YWVkLTQ2YWQtYWNmNi0wY2RkZDc5OGJlZTEiLCJlbWFpbCI6ImRhbmd0cnVuZ2R1YzUxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2Mzg3ZTUyMWU5MDZlNjE3YWE0NyIsInNjb3BlZEtleVNlY3JldCI6IjRhMGZlMzU5NWQ3ZDVlOGY2ZTE2YmY2YTViYzBjOWE3ODYyYjI0NzgwZjc1NWVhNDgxYTY0ZWI0N2E3ODBkZjYiLCJpYXQiOjE2OTY5Mzk2MzV9.oKv1TM34pxeAIN_0vC58Y3jrziesZo3ZhnSod27r6cc';

export const uploadFile = async (file: File) => {
  const formData = new FormData();

  formData.append('file', file);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append('pinataOptions', pinataOptions);

  const pinataMetadata = JSON.stringify({
    name: `${new Date().getTime()}`,
  });

  formData.append('pinataMetadata', pinataMetadata);
  try {
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': `multipart/form-data`,
          Authorization: `Bearer ${PINATA_API_KEY || ''}`,
        },
      }
    );
    console.log('res', res.data);
    return res;
  } catch (error: any) {
    console.error('upload image', error);
    return error;
  }
};

export const uploadJson = async (data: {
  name: any;
  description: any;
  image: any;
  external_url: any;
  attributes: any;
}) => {
  try {
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      {
        pinataContent: {
          name: data.name,
          description: data.description,
          image: data.image,
          external_url: data.external_url,
          attributes: data.attributes,
        },
        pinataMetadata: {
          name: data.name,
        },
      },
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${PINATA_API_KEY}`,
        },
      }
    );
    return res;
  } catch (error: any) {
    console.error('upload json', error);
    return error;
  }
};
