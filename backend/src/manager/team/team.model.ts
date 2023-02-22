// import { DateTime } from 'luxon'
import { ITeam } from '@type/team.interface'
import { Document, model, Model, Schema } from 'mongoose'

export const TeamSchema: Schema = new Schema(
  {
    name: String,
    thumbnail: String,
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Players'
      }
    ]
  },
  {
    timestamps: true
  }
)

export const Teams: Model<ITeam & Document> = model<ITeam & Document>('Teams', TeamSchema, 'teams')
