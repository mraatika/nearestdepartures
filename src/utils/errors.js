/**
 * @class NetworkError
 * @extends Error
 */
export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * @class PositionError
 * @extends Error
 */
export class PositionError extends Error{
  constructor (message) {
    super(message);
    this.name = 'PositionError';
  }
}
