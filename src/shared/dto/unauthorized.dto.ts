export class UnauthorizedDto {
  /**
   * Status code in body
   * @example 401
   */
  statusCode: number;

  /**
   * Error message
   * @example 'Unauthorized'
   */
  message: string;
}
