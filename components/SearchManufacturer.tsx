'use client'

import Image from "next/image";
import { Fragment, useState } from "react";

import { Combobox, Transition } from "@headlessui/react";
import { manufacturers } from "@/contants";



type SearchManufacturerProps = {
    manufacturer: string,
    setManufacturer: (manufacturer: string) => void
}
const SearchManufacturer = ({ manufacturer, setManufacturer }: SearchManufacturerProps) => {
    const [query, setQuery] = useState('')

    const filteredManufacturers =
        query === ''
            ? manufacturers
            : manufacturers.filter(manufacturer =>
                manufacturer.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")));

    return (
        <div className='flex-1 max-sm:w-full flex justify-start items-center'>
            <Combobox value={manufacturer} onChange={setManufacturer}>
                <div className='relative w-full'>
                    {/* Button for the combobox. Click on the icon to see the complete dropdown */}
                    <Combobox.Button className='absolute top-[14px]'>
                        <Image
                            src='/car-logo.svg'
                            alt='car logo'
                            width={20}
                            height={20}
                            className='ml-4'
                        />
                    </Combobox.Button>

                    {/* Input field for searching */}
                    <Combobox.Input
                        className='w-full h-[48px] pl-12 p-4 rounded-l-full max-sm:rounded-full bg-light-white outline-none cursor-pointer text-sm'
                        displayValue={(manufacturer: string) => manufacturer}
                        onChange={e => setQuery(e.target.value)}
                        placeholder='Volkswagen...'
                    />

                    {/* Transition for displaying the options */}
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm' static>
                            {filteredManufacturers.length === 0 && query !== "" ? (
                                <Combobox.Option value={query} className='cursor-default select-none py-2 pl-10 pr-4'>
                                    Nothing found
                                </Combobox.Option>
                            )
                                : (filteredManufacturers.map(manufacturer => (
                                    <Combobox.Option key={manufacturer} value={manufacturer} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary-blue text-white' : 'text-gray-600'}`}>
                                        {({ selected, active }) => (
                                            <>
                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                    {manufacturer}
                                                </span>

                                                {/* Show an active blue background color if the option is selected */}
                                                {selected ? (
                                                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-pribg-primary-purple'}`}>
                                                        ✔
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                )))}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SearchManufacturer