/* eslint-disable @typescript-eslint/ban-types */
export {};

declare global {
  namespace NodeJS {
    interface Global {
      [key: string]: object;
    }
  }
  interface Window {
    config: {
      env: string;
      apiServices?: { [key: string]: string };
    };
    colorPresets: {
      [key: string]: {
        id: string;
        name: string;
        primary: string;
        secondary: string;
      };
    };
  }
}
