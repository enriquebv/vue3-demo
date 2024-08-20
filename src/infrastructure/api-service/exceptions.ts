export class NotFoundError extends Error {
  constructor(message: string = 'Resource not found error') {
    super(message)
  }
}

export class VacancyNotFoundError extends NotFoundError {
  constructor(readonly id: string) {
    super(`Vacancy with id ${id} not found`)
  }
}

export class ResponseError extends Error {
  constructor(readonly reason: unknown) {
    super('Response error, check the reason property')
  }
}
