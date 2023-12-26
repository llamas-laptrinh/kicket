'use client';
import React from 'react';

import { Label, Modal, Select, TextInput } from 'flowbite-react';

type ListModal = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  onCloseModal: () => void;
  isShow: boolean;
};

export default function ListModal({
  isShow,
  onCloseModal,
  onSubmit,
}: ListModal) {
  const [duration, setDuration] = React.useState<Date>(new Date());
  const [amount, setAmount] = React.useState<string>();
  const [isReady, setReady] = React.useState(false);
  const onChangeText = (e: any) => {
    const key = setTimeout(() => {
      const value = e.target.value;
      if (value > 0 || value !== '') {
        setReady(true);
      } else {
        setReady(false);
      }
      setAmount(value);
      clearTimeout(key);
    }, 395);
  };
  return (
    <Modal show={isShow} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Quick List
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="amount" value="Set a price *" />
              </div>
              <TextInput
                className="appearance-none forced-colors:appearance-auto"
                key="amount"
                autoFocus
                type="number"
                id="amount"
                placeholder="amount"
                required
                onChange={onChangeText}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="duration" value="Duration" />
              </div>
              <div className="flex gap-2">
                <Select
                  onChange={(e) => {
                    const value = e.target.value;
                    const date = new Date();
                    date.setHours(date.getHours() + Number(value));
                    setDuration(date);
                  }}
                  className="basis-1/3"
                >
                  {[
                    { id: '1', key: '1 hour', value: 1 },
                    { id: '2', key: '6 hour', value: 6 },
                    { id: '3', key: '3 days', value: 72 },
                    { id: '4', key: '1 month', value: 24 * 30 },
                  ].map(({ id, value, key }) => {
                    return (
                      <option key={id} value={value}>
                        {key}
                      </option>
                    );
                  })}
                </Select>
                <TextInput
                  className="basis-2/3"
                  id="duration"
                  type="datetime-local"
                  value={duration
                    .toISOString()
                    .slice(-duration.toISOString().length, -8)}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-between">
              <div className="flex items-center gap-2">
                <h3 className="flex-1">Listing price</h3>
                <p>{amount ? amount : '--'} VIC</p>
              </div>

              <div className="flex items-center gap-2">
                <h3 className="flex-1">fee</h3>
                <p>2.0%</p>
              </div>

              <div className="flex items-center gap-2">
                <h3 className="flex-1 font-bold">Total potential earnings</h3>
                <p>
                  {amount ? Number(amount) - (Number(amount) * 2) / 100 : '--'}{' '}
                  VIC
                </p>
              </div>
            </div>
            <div>
              <button
                disabled={!isReady}
                className="disabled:opacity-75 w-full bg-rose-500 px-4 py-2 text-white text-center"
                type="submit"
              >
                Complete Listing
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
