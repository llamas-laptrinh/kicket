'use client';
import React from 'react';
import { Label, TextInput, Textarea, Button, Modal } from 'flowbite-react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';
import MintNftAPI from './mintAPIs';
import { getPinataUri } from '@app/utils/getPinataUri';
import NftFactory from '@app/utils/contract/nft';
import { getProvier } from '@app/utils/contract/getProvider';

type Traits = {
  type: string;
  name: string;
};

export default function MintNFT() {
  const [traits, setTraits] = React.useState<Array<Traits>>([]);
  const [openModal, setOpenModal] = React.useState(false);

  const [nftName, setNftName] = React.useState('');
  const [nftSupply, setNftSupply] = React.useState(1);
  const [nftDescription, setNftDescription] = React.useState('');
  const [nftExternalLink, setNftExternalLink] = React.useState('');

  const [helperText, setHelperText] = React.useState({
    nftName: '',
    nftSupply: '',
  });

  const [selectedFile, setSelectedFile] = React.useState<any>(null);

  const [previewImage, setPreviewImage] = React.useState<any>(null);

  const handleAddTrait = (trait: Traits) => {
    const cloneTraits = [...traits];
    cloneTraits.push(trait);
    setTraits(cloneTraits);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      setSelectedFile(file);

      // Use FileReader to read the file and generate a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateNFT = async () => {
    if (nftName === '') {
      setHelperText({ ...helperText, nftName: 'NFT Name is required' });
    }
    if (!nftSupply || nftSupply === 0) {
      setHelperText({
        ...helperText,
        nftSupply: 'NFT Supply is required and Greater 0',
      });
    }
    const mint = new MintNftAPI();
    const res = await mint.uploadImage(selectedFile);
    const imageUri = getPinataUri(res.data.data.IpfsHash);
    const metadataUri = await mint.createMetadataUri({
      description: nftDescription,
      external_url: nftExternalLink,
      image: imageUri,
      name: nftName,
      attributes: traits,
    });
    const tokenURI = getPinataUri(metadataUri.data.data.IpfsHash);
    const { signer } = await getProvier();
    if (signer) {
      new NftFactory(signer).mint();
    }
  };
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Add Trait</Modal.Header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formElements: any = form.elements as typeof form.elements;
            const type = formElements[0]['value'];
            const name = formElements[1]['value'];
            handleAddTrait({ type, name });
          }}
        >
          <Modal.Body>
            <div className="flex gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="type" value="Type" />
                </div>
                <TextInput
                  id="type"
                  name="type"
                  placeholder="Ex: Size"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="traitName" value="Name" />
                </div>
                <TextInput
                  name="traitName"
                  id="traitName"
                  placeholder="Ex: Medium"
                  required
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="submit"
              // onClick={handleAddTrait}
              className="w-full px-4 py-2 font-bold rounded bg-rose-500 text-white"
            >
              Add
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      <div className="p-6">
        <h1>Create an NFT</h1>
        <p className="text-sm my-4">
          Once your item is minted you will not be able to change any of its
          information.
        </p>
        <div className="flex">
          <div className="lg:basis-1/2 w-full p-6">
            <label
              htmlFor="media"
              className="relative flex flex-col justify-center items-center border-2 border-dashed border-gray rounded w-full h-96 hover:bg-gray-100"
              role="button"
              tabIndex={0}
              aria-label="Select an image, video, audio or 3D model file"
            >
              {previewImage !== null && (
                <FaTrashAlt
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewImage(null);
                  }}
                  className="absolute z-50 w-5 h-5 text-gray-500 top-2 right-2 hover:text-gray-900"
                />
              )}

              <input
                onChange={handleFileChange}
                id="media"
                name="media"
                type="file"
                style={{ display: 'none' }}
                tabIndex={-1}
              />

              {previewImage !== null ? (
                <div>
                  <Image
                    className="w-full h-96"
                    src={previewImage}
                    width={300}
                    height={300}
                    alt="preview"
                  />
                </div>
              ) : (
                <>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <div>
                      <FiUpload className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <span
                        className="leading-md font-semibold text-sm leading-sm lg:text-md lg:leading-md"
                        data-id="TextBody"
                      >
                        Drag and drop media
                      </span>
                      <span
                        className="text-sm leading-sm font-semibold text-blue-300"
                        data-id="TextBody"
                      >
                        Browse files
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col pb-3 xs:px-4 lg:px-16">
                    <span
                      className="text-sm text-center leading-sm text-secondary"
                      data-id="TextBody"
                    >
                      Max size: 50MB
                    </span>
                    <span
                      className="text-sm text-center leading-sm text-secondary"
                      data-id="TextBody"
                    >
                      JPG, PNG, GIF, SVG, MP4
                    </span>
                  </div>
                  <div className="flex flex-col justify-center items-center"></div>
                </>
              )}
            </label>
          </div>
          <div className="lg:basis-1/2 w-full">
            <div className="form w-full px-12">
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label className="font-bold" htmlFor="Name" value="Name *" />
                </div>
                <TextInput
                  id="Name"
                  placeholder="Your NFT Name"
                  required
                  onChange={(e) => {
                    setNftName(e.target.value);
                    setHelperText({ nftSupply: '', nftName: '' });
                  }}
                  name="NftName"
                  value={nftName}
                  color={helperText.nftName !== '' ? 'failure' : undefined}
                  helperText={
                    <span className="font-medium"> {helperText.nftName}</span>
                  }
                />
              </div>
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label
                    className="font-bold"
                    htmlFor="Name"
                    value="Supply *"
                  />
                </div>
                <TextInput
                  type="number"
                  id="Supply"
                  name="NftSupply"
                  placeholder="Total Supply"
                  onChange={(e) => {
                    setNftSupply(Number(e.target.value));
                    setHelperText({ nftSupply: '', nftName: '' });
                  }}
                  required
                  value={nftSupply}
                  color={helperText.nftSupply !== '' ? 'failure' : undefined}
                  helperText={
                    <span className="font-medium"> {helperText.nftSupply}</span>
                  }
                />
              </div>
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label
                    className="font-bold"
                    htmlFor="Description"
                    value="Description"
                  />
                </div>

                <Textarea
                  id="Description"
                  placeholder="Enter Description"
                  rows={5}
                  onChange={(e) => setNftDescription(e.target.value)}
                  value={nftDescription}
                />
              </div>
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label
                    className="font-bold"
                    htmlFor="External link"
                    value="External link"
                  />
                </div>
                <TextInput
                  id="External link"
                  value={nftExternalLink}
                  onChange={(e) => setNftExternalLink(e.target.value)}
                  placeholder="https://collection"
                  required
                />
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-md mb-2">Traits</h3>
                <p className="text-sm mb-4">
                  Traits describe attributes of your item. They appear as
                  filters inside your collection page and are also listed out
                  inside your item page.
                </p>
                <div className="my-4">
                  {traits.map((trait) => {
                    return (
                      <div
                        className="flex items-center bg-gray-200 w-full p-2 rounded mb-2"
                        key={trait.type}
                      >
                        <p className="flex-1">
                          {trait.type} | {trait.name}
                        </p>
                        <IoMdClose
                          onClick={() => {
                            const removed = traits.filter(
                              (item) => item.type !== trait.type
                            );
                            setTraits(removed);
                          }}
                          className="w-4 h-4 cursor-pointer transition hover:w-5 hover:h-5 hover:opacity-60"
                        />
                      </div>
                    );
                  })}
                </div>
                <Button
                  onClick={() => setOpenModal(true)}
                  className="font-semibold"
                  color="gray"
                >
                  <FaPlus className="mr-2" /> Add Trait
                </Button>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleCreateNFT}
                  className="w-full px-4 py-2 font-bold rounded bg-rose-500 text-white"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
