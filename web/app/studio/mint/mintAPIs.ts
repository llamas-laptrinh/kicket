import axios, { AxiosInstance } from 'axios';
import { BASE_URL, CREATE_METAD_ATA_URI, UPLOAD_IMAGE } from './endpoint';

export default class MintNftAPI {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
    });
  }
  uploadImage(fileToUpload: string) {
    const data = new FormData();
    const imageData: any = {
      uri: fileToUpload,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };
    data.append('file', imageData);
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
}
