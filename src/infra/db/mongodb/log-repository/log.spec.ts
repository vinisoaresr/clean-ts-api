import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LogErrorMongoRepository } from './log'

describe('Log Error Mongo Repository', () => {
  let logCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    logCollection = await MongoHelper.getCollection('errors')
    await logCollection.deleteMany({})
  })

  const makeSut = (): LogErrorMongoRepository => {
    return new LogErrorMongoRepository()
  }

  test('Should create an error on success', async () => {
    const sut = makeSut()
    await sut.log('any_stack')
    const count = await logCollection.countDocuments()
    expect(count).toBe(1)
  })
})
