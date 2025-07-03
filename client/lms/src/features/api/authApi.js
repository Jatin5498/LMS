//connect with server
// file having set of endpoints which helps in authentication-related operations
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIN, userLoggedOut } from "../authSlice";
const USER_API = "https://learning-platform-rcby.onrender.com/api/v1/user/" //define api object a base url for the api
export const authApi =createApi({
      reducerPath:"authApi",
      baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:'include' // ensures that cookies (such as authentication tokens) are sent with each request.

      }),
      //use this build. for data fetch and post
      endpoints:(builder)=>({ //define enpoint for api
        //post with mutation
        //use mutation when need to send a req. to server that 
        // modifies data.
        // and query for search,fetch and get.
       registerUser:builder.mutation({
        query:(inputData)=>({ //query to send request 
            url:"register", //add in User_api as user/register.
            method:"POST",
            body:inputData
          })
      }),
      loginUser:builder.mutation({
        query:(inputData)=>({
            url:"login", //add in User_api as user/login.
            method:"POST",
            body:inputData
          }),
          //The onQueryStarted hook is a part of the createApi function.
          //   It is used to execute a function when a query is started.
          async onQueryStarted(_,{queryFulfilled,dispatch}){
            try{
              const result=await queryFulfilled;  //wait for query to fulfill
              dispatch(userLoggedIN({user:result.data.user}));
            }
            catch(error){
              console.log(error);
            }
          }
        }),
        logoutUser:builder.mutation({
          query:()=>({
            url:"logout",
            method:"POST"
        }),
        async onQueryStarted(_,{queryFulfilled,dispatch}){
          try{
            dispatch(userLoggedOut());
          }
          catch(error){
            console.log(error);
          }
        }
      }),
         loadUser:builder.query({  //to load current user data
          query:()=>({
            url:"profile",
            method:"GET",
         }),
         async onQueryStarted(_,{queryFulfilled,dispatch}){
          try{
            const result=await queryFulfilled;
            dispatch(userLoggedIN({user:result.data.user}));
          }
          catch(error){
            console.log(error);
          }
        }

       }),
    
      updateUser: builder.mutation({
        query: (formData) => ({
            url:"profile/update",
            method:"PUT",
            body:formData,
            credentials:"include"
        })
    })
  })
})

export const {useRegisterUserMutation,useLoginUserMutation,useLoadUserQuery,useUpdateUserMutation,useLogoutUserMutation}=authApi;
