export enum ECurrency {
  EUR = 'eur',
}

export interface IPlayer {
  _id?: string;
  name: string;
  position: string;
  thumbnail: string;
  signin: {
    amount: number;
    currency: ECurrency;
  };
  born: Date;
}
