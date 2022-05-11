import React from 'react';
import { Course, createCourse } from "../../models/Course";
import courseData from "../../config/courseData.json";
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Box } from "@mui/material";
import { getRandomNumber } from "../../util/random";


//import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
//import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

type Props = {
    submitFn: (course: Course) => void;
}

const CourseForm: React.FC<Props> = ({ submitFn }) => {
    const [open, setOpen] = React.useState(false);
    const { courses, minHours, maxHours, lectors, minCost, maxCost, minYear, maxYear } = courseData;
    const initialCourse: Course = createCourse(getRandomNumber(100000, 999999), '', '', 0, 0, new Date());
    const [course, setCourse] = React.useState(initialCourse);
    const [date, setDate] = React.useState<Date | null>(null);

    function dialogOpen() {
        setOpen(!open);
    }

    function getCourseItems(courses: string[]): React.ReactNode {
        return courses.map((course) => <MenuItem value={course} key={course}>{course}</MenuItem>);
    }

    function onSubmit(event: any) {
        event.preventDefault();
        console.log(course);
        submitFn(course);
        al();
    }

    function handlerCourse(event: any) {
        const courseCopy = { ...course };
        courseCopy.name = event.target.value;
        setCourse(courseCopy);
    }

    function handlerLector(event: any) {
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

    function handlerDate(event: any) {
        const courseCopy = { ...course };
        courseCopy.openingDate = event.target.value;
        setCourse(courseCopy);
    }

    function al() {
        dialogOpen();
        return <Box sx={{ margin: '10vh' }}>
            <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                <strong>Done</strong>
            </Alert>
        </Box>
    }

    return <Box>
        <Box sx={{ textAlign: 'center' }}>Fill form to<Button onClick={dialogOpen}>add course</Button>
        </Box>
        <Dialog
            open={open}
            onClose={dialogOpen}
            sx={{
                sizeHeight: '500px'
            }}
        >
            <DialogTitle>Course form</DialogTitle>
            <DialogContent>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} container>
                            <Grid item xs={12} sx={{
                                margin: '1vh'
                            }}>
                                <FormControl fullWidth required>
                                    <InputLabel id="course-select-label">Course Name</InputLabel>
                                    <Select
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
                            <Grid item xs={12} sx={{
                                margin: '1vh'
                            }}>
                                <FormControl fullWidth required>
                                    <InputLabel id="lector-select-label">Lectors</InputLabel>
                                    <Select
                                        labelId="lector-select-label"
                                        id="demo-simple-select"
                                        label="Lector"
                                        value={course.lecturer}
                                        onChange={handlerLector}

                                    >
                                        <MenuItem value="">None</MenuItem>
                                        {getCourseItems(lectors)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{
                                margin: '1vh'
                            }}>
                                <TextField type="number" label="Hours" fullWidth required value={course.hours || ''}
                                    inputProps={{
                                        min: minHours,
                                        max: maxHours
                                    }} onChange={handlerHours} />
                            </Grid>
                            <Grid item xs={12} sx={{
                                margin: '1vh'
                            }}>
                                <TextField type="number" label="Cost" fullWidth required value={course.cost || ''}
                                    inputProps={{
                                        min: minCost,
                                        max: maxCost
                                    }} onChange={handlerCost} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{
                            marginTop: '1vh',
                            marginLeft: { xs: '1vh', sm: '0' },
                        }}>
                            <TextField
                                id="datetime-local"
                                label="Opaning date"
                                type="datetime-local"
                                sx={{ width: 250 }}
                                required
                                onChange={handlerDate}
                            />
                            {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                            {/* <DatePicker
                                    label="Opening date"
                                    value={date}
                                    onChange={(newValue: any) => {
                                        setDate(newValue);
                                    }}
                                    renderInput={(params: any) => <TextField {...params} />}
                                /> */}
                            {/* </LocalizationProvider> */}
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button type="submit" onSubmit={al}>Submit</Button>
                        <Button type="button" onClick={dialogOpen}>Cancel</Button>
                    </DialogActions>
                </form >
            </DialogContent>
        </Dialog>
    </Box>
}

export default CourseForm;

