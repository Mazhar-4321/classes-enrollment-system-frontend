const initialState = {
    token: localStorage.getItem("token"),
    userRole: 'student',
    studentChoiceSelected: 'null',
    coursesEnrolled: [],
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
            console.log("-------------- STATE----",state)
            var map = state.coursesEnrolled;  
              map = [];
            console.log("------------------------------------>",map.size)
            data.myCourses.forEach(e => map.push( e ))
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
                    ...state, token: tokenArray[4], userRole: tokenArray[0], userDetails: { firstName: tokenArray[1], lastName: tokenArray[2], email: tokenArray[3] },
                }
              
            } else
      
                return {
                 
                    ...state, token: tokenArray[2], userRole: tokenArray[0], userDetails: { email: tokenArray[1] }
                }
        case 'delteCourse':
            var id=action.value
       
            var newMap=state.coursesEnrolled.filter(e => e.c_id != id);
           // newMap.
            // newMap.delete(id)
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