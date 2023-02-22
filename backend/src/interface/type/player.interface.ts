import { ObjectId } from 'mongodb'

export enum ECurrency {
  EUR = 'eur'
}

export interface IPlayer {
  _id?: ObjectId
  name: string
  position: string
  thumbnail: string
  signin: {
    amount: number
    currency: ECurrency
  }
  born: Date
}
