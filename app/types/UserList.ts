interface ProfileUser {
  result: {
    id: string;
    email: string;
    fund: string;
    phone: string;
    profile: profile;
    roles: {
      name: string;
    }[];
  };
}

interface profile {
  address: string;
  bio: string;
  city: string;
  company: string;
  country: string;
  disabilityDescription: string;
  disabilityType: string;
  dob: string;
  fullName: string;
  gender: string;
  id: number;
  phone: string;
  profilePicture: {
    url: string;
  };
  seller: string;
  roles: {
    name: string;
  }[];
}
