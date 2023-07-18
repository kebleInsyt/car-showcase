import { CarProps } from "@/components/CarCard";

export interface FilterProps {
  manufacturer: string,
  year: number,
  fuel: string,
  limit: number,
  model: string
}

export function updateSearchParams(title: string, value: string) {
  // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search)

    // Update or delete the 'model' and 'manufacturer search parameter based on their state value
    searchParams.set(title, value)
   

    // Generate the new pathname with the updated search parameters
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    return newPathname
}

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, fuel, limit, model} = filters

  const headers: HeadersInit = {
    "X-RapidAPI-Key": "830b26f898msh1388a765b45aa99p126715jsn28f2748eca79",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  const result = await response.json();

  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 1500; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL('https://cdn.imagin.studio/getimage');
    const { make, model, year } = car;

    url.searchParams.append('customer', 'hrjavascript-mastery');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`;
}   
