import Server from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get('file');
  console.log('formData', JSON.stringify(file));
  // const JWT = formData.get('JWT');
  if (!file) {
    return Server.NextResponse.json(
      { error: 'No files received.' },
      { status: 400 }
    );
  }

  // formData.append('file', file);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append('pinataOptions', pinataOptions);

  const pinataMetadata = JSON.stringify({
    name: `${new Date().getTime()}`,
  });
  console.log('pinataMetadata', pinataMetadata);

  formData.append('pinataMetadata', pinataMetadata);
  console.log('process.env.PINATA_API_KEY', process.env.PINATA_API_KEY);

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

    Response.json({
      status: 'success',
      statusCode: 200,
      data: res.data,
    });
    // return Server.NextResponse.json({
    //   // status: 'success',
    //   // statusCode: 200,
    //   data: res.data,
    // });
  } catch (error) {
    Response.json({
      status: 'fail',
      statusCode: 500,
      data: error,
    });
    // return Server.NextResponse.json({
    //   status: 'fail',
    //   statusCode: 500,
    //   data: error,
    // });
  }
}
