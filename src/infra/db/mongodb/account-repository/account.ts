import { AddAccountRepository } from '../../../../data/protocols/addAccountRepository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/useCases/add-account/addAccount'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne({ _id: insertedId })
    return MongoHelper.mapToEntity(account)
  }
}
