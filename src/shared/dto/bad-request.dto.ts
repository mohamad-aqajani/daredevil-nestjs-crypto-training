export class BadRequestDto {
  /**
   * Status code in body
   * @example 400
   */
  statusCode: number;

  /**
   * List of error messages
   * @example ['property test should not exist']
   */
  message: Array<string>;

  /**
   * Error message
   * @example 'Bad Request'
   */
  error: string;
}
