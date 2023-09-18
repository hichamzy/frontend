import React from 'react'
import { createContext,useEffect,useState } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const AuthContext =createContext()

export default AuthContext;



export const AuthProvider = ({ children }) => {
    
    
    let [authTokens,setAuthTokens]=useState(()=>localStorage.getItem('AuthTokens')?JSON.parse(localStorage.getItem('AuthTokens')):null)
    let [user,setUser]=useState(()=>localStorage.getItem('AuthTokens')?jwt_decode(localStorage.getItem('AuthTokens')):null)  // if the user is already loged in  you will not need to enter the infos if you refresh the data will come from the local storage
    let [loading,setLoading]=useState(true)

    const navigateTopage=useNavigate()  //to navigate to a page

    let loginUser = async (e)=>{
        e.preventDefault()
        
        let response = await fetch("http://127.0.0.1:8000/api/token",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'username':e.target.username.value,
                'password':e.target.password.value  //target means the form target.password means the input password
            })
            })
            let data= await response.json()
            if(response.status===200){
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('AuthTokens',JSON.stringify(data))
                navigateTopage('/')
                
            
            }else{
                alert('something went wrong')
            }
       
    }
    let LogoutUser=()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('AuthTokens')
        navigateTopage('/')
    }

    let UpdateToken= async ()=>{
        console.log('updated token called')
        let response = await fetch("http://localhost:8000/api/token/refresh",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'refresh':authTokens?.refresh     //target means the form target.password means the input password
            })
            })
            let data= await response.json()
            if(response.status===200){
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('AuthTokens',JSON.stringify(data))
                
                
            
            }else{
                //LogoutUser()
                console.log("something went wrong")
            }
            if( loading){
                setLoading(false)
            }

    }
    
    let contextData={
        user:user,
        loginUser:loginUser,
        LogoutUser:LogoutUser,
        authTokens:authTokens    
    }
    useEffect(()=>{ //to update the token
        if(loading){
            UpdateToken()
        } 
        let oneminute=1000*60*1
        let interval= setInterval(()=>{

            if(authTokens){
                UpdateToken()
            }

        },oneminute)
        return ()=>clearInterval(interval)

    },[authTokens,loading])
   
    return (
        <AuthContext.Provider value={contextData}>
            {loading? null:children}
        </AuthContext.Provider>
    );
};

