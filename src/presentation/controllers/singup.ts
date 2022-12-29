export class SignUpController {
  handle (httpRequest): any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('missing param: name')
      }
    }
    if (!httpRequest.body.mail) {
      return {
        statusCode: 400,
        body: new Error('missing param: mail')
      }
    }
  }
}
