import { dbService } from "fbase";
import React,{useEffect, useState} from "react";
import { getDocs,collection, addDoc,onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";

const Home = ({userObj}) => {
    const [nweet,setNweet]=useState("");
    const [nweets,setNweets]=useState([]);
    // const getNweets = async()=>{
    //     //const dbnweets = await dbService.collection("nweets").get()
    //     const dbNweets = await getDocs(collection(dbService, "nweets"));
    //     dbNweets.forEach((document)=>{
    //         const nweetObject={
    //             ...document.data(),
    //             id: document.id
    //         }
    //         setNweets((prev)=>[nweetObject,...prev]);
    //     });
    // }
    useEffect(()=>{
        //getNweets();
        onSnapshot(collection(dbService, "nweets"), (snapshot) => {
            const nweetArray = snapshot.docs.map(doc=>(
                {id:doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray);
        })
        
        
    },[])
    const onSubmit= async(event)=>{
        event.preventDefault();
        await addDoc(collection(dbService,"nweets"),{
            text:nweet,
            createdAt:Date.now(),
            createrId:userObj.uid

        })
        setNweet("");
    };
    const onChange = (event)=>{
        const {target:{value}}=event;
        setNweet(value);
    };
return(
    <div>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}></input>
            <input type="submit" value="Nweet"></input>
        </form>
        <div>
           {nweets.map((nweet)=>(
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.createrId===userObj.uid}/>   
           ))}
        </div>
    </div>
);}
export default Home;