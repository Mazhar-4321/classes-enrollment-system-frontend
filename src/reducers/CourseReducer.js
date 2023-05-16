const initialState = {
    token: localStorage.getItem("token"),
    userRole: 'student',
    studentChoiceSelected: 'null',
    coursesEnrolled: new Map(),
    userDetails: { firstName: null, lastName: null, email: null },
    testDetails: []


}
const CourseReducer = ((state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {

        case 'updateStudentCourses':
            var data = action.value
            //myCourses
            console.log("all details of student", data);
            var map = state.coursesEnrolled;
            data.myCourses.forEach(e => map.set(e.c_id, e))
            return {
                ...state, coursesEnrolled: map
            }

        case 'changeLoginStatus':
            return {
                ...state, isLoggedIn: false
            }
        case 'changeStudentChoice':
            var choice = action.value
            return {
                ...state, studentChoiceSelected: choice
            }
        case 'changeEnrolledCourses':
            var courses = action.value
            return {
                ...state, coursesEnrolled: courses
            }
        case 'updateToken':
            var token = action.value
            var tokenArray = token.split(",")

            if(tokenArray[0] === "student"){
               
            } 
            else {
                
            }
        
       console.log("miya ....", tokenArray)

            if (tokenArray[0] === 'student') {
            
                return {
                    ...state, token: tokenArray[4], userRole: tokenArray[0], userDetails: { firstName: tokenArray[1], lastName: tokenArray[2], email: tokenArray[3] }
                }
              
            } else
      
                return {
                 
                    ...state, token: tokenArray[2], userRole: tokenArray[0], userDetails: { email: tokenArray[1] }
                }
        case 'delteCourse':
            var id=action.value
            var newMap=state.coursesEnrolled;
            newMap.delete(id)
            return{
                ...state,coursesEnrolled:newMap
            }
            case 'removeToken':
                localStorage.removeItem("token")
                return{
                    ...state,token:null,userDetails: { firstName: null, lastName: null, email: null }
                }





        default:
            console.log("default executed")
            return state


    }

}
)
export default CourseReducer