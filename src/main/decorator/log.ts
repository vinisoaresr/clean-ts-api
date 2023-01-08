import { LogErrorRepository } from '../../data/protocols/logErrorRepository'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator {
  private readonly controller: Controller
  private readonly logErrorRepo: LogErrorRepository

  constructor(controller: Controller, logErrorRepo: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepo = logErrorRepo
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepo.log(httpResponse.body.stack)
    }
    return httpResponse
  }
}
