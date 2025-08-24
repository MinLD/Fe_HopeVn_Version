export interface Ty_User {
  id: string;
  email: string;
  fund: number;
  profile: Ty_profile_User;
  roles: {
    name: string;
  }[];
  accepted: boolean;
}

export interface Ty_Cv {
  id?: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  dob: string;
  skill: string;
  exp: string;
  education: string;
  typeOfDisability: string;
  typeOfJob: string;
}

export interface Ty_profile_User {
  country: string;
  address: string;
  email: string;
  bio: string;
  city: string;
  dob: string;
  fullName: string;
  gender: string;
  id: string;
  phone: string;
  profilePicture: {
    url: string | null;
  };
}

export interface DecodedToken {
  sub: string;
  scope?: string;
  iss: string;
  exp: number;
  iat: number;
  userId: string;
  jti: string;
}
