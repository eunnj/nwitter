import { dbService } from "fbase";
import React,{useState} from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Home = () => {
    const [nweet,setNeweet]=useState("");
    const onSubmit= async(event)=>{
        event.preventDefault();
        await addDoc(collection(dbService,"nweets"),{
            nweet,
            createdAt:Date.now()
        })
        setNeweet("");
    };
    const onChange = (event)=>{
        const {target:{value}}=event;
        setNeweet(value);
    };
return(
    <div>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}></input>
            <input type="submit" value="Nweet"></input>
        </form>
    </div>
);}
export default Home;