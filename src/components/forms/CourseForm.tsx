import React from "react";
import { Course, createCourse } from "../../models/Course";
import courseData from "../../config/courseData.json";
import { Grid, Select, TextField, FormControl, InputLabel, MenuItem, Button, FormLabel, Typography } from "@mui/material";
import { Box, display, margin, padding, textAlign } from "@mui/system";
type Props = {
    submitFn: (course: Course) => void,
    initCourse?: Course
}
const initialCourse: Course = createCourse(0, "", "", 0, 0, new Date());
const CourseForm: React.FC<Props> = ({ submitFn, initCourse }) => {
    const { courses, minHours, maxHours, lectors, minCost, maxCost, minYear, maxYear } = courseData;
    const [course, setCourse] = React.useState(initCourse || initialCourse);
    const formTitle = initCourse ? `Updating course with id ${course.id}` : 'Adding New Course';
    function onSubmit(event: any) {
        event.preventDefault();
        submitFn(course);
        document.querySelector('form')!.reset();
    }
    function handlerCourse(event: any) {
        const courseCopy = { ...course };
        courseCopy.name = event.target.value;
        setCourse(courseCopy);
    }
    function handlerLecturer(event: any) {
        const courseCopy = { ...course };
        courseCopy.lecturer = event.target.value;
        setCourse(courseCopy);
    }
    function handlerHours(event: any) {
        const courseCopy = { ...course };
        courseCopy.hours = +event.target.value;
        setCourse(courseCopy);
    }
    function handlerCost(event: any) {
        const courseCopy = { ...course };
        courseCopy.cost = +event.target.value;
        setCourse(courseCopy);
    }
    function handlerOpeningDate(event: any) {
        const courseCopy = { ...course };
        courseCopy.openingDate = new Date(event.target.value);
        setCourse(courseCopy);
    }
    function onReset() {
        setCourse(initCourse || initialCourse)
    }

    return <form onSubmit={onSubmit} onReset={onReset}>
        <InputLabel id="form-label">
            <Typography variant="h4" align="center" sx={{marginBottom: '1vh'}}>{formTitle}</Typography>
        </InputLabel>
        <Grid container spacing={{ xs: 5, sm: 2, md: 13 }} justifyContent="center">
            <Grid item xs={10} sm={5} >
                <FormControl fullWidth required disabled={course === initCourse}>
                    <InputLabel id="course-select-label">Course Name</InputLabel>
                    <Select
                        disabled={course === initCourse}
                        labelId="course-select-label"
                        id="demo-simple-select"
                        label="Course Name"
                        value={course.name}
                        onChange={handlerCourse}
                    >
                        <MenuItem value="">None</MenuItem>
                        {getCourseItems(courses)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={10} sm={5} >
                <FormControl fullWidth required>
                    <InputLabel id="course-select-label">Lecturer</InputLabel>
                    <Select
                        labelId="course-select-label"
                        id="demo-simple-select"
                        label="Lecturer"
                        value={course.lecturer}
                        onChange={handlerLecturer}
                    >
                        <MenuItem value="">None</MenuItem>
                        {getCourseItems(lectors)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={10} sm={5}>
                <TextField type="number" label="Hours" fullWidth required
                    onChange={handlerHours} helperText={`enter number of hours in range [${minHours}-${maxHours} ]`}
                    value={course.hours || undefined}
                    inputProps={{
                        min: `${minHours}`,
                        max: `${maxHours}`
                    }} />
            </Grid>
            <Grid item xs={10} sm={5}>
                <TextField type="number" label="Cost" fullWidth required
                    onChange={handlerCost} helperText={`enter cost in range [${minCost}-${maxCost} ]`}
                    value={course.cost || undefined}
                    inputProps={{
                        min: `${minCost}`,
                        max: `${maxCost}`
                    }} />
            </Grid>
            <Grid item xs={10} sm={8} >
                <TextField required label={'Opening Date'} type={'date'} fullWidth
                    onChange={handlerOpeningDate}
                    value={undefined}
                    inputProps={
                        {
                            min: `${minYear}-1-01`,
                            max: `${maxYear}-12-31`
                        }
                    }
                    InputLabelProps={{
                        shrink: true
                    }} />

            </Grid>
            <Grid item xs={10} sm={8} md={6}>
                <Grid container justifyContent={"center"}>
                    <Grid item xs={5}>
                        <Button type="submit">Submit</Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Button type="reset">Reset</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </form>
}
export default CourseForm;

function getCourseItems(items: string[]): React.ReactNode {
    return items.map(c => <MenuItem value={c} key={c}>{c}</MenuItem>)
}
