import axios from 'axios';
import { useState, useEffect, useRef } from "react"
import { baseUrl } from "./../../core"
import { GlobalContext } from './../../context/Context';
import { useContext } from "react";
import * as ReactBoootsrap from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {

    let { state, dispatch } = useContext(GlobalContext);

    const [profile, setProfile] = useState({})
    const[loading , setLoading]=useState(false)

    useEffect(() => {

        axios.get(`${baseUrl}/api/v1/profile`, {
            withCredentials: true
        })
            .then((res) => {
                console.log("res +++: ", res.data);
                setProfile(res.data)
                setLoading(true)

            })
    }, [])


    return (
        <>
        {loading ? (
            <>       <h1> Profile Page </h1>
               <p>{JSON.stringify(profile)}</p>
   
               <button onClick={() => {
                   axios.get(`${baseUrl}/api/v1/profile`, {
                       withCredentials: true
                   })
                       .then((res) => {
                           console.log("res +++: ", res.data);
                           setProfile(res.data)
                       })
               }} >get profile</button>
   
               <button onClick={() => {
                   axios.post(`${baseUrl}/api/v1/logout`,{}, {
                       withCredentials: true
                   })
                       .then((res) => {
                           console.log("res +++: ", res.data);
   
                           dispatch({
                               type: "USER_LOGOUT"
                           })
                       })
               }} >Logout</button>
        </>

        ):(
            <ReactBoootsrap.Spinner animation="border" />

        )}
        </>
         
    );
}

export default Home;