import { ObjectId, FindCursor } from 'mongodb'
import { Cursor, Query, Model, ClientSession, Document } from 'mongoose'

interface QueryOptions {
  session?: ClientSession
  multi?: boolean
  runValidators?: boolean
}

export class Mongoose {
  private Model: Model<any>

  constructor(collection: Model<any>) {
    this.Model = collection
  }

  /**
   * READ
   */

  public getAll<T>(query: object, populateFields?: string | string[], select = ''): Promise<T[]> {
    return this.Model.find(query).populate(populateFields).select(select).exec()
  }

  public getCountByQuery(query): Promise<number> {
    return this.Model.find(query).countDocuments().exec()
  }

  public findWithTransaction<T>(query: object, session: ClientSession): any {
    return this.Model.find(query).session(session)
  }

  public findByQuery<T>(query?: object): Promise<(T & Document)[]> {
    return this.Model.find(query).exec()
  }

  // A super fast find using the native mongodb driver and returning a cursor - use .toArray() to retrieve documents
  // public nativeFind<T>(): FindCursor<T> {
  public nativeFind<T>() {
    return this.Model.collection.find()
  }

  public getOneByQuery<T>(query: object, populateFields: string | string[] = '', select = ''): Promise<T & Document> {
    return this.Model.findOne(query).populate(populateFields).select(select).exec()
  }

  public getOneByQueryLean<T>(query: object, populateFields: string | string[] = '', select = '') {
    const res = this.Model.findOne(query).populate(populateFields).select(select).lean().exec() as Promise<T>

    return res
  }

  public getOneById<T>(id: ObjectId | string, populateFields?: string | string[], select = ''): any {
    populateFields = populateFields || ''
    return this.Model.findById(id).populate(populateFields).select(select).lean().exec()
  }

  // public getManyByQuery<T>(query: object = {}, populateFields = '', sort?: { [field: string]: number }): Promise<T[]> {
  public getManyByQuery<T>(query: object = {}, populateFields = '', sort: { [arg: string]: any } = {}): Promise<T[]> {
    return this.Model.find(query).sort(sort).populate(populateFields).exec()
  }

  public getManyByQueryLean<T>(query: object = {}, populateFields?: string | string[], select = ''): Promise<T[]> {
    return this.Model.find(query).populate(populateFields).select(select).lean().exec()
  }

  public async getManyPaginateByQuery<T>(
    query: object = {},
    populateFields = '',
    paginate = { pageSize: 10, pageIndex: 0 },
    sort: { [arg: string]: any } = {}
  ): Promise<T[]> {
    return this.Model.find(query)
      .populate(populateFields)
      .sort(sort)
      .skip(paginate.pageSize * paginate.pageIndex)
      .limit(paginate.pageSize)
  }

  public aggregate<T>(pipelines: any[]): Promise<T[]> {
    return this.Model.aggregate(pipelines).allowDiskUse(true).exec()
  }

  public aggregateAllowDiskUse<T>(pipelines: any[]): Promise<T[]> {
    return this.Model.aggregate(pipelines).allowDiskUse(true).exec()
  }

  /**
   * CREATE
   */

  public create<T>(newData: T | object, session?: ClientSession): Promise<T & Document> {
    const newObject = new this.Model(newData)
    return newObject.save(session)
  }

  public createMany<T>(documents: T[], options?: QueryOptions): Promise<T[]> {
    return this.Model.insertMany(documents, options)
  }

  // A fast way to insert document using the native mongodb driver (bypassing mongoose driver)
  public bulkWrite(pipeline, options?): Promise<any> {
    // Bug in typing - options is detected as a callback and then the expression resolves to void so as unknown as Promise is necessary
    return this.Model.collection.bulkWrite(pipeline, options) as unknown as Promise<any>
  }

  /**
   * UPDATE
   */

  public updateOneById<T>(id: ObjectId | string, data, populateFields?: string | string[], select = ''): Promise<T> {
    const res = this.Model.findByIdAndUpdate(id, data, { new: true }).populate(populateFields).select(select).exec()
    return res
  }

  public updateOneByQuery<T>(query: object, data: object, options = {}): Promise<T & Document> {
    return this.Model.findOneAndUpdate(query, data, { new: true, ...options }).exec()
  }

  public updateManyByQuery(query: object, data: object, options: QueryOptions = {}) {
    return this.Model.updateMany(query, data, { ...options }).exec()
  }

  /**
   * DELETE
   */

  // @TODO - check if it returns Document & T -> if so add it
  public deleteOneByQuery(query: object, options: QueryOptions = {}): Promise<any> {
    return this.Model.findOneAndDelete(query, options).exec()
  }

  // @TODO - check if it returns Document & T -> if so add it
  public deleteOneById(id: ObjectId, options?: QueryOptions): Promise<any> {
    return this.Model.findByIdAndDelete(id, options).exec()
  }

  public async deleteManyByQuery(query: object = {}): Promise<any> {
    return this.Model.deleteMany(query)
  }
}
