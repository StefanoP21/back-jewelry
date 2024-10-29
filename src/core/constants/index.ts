export const ZERO = 0 as const;
export const ONE = 1 as const;
export const THREE = 3 as const;
export const FOUR = 4 as const;
export const SIX = 6 as const;
export const EIGHT = 8 as const;
export const NINE = 9 as const;
export const TEN = 10 as const;
export const SIXTY = 60 as const;
export const ONE_HUNDRED = 100 as const;
export const ONE_THOUSAND = 1000 as const;

export const IGV = 1.18;

export const REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const REGEX_DNI = /^(?!0{3,})(?!(\d)\1{7})\d{8}$/;

export type Role = 'ADMIN' | 'USER';

export enum HttpCode {
	OK = 200,
	CREATED = 201,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500
}

export enum ErrorType {
	BAD_REQUEST = 'BAD_REQUEST',
	UNAUTHORIZED = 'UNAUTHORIZED',
	FORBIDDEN = 'FORBIDDEN',
	NOT_FOUND = 'NOT_FOUND',
	INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

export enum ErrorMessages {
	//* AUTH
	USER_NOT_FOUND = 'Usuario no encontrado',
	USER_ALREADY_REGISTERED = 'Usuario ya registrado',
	INVALID_CREDENTIALS = 'Credenciales incorrectas',

	//* PRODUCT
	PRODUCT_NOT_FOUND = 'Producto no encontrado',

	//* PURCHASE
	PURCHASE_NOT_FOUND = 'Compra no encontrada',

	//* REFUND
	REFUND_NOT_FOUND = 'Devolución no encontrada',

	//* TOKEN
	TOKEN_NOT_FOUND = 'No hay un token en la petición',
	WRONG_AUTHORIZATION_HEADER = 'Header de autorización no válido (se requiere Bearer token)',
	INVALID_TOKEN = 'Token inválido',

	//* INTERNAL SERVER ERROR
	INTERNAL_SERVER_ERROR = 'Error interno del servidor',

	//* CATEGORY
	CATEGORY_NOT_FOUND = 'Categoría no encontrada'
}
