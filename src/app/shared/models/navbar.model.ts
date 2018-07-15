/**
 * Describes a Navigation Route for NavbarSmallComponent
 */
export interface INavRoute {
  path: string;
  link: string;
  disabled?: boolean;
}
/**
 * Describes an options object for NavbarComponent
*/
export interface INavOptions {
  routes: INavRoute[];
  title: string;
}
