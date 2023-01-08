import { SignUpController } from '../../presentation/controllers/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/useCases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorator/log'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcrypt = new BcryptAdapter(salt)
  const emailValidator = new EmailValidatorAdapter()
  const addAccountRepo = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcrypt, addAccountRepo)
  const signUpController = new SignUpController(emailValidator, addAccount)
  return new LogControllerDecorator(signUpController)
}
