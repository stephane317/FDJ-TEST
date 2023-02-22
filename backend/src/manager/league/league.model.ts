// import { DateTime } from 'luxon'
import { ILeague } from '@type/league.interface'
import { Document, model, Model, Schema } from 'mongoose'

export const LeagueSchema: Schema = new Schema(
  {
    name: { type: String, index: true },
    sport: String,
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Teams'
      }
    ]
  },
  {
    timestamps: true
  }
)

LeagueSchema.index({ name: 'text' })

export const Leagues: Model<ILeague & Document> = model<ILeague & Document>('Leagues', LeagueSchema, 'leagues')
