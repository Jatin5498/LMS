import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Herosection from './pages/student/Herosection'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router-dom'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/course/Addcourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from './pages/admin/lecture/EditLecture'
import CourseDetail from './pages/student/CourseDetail'
import CourseProgress from './pages/student/courseProgress'
import SearchPage from './pages/student/SearchPage'
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoutes'
import PurchaseCourseProtectedRoute from './components/PurchaseCourseProtectedRoute'
import { ThemeProvider } from './components/ThemeProvider'
//router render or add front components with router
const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[ //display in  outlet
      {
      path:"/",
      element:(
        <>
        <Herosection/>
        <Courses></Courses>
        </>
      ),
  },
  {
    path:"/login",
    element:<AuthenticatedUser><Login></Login></AuthenticatedUser>
  },
  {
    path:"my-learning",
    element:<ProtectedRoute><MyLearning></MyLearning></ProtectedRoute>
  },
  {
    path:"profile",
    element:<ProtectedRoute><Profile></Profile></ProtectedRoute>
  },
  {
    path:"course/search",
    element:<ProtectedRoute><SearchPage></SearchPage></ProtectedRoute>
  },
  {
    path:"course-detail/:courseId",   //course on home page
    element:<ProtectedRoute><CourseDetail/></ProtectedRoute>
  },
  {
    path: "course-progress/:courseId",
    element: (
        <ProtectedRoute>
          <PurchaseCourseProtectedRoute>
          <CourseProgress/>
          </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
    ),
  },
  //admin routes start here
  { 
    path:"admin", //sidebar page
    element:<AdminRoute><Sidebar></Sidebar></AdminRoute>,
    
    children:[
      {
        path:"dashboard",
        element:<Dashboard></Dashboard>
      },
      {
      path:"course",
      element:<CourseTable></CourseTable>
      },
      {
        path:"course/create",
        element:<AddCourse></AddCourse>
        },
        {
          path:"course/:courseId", //edit course publish here
          element:<EditCourse></EditCourse>
          },
          {
            path:"course/:courseId/lecture", //go to lecture
            element:<CreateLecture></CreateLecture>
            },
            {
              path:"course/:courseId/lecture/:lectureId",//lecture edit
              element:<EditLecture></EditLecture>
              },
    ],
  },
  ],
  },
]);
function App() {
  return (
    //provider provides router to the app.
    <main>
      <ThemeProvider>
     <RouterProvider router={appRouter}></RouterProvider> 
     </ThemeProvider>
     </main>
  )
}

export default App 