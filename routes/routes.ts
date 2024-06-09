/**
 * routes privee
 * seul les prenuims peuvent y acceder
 * @type {Array}
 */
export const privateRoute = [
    "/settings"
]

/**
 * routes d'authentification
 * @type {Array}
 */
export const authRoute = [
        "/auth/login",
        "/auth/register"
]
/**
 * permet d'atoriser les api de fonctionner sans restriction
 * @type {string}
 */
export const apiPrefix = "/api"


export const DEFAULT_REDIRECT_URL = "/"