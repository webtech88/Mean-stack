import { environment } from '../../environments/environment';
/**
 * List all the API endpoints, to be used by the services.
 */
export class CoeliacAppAPI {

    private static get API_BASE_LOCAL(): string             { return 'http://localhost:3000/api'; }
    private static get API_BASE(): string                   {
      return environment.local ? CoeliacAppAPI.API_BASE_LOCAL : 'http://localhost:3000/api';
    }
    public static get REGISTER_ENDPOINT(): string            { return CoeliacAppAPI.API_BASE + '/register'; }
    public static get AUTH_ENDPOINT(): string                { return CoeliacAppAPI.API_BASE + '/users/authenticate'; }
    public static get GET_PROFILE(): string                  { return CoeliacAppAPI.API_BASE + '/users/profile'; }

    // user manangement
    public static get ADD_NEW_USER(): string                 { return CoeliacAppAPI.API_BASE + '/users'; }
    public static UPDATE_USER(id): string                    { return CoeliacAppAPI.API_BASE + `/users/${id}`; }
    public static get GET_USERS(): string                    { return CoeliacAppAPI.API_BASE + '/users'; }

    public static get AUTH_RESET(): string                   { return CoeliacAppAPI.AUTH_ENDPOINT + '/reset'; }
    public static AUTH_CONFIRM_RESET(id): string             { return CoeliacAppAPI.AUTH_RESET + `/confirm/${id}`; }

    public static get VERIFICATION_ENDPOINT(): string        { return CoeliacAppAPI.API_BASE + '/register/confirm'; }

}
