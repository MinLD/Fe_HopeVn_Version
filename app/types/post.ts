export interface postFree {
  title: string;
  images: [
    {
      url: string;
    }
  ];
  isPublished: boolean;
  isPinned: boolean;
}

export interface postVolunteer {
  title: string;
  location: string;
  content: string;
  stk: string;
  bankName: string;
  files: [
    {
      url: string;
    }
  ];
}
export interface dataPost {
  title: string;
  content: string;
  name: string;
  id: number;
  createdAt: string;
  images: [
    {
      url: string;
    }
  ];
  type: string;
  userId: string;
  userPic: string;
  like: number;
}
