import CarCard from '@/components/CarCard'
import CustomFilter from '@/components/CustomFilter'
import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'
import ShowMore from '@/components/ShowMore'
import { yearsOfProduction, fuels } from '@/contants'
import { FilterProps, fetchCars } from '@/utils'

import Image from 'next/image'

type HomeProps = {
  searchParams: FilterProps
}

export default async function Home({ searchParams }: HomeProps) { 

  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });
  
  const isEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className="overflow-hidden">
      <Hero />

      <div className='mt-12 px-6 sm:px-16 py-4 max-w-[1440px] mx-auto' id='discover'>
        <div className="flex flex-col justify-start items-start gap-y-2.5 text-black-100">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore our cars you might like</p>
        </div>

        <div className="mt-12 w-full flex-between items-center flex-wrap gap-5">
          <SearchBar />

          <div className='flex justify-start items-center flex-wrap gap-2'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        {!isEmpty 
          ? (
            <section>
              <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14'>
                {allCars?.map(car => (
                  <CarCard car={car} />
                ))}
              </div>

              <ShowMore 
                pageNumber={(searchParams.limit || 10) / 10}
                isNext={(searchParams.limit || 10) > allCars.length}
              />
            </section>
          ) 
          : (
            <div className='mt-16 flex justify-center items-center flex-col gap-2'>
              <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
          )
        }
      </div>
    </main>
  )
}
