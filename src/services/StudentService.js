import axios from "axios";
  import store from '../store';
 // import {store} from '../store'
const baseURL = 'http://localhost:3006/api/v1/'

const state = store.getState().CourseReducer1


export const getAllCourses = async (token) => {
    try {
        let response = await axios.get(`${baseURL}/students/availableCourses/${state.userDetails.email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response.data.data)
        return response.data.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}
export const getMyCourses = async (email, token) => {
    const state = store.getState().CourseReducer1
    try {
        let response = await axios.get(`${baseURL}/students/myCourses/${email}`, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        console.log("=============== my courses data==========>",response.data.data)
        return response.data.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}

export const enrollInTheCourse = async (courseId) => {
    const state = store.getState().CourseReducer1
    console.log("mai hai user details", state.userDetails)
    try {
        let response = await axios.post(`${baseURL}/students/enroll`, {
            studentId: state.userDetails.email,
            courseId: courseId

        }, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        console.log(response.data.data)
        return response.data.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}

export const getQuiz = async (courseId) => {
    const state = store.getState().CourseReducer1

    try {
        let response = await axios.get(`${baseURL}/students/quiz/${courseId}`, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        console.log(response.data.data)
        return response.data.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}

export const submitQuiz = async (courseId, obj) => {
    const state = store.getState().CourseReducer1

    try {
        let response = await axios.post(`${baseURL}/students/quiz/${courseId + "," + state.userDetails.email}`, { data: obj }, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        console.log(response)
        return response.data.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}

export const getHighestMarks = async (courseId, obj) => {
    const state = store.getState().CourseReducer1

    try {
        let response = await axios.get(`${baseURL}/students/marks/${courseId},${state.userDetails.email}`,
         {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        }, { obj })
        console.log(response)
        return response.data.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}

export const cancelCourse = async (courseId) => {
    const state = store.getState().CourseReducer1
    console.log(courseId, state.userDetails.email)
    try {
        let response = await axios.post(`${baseURL}/students/cancelCourse/`, {
            courseId: courseId,
            studentId: state.userDetails.email
        }, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        console.log(response)
        return response.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}

