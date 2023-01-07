import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly repository: AddAccountRepository

  constructor(encrypter: Encrypter, repository: AddAccountRepository) {
    this.encrypter = encrypter
    this.repository = repository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.repository.add(Object.assign(accountData, { password: hashedPassword }))
    return new Promise(resolve => resolve(null))
  }
}
