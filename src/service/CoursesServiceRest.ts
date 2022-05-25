import { Course } from "../models/Course";
import { getIsoDate } from "../util/functions";
import CoursesService from "./CoursesService";

export default class CoursesRest implements CoursesService {
    #url
    constructor(url: string) {
        this.#url = url;
    }
    async add(course: Course): Promise<void> {
        const response = await fetch(this.#url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(course)
        });
        return await response.json();
    }
    async get(): Promise<Course[]> {
        const response = await fetch(this.#url);
        const course = await response.json();
        return course.map((courses: Course) => {
            courses.openingDate = new Date(courses.openingDate);
            return courses;
        });
    }

    async update(id: number, newCourse: Course): Promise<void> {
       const response = await fetch(this.#getUrlById (id), {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newCourse)
        })
        return await response.json();
    }
    async remove(id: number): Promise<void> {
        const res = this.getCourse(id);
        await fetch(this.#getUrlById(id), {
            method: 'DELETE'
        })
    }
    #getUrlById(id: number): string {
        return `${this.#url}/${id}`;
    }

    async getCourse(id: number): Promise<Course> {
        const response = await fetch(this.#getUrlById(id));
        return await response.json();
    }
    async exists(id: number): Promise<boolean> {
        let res;
        try {
            await fetch(this.#getUrlById(id));
            res = true;
        } catch (err) {
            console.log(err);
            res = false;
        }
        return res;
    }
}