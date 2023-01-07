import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

describe('Bcrypt  Adapter', () => {
  test('Should calls Bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
  test('Should return hashed value on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashedValue = await sut.encrypt('any_value')
    expect(hashedValue).toBe('hash')
  })
})
