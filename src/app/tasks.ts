export interface Task {
    id: number;
    name: string;
    url: string;
    description: string;
  }
  
  export const tasks = [
    {
      id: 1,
      name: 'Web Scraper Google',
      url: 'http://www.google.com',
      description: 'Checks Google every 3 minutes'
    },
    {
      id: 2,
      name: 'Web Scraper Youtube',
      url: 'http://www.youtube.com',
      description: 'Checks Youtube every 3 minutes'
    },
    {
      id: 3,
      name: 'Random Image Generator',
      description: 'Generates Random every 2 minutes'
    }
  ];