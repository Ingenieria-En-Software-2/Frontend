export type SignupFormInputs = {
  generalInfo: {
    names: string;
    surnames: string;
    email: string;
    password: string;
    dateOfBirth: string;
    genre: string;
    nationality: string;
    idDocument: string;
    phone: string;
  };
  residenceInfo: {
    county: string;
    state: string;
    city: string;
    city2: string;
    sector: string;
    street: string;
    building: string;
  };
  workInfo: {
    company: string;
    rif: string;
    phone: string;
    country: string;
    state: string;
    city: string;
  };
};
