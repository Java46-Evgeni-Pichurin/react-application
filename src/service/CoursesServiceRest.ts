import { Course } from "../models/Course";
import { OperationCode } from "../models/OperationCode";
import { responseProcessing } from "../util/functions";
import { AUTH_TOKEN_ITEM } from "./AuthServiceJwt";
import CoursesService from "./CoursesService";
function getHeaders(): any {
    return {Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN_ITEM),
"Content-Type": "application/json"}
}

export default class CoursesServiceRest implements CoursesService {
    constructor(private url: string){
        console.log(url)
    }
    async add(course: Course): Promise<void> {
        (course as any).userId = 1;
        let response: Response;
        try {
             response = await fetch(this.url, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(course)
            });
            
        } catch (err) {
            throw OperationCode.SERVER_UNAVAILABLE;
        }
        responseProcessing(response);
    }
    async remove(id: number): Promise<void> {
        let response: Response
        try {
             response = await fetch(this.getUrlId(id), {
                method: "DELETE",
                headers: getHeaders()
            })
            
        } catch (err) {
            throw OperationCode.SERVER_UNAVAILABLE;
        }
        responseProcessing(response);
    }
    private getUrlId(id: number): RequestInfo {
        return `${this.url}/${id}`;
    }
    async update(id: number, course: Course): Promise<void> {
        let response: Response
        try {
             response = await fetch(this.getUrlId(id), {
                method: "PUT",
                headers: getHeaders(),
                body: JSON.stringify(course)
                
            })
            
        } catch (err) {
            throw OperationCode.SERVER_UNAVAILABLE; 
        }
        responseProcessing(response);
    }
    async get(): Promise<Course[]> {
      let response: Response;
        try {
          response =  await fetch(this.url, {
                headers: getHeaders()
            });
            
        } catch (err) {
            throw OperationCode.SERVER_UNAVAILABLE; 
        } 
        const courses: Course[] = await responseProcessing(response);
            return courses.map(c =>
                ({...c, openingDate: new Date(c.openingDate)}))
         
    }
    
}