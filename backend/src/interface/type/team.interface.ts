import { ObjectId } from 'mongodb'

export interface ITeam {
  _id?: ObjectId
  name: string
  thumbnail: string
  players: ObjectId[]
}
