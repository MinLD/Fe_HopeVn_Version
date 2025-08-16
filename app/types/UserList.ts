interface Ty_User {
  id: string;
  email: string;
  fund: number;
  phone: string;

  profile: Ty_profile_User;
  roles: {
    name: string;
  }[];
  accepted: boolean;
}

interface Ty_profile_User {
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

interface DecodedToken {
  sub: string;
  scope?: string;
  iss: string;
  exp: number;
  iat: number;
  userId: string;
  jti: string;
}
