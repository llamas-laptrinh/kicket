'use client';
import SearchBar from '@app/components/SearchBar';
import { Button, Dropdown } from 'flowbite-react';
import { MdOutlineGridOn } from 'react-icons/md';
import { IoFilterSharp } from 'react-icons/io5';
import { LuLayoutList, LuLayoutGrid } from 'react-icons/lu';

import React from 'react';
import { filterCollections } from '@app/common/filters';

export default function Filter() {
  return (
    <section className="flex gap-4 items-center px-4">
      <Button color="gray">
        <IoFilterSharp className="h-4 w-4" />
      </Button>
      <Dropdown color="gray" label="Collected">
        {filterCollections.Collections.map(({ key, value }) => {
          return <Dropdown.Item key={key}>{value}</Dropdown.Item>;
        })}
      </Dropdown>
      <div className="flex-1">
        <SearchBar />
      </div>

      <Dropdown color="gray" label="Recently Created">
        {filterCollections.Price.map(({ key, value }) => {
          return <Dropdown.Item key={key}>{value}</Dropdown.Item>;
        })}
      </Dropdown>
      <Button.Group>
        <Button color="gray">
          <MdOutlineGridOn className="h-4 w-4" />
        </Button>
        <Button color="gray">
          <LuLayoutGrid className="h-4 w-4" />
        </Button>
        <Button color="gray">
          <LuLayoutList className="h-4 w-4" />
        </Button>
      </Button.Group>
    </section>
  );
}
