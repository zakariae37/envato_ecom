/* eslint-disable no-unused-vars */
export { };
 
// Create a type for the roles
export type Roles = "admin" | "moderator";
 
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    };
  }
}