
export const checkBearerToken = (token?: string) => {
    return token && token.startsWith('Bearer')
}
