import React,{useState} from "react";
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth';

const Auth = () => {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[newAccount,setNewAccount]=useState(true);
    const[error,setError]=useState("");
    const onChange=(event)=>{
        const{target:{name,value}}=event;
        if(name==='email'){
            setEmail(value);
        }else if(name==='password'){
           setPassword(value); 
        }
    }
    const onSubmit = async(event)=>{
        event.preventDefault(); //기본 행위가 실행되는 것을 막는 메서드
        try{
            let data;
            const auth = getAuth();
        if(newAccount){
            //create account
            data = await createUserWithEmailAndPassword(auth, email, password);
        }else{
            //log in
            data = await signInWithEmailAndPassword(auth, email, password);
        }
        console.log(data);
    }catch(error){
        setError(error.message);
    }
    };

    const toggleAccount = () =>setNewAccount(prev=>!prev);
    return(
        <div>
        <form onSubmit={onSubmit}>
        <input name ="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
        <input name ="password" type="password" placeholder="password" required value={password} onChange={onChange}/>
        <input type="submit" value={newAccount?"Create Account":"Log In"}/>
        {error}
        </form>
        <span onClick={toggleAccount}>{newAccount?"Sign In":
        "Create Account"}</span>
        <div>
            <button>Continue With Google</button>
            <button>Continue With Gitub</button>
        </div>
    </div>
    )
};
export default Auth;