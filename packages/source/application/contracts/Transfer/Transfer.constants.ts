export const transferUnique = Symbol('transfer');

export const TRANSFER_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
} as const;

export const TRANSFER_STATUSES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  PARTIAL_CONTENT: 206,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  UNKNOWN_ERROR: 520
} as const;

export const TRANSFER_SUCCESS_STATUSES = [
  TRANSFER_STATUSES.OK,
  TRANSFER_STATUSES.CREATED,
  TRANSFER_STATUSES.NO_CONTENT
] as const;

export const TRANSFER_ERROR_STATUSES = [
  TRANSFER_STATUSES.BAD_REQUEST,
  TRANSFER_STATUSES.UNAUTHORIZED,
  TRANSFER_STATUSES.FORBIDDEN,
  TRANSFER_STATUSES.NOT_FOUND,
  TRANSFER_STATUSES.CONFLICT,
  TRANSFER_STATUSES.INTERNAL_SERVER_ERROR
] as const;