import { LogErrorRepository } from '../../../../data/protocols/logErrorRepository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogErrorMongoRepository implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('errors')
    await accountCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
