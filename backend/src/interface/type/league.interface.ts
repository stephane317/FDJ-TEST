import { ObjectId } from 'mongodb'

export interface ILeague {
  _id?: ObjectId
  name: string
  sport: string
  teams: ObjectId[]
}
