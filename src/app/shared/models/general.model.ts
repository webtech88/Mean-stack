/**
 * Describes a Navigation Route for NavbarSmallComponent
 */
export interface TNavRoute {
  path: string;
  link: string;
  disabled?: boolean;
};
/**
 * Describes an options object for NavbarComponent
*/
export interface INavOptions {
  routes: TNavRoute[];
  title: string;
}
/**
 * Describes an Authorization State
 */
export interface TAuthState {
  authorized: boolean;
  token?: string;
}
