import AuthServiceClient from "../service/AuthServiceClient";
import CoursesServiceArray from "../service/CoursesServiceArray";
import CoursesServiceRest from "../service/CoursesServiceRest";

export const URL = 'http://localhost:3500/courses';
export const coursesService = new CoursesServiceRest(URL);
//export const coursesService = new CoursesServiceArray();
export const authService = new AuthServiceClient();