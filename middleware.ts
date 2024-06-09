import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { DEFAULT_REDIRECT_URL, apiPrefix, authRoute, privateRoute } from "./routes/routes"
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req) {
  // Your custom middleware logic goes here
   const isLogginIn = !! req.auth
   const {nextUrl} = req
   const isApiPrefix = nextUrl.pathname.startsWith(apiPrefix)
   const isAuthRoute = authRoute.includes(nextUrl.pathname)
   const isPrivateroute = privateRoute.includes(nextUrl.pathname)
   
   if (isApiPrefix) {
    return 
   }
   if (isAuthRoute) {
    if (isLogginIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT_URL,nextUrl))
    }
    return
   }
   if (isPrivateroute && !isLogginIn) {
        return Response.redirect(new URL(new URL("/auth/login",nextUrl)))
   }
   
})
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };