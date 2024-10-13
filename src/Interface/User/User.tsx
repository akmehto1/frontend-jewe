export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'user'; // Adjust roles as necessary
    level: number;
    userId: string;
    accessToken:string;

  }
  