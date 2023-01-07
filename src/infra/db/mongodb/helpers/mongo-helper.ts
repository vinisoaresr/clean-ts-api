import { Collection, MongoClient } from 'mongodb'

class MongoHelpers {
  private client: MongoClient

  async connect (URL: string): Promise<void> {
    this.client = await MongoClient.connect(URL)
  }

  async disconnect (): Promise<void> {
    await this.client.close()
  }

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}

export const MongoHelper = new MongoHelpers()
