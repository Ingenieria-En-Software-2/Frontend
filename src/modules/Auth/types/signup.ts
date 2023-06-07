export type SignupFormInputs = {
  generalInfo: {
    names: string;
    surnames: string;
    email: string;
    password: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    idDocument: string;
    phone: string;
  };
  residenceInfo: {
    country: string;
    state: string;
    city: string;
    subregion: string;
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
