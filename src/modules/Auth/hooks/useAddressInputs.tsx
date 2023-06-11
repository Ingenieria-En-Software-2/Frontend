import { useState } from "react";
import { Country, State, City, ICountry, IState, ICity } from "country-state-city";

const allCountries = Country.getAllCountries();

interface AddressInputs {
  country: string;
  state: string;
  city: string;
}

interface AddressFilteredOptions {
  countries: ICountry[];
  states: IState[];
  cities: ICity[];
}

/**
 * Custom hook to handle address inputs
 *
 * @returns {object} address, options, handlers
 *   - address: object with country, state and city selected as string
 *   - options: object with countries, states and cities filtered as ICountry[],
 *     IState[] and ICity[]
 *   - handlers: object with functions to handle changes on country, state and city
 */
export const useAddressInputs = () => {
  const [selected, setSelected] = useState<AddressInputs>({
    country: "",
    state: "",
    city: "",
  });

  const [options, setOptions] = useState<AddressFilteredOptions>({
    countries: allCountries,
    states: [],
    cities: [],
  });

  const handleChangeCountry = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOptions({
      ...options,
      states: State.getStatesOfCountry(event.target.value),
      cities: [],
    });

    setSelected({
      country: event.target.value,
      state: "",
      city: "",
    });
  };

  const handleChangeState = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOptions({
      ...options,
      cities: City.getCitiesOfState(selected.country, event.target.value),
    });

    setSelected({
      ...selected,
      state: event.target.value,
      city: "",
    });
  };

  const handleChangeCity = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSelected({
      ...selected,
      city: event.target.value,
    });
  };

  const handlers = {
    country: handleChangeCountry,
    state: handleChangeState,
    city: handleChangeCity,
  };

  return {
    selected,
    options,
    handlers,
  };
};
