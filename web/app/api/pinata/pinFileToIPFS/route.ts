import axios from 'axios';

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get('file');
  if (!file) {
    return Response.json({ error: 'No files received.' }, { status: 400 });
  }

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
          Authorization: `Bearer ${process.env.PINATA_API_KEY}`,
        },
      }
    );
    console.log('res', res.data);

    return Response.json(
      {
        data: res.data,
      },
      { status: 200, statusText: 'success' }
    );
  } catch (error: any) {
    return Response.json(
      {
        data: error,
      },
      { status: 500, statusText: error.message }
    );
  }
}
