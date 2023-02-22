// import { DateTime } from 'luxon'
import { ECurrency, IPlayer } from '@type/player.interface'
import { Document, model, Model, Schema } from 'mongoose'

export const PlayerSchema: Schema = new Schema(
  {
    name: String,
    position: String,
    thumbnail: String,
    signin: {
      amount: Number,
      currency: {
        type: String,
        enum: ECurrency
      }
    },
    born: Date
  },
  {
    timestamps: true
  }
)

export const Players: Model<IPlayer & Document> = model<IPlayer & Document>('Players', PlayerSchema, 'players')
