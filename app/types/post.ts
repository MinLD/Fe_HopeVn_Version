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
export interface Ty_dataCommentPost {
  content: string;
  createdAt: string;
  id: number;
  postId: number;
  postTitle: string;
  userId: string;
  userEmail: string;
  userName: string;
  userProfilePicture: string;
}
export interface Ty_dataCommentPostVolunteer {}
