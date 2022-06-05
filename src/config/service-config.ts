import AuthServiceClient from "../service/AuthServiceClient";
import CoursesServiceRest from "../service/CoursesServiceRest";
import AuthServiceJwt from "../service/AuthServiceJwt";

export const coursesService = new CoursesServiceRest('http://localhost:3500/courses');
export const authService = new AuthServiceJwt('http://localhost:3500/login');