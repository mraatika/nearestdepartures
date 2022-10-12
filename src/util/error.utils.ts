export class BaseError extends Error {
  constructor(message: string, public type: string) {
    super(message);
  }
}

export class NetworkError extends BaseError {
  constructor(message: string) {
    super(message, 'NetworkError');
  }
}

export class PositionError extends BaseError {
  constructor(message: string, public code: number = 0) {
    super(message, 'PositionError');
  }

  static from(e: GeolocationPositionError) {
    return new PositionError(e.message, e.code);
  }
}

/**
 * Messages for position errors
 */
const POSITION_ERROR_CODES: Record<number, string> = {
  1: 'Sijainnin haku on estetty tai kytketty pois',
  2: 'Sijaintipalveluun ei saatu yhteyttä',
  3: 'Sijainnin haku kesti liian kauan',
};

/**
 * Format an human readable error message by type
 */
export const formatError = (error: Error) => {
  if (error instanceof PositionError) {
    return `Paikannus epäonnistui: ${POSITION_ERROR_CODES[error.code]}.`;
  }

  return error.message;
};
