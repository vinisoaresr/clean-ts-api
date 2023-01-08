import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('Log Controller Decorator ', () => {
  const makeSut = (): any => {
    class StubController implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse = {
          statusCode: 200,
          body: {}
        }
        return new Promise(resolve => resolve(httpResponse))
      }
    }
    const stubController = new StubController()
    const sut = new LogControllerDecorator(stubController)
    return { sut, stubController }
  }

  test('Should call internal handle controller with correct param', async () => {
    const { sut, stubController } = makeSut()
    const controllerSpy = jest.spyOn(stubController, 'handle')
    const httpRequest = {
      test: 'test'
    }
    await sut.handle(httpRequest)
    expect(controllerSpy).toHaveBeenCalledWith(httpRequest)
  })
  test('Should return a correct return of the handle controller', () => {
  })
})
