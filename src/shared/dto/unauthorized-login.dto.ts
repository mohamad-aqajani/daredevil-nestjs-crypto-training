export class UnauthorizedLoginDto {
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

  /**
   * If user does not verify his email address
   */
  isVerified: boolean;
}
