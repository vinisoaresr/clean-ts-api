import { serverError } from '../../presentation/helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'
import { LogErrorRepository } from '../../data/protocols/logErrorRepository'

describe('Log Controller Decorator ', () => {
  const makeLogErrorRepository = (): LogErrorRepository => {
    class LogErrorRepositoryStub implements LogErrorRepository {
      async log (stack: string): Promise<void> {
        return new Promise(resolve => resolve())
      }
    }

    return new LogErrorRepositoryStub()
  }
  const makeController = (): Controller => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          statusCode: 200,
          body: {
            name: 'test'
          }
        }
        return new Promise(resolve => resolve(httpResponse))
      }
    }

    return new ControllerStub()
  }

  interface sutTypes {
    sut: LogControllerDecorator
    controllerStub: Controller
    logErrorRepositoryStub: LogErrorRepository
  }

  const makeSut = (): sutTypes => {
    const controllerStub = makeController()
    const logErrorRepositoryStub = makeLogErrorRepository()
    const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
    return { sut, controllerStub, logErrorRepositoryStub }
  }

  test('Should call internal handle controller with correct param', async () => {
    const { sut, controllerStub } = makeSut()
    const controllerSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        name: 'test'
      }
    }
    await sut.handle(httpRequest)
    expect(controllerSpy).toHaveBeenCalledWith(httpRequest)
  })
  test('Should return a correct return of the handle controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'test'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: httpRequest.body
    })
  })
  test('Should call LogControllerRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const mockError = new Error()
    mockError.stack = 'any_stack'
    const mockServerError = serverError(mockError)
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(mockServerError)))
    const httpRequest = {
      body: {}
    }
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith(mockError.stack)
  })
})
