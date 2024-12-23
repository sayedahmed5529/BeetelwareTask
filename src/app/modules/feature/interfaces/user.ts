export interface User {
    id: number;
    name: string;
    email: string;
    phone?: number;
    status?: 'active' | 'soft_deleted';
    username?: string;
    password?: string;
    role?: 'admin' | 'user'; 
  }

 