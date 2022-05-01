import { useDispatch } from "react-redux";
import { ImitatorAction, imitatorActions } from "../config/imitator-config";
import { addCourse, removeCourse, updateCourse } from "../redux/actions";
import { getRandomCourse } from "./randomCourse";
import courseData from "../config/courseData.json"
import { getRandomNumber } from "./random";
import { useEffect } from "react";
import { coursesService } from "../config/service-config";
export function useImitator() {
    const dispatch = useDispatch();
    useEffect(() => {
        const intervalId = setInterval(action, 100);

        return () => clearInterval(intervalId)
    }, [])

    function action() {
        const number = getRandomNumber(1, 100);
        console.log(number);
        const imitatorAction: ImitatorAction = getAction(number);
        switch (imitatorAction.action) {
            case 'add': dispatchAdd(); break;
            case 'remove': dispatchRemove(); break;
            case 'update': dispatchUpdate(); break;
            default: break;
        }
    }
    function dispatchAdd() {
        dispatch(addCourse(getRandomCourse(courseData)));
        console.log(`The course has been added`)
    }
    function dispatchRemove() {
        const arrayOfCourses = coursesService.get();
        const arrayOfId = arrayOfCourses.map(c => c.id);
        if (arrayOfId) {
            dispatch(removeCourse(arrayOfId[getRandomNumber(0, arrayOfId.length)]))
            console.log(`The course has been deleted`)
        }
    }
    function dispatchUpdate() {
        const arrayOfCourses = coursesService.get();
        const course = arrayOfCourses[getRandomNumber(0, arrayOfCourses.length)]
        if (course) {
            dispatch(updateCourse(course))
            console.log(`The course has been updated`)
        }
    }
}

function getAction(num: number): ImitatorAction {
    return imitatorActions.find(ia => num <= ia.prob) ?? imitatorActions[imitatorActions.length - 1]
}


