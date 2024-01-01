import axios, { AxiosInstance } from 'axios';
import { CREATE_METAD_ATA_URI, UPLOAD_IMAGE } from './endpoint';

export default class MintNftAPI {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      timeout: 10000,
    });
  }
  uploadImage(fileToUpload: File) {
    const data = new FormData();

    data.append('file', fileToUpload);
    return this.instance.post(UPLOAD_IMAGE, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
      },
    });
  }
  createMetadataUri(data: any) {
    return this.instance.post(CREATE_METAD_ATA_URI, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  unpinFile(ipfs: string) {
    return this.instance.post(
      CREATE_METAD_ATA_URI,
      { ipfs },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
