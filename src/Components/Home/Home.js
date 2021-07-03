import React, { useContext } from 'react';
import { Button, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import Message from '../Message/Message';
import '../../App.css';
import { UserContext } from '../../App';
import './Home.css';
import db from '../../firebase';
import firebase from "firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const Home = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        db.collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data() ));
            })
    }, []);


    useEffect(() => {
        // // prompt('Please enter your name');
        // setUserName(prompt('Please enter your name'))
        setUserName(loggedInUser.name);
    }, [])

    const sendMessage = event => {
        db.collection('messages').add({
            message: input,
            userName: userName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        event.preventDefault();
        // setMessages([...messages, { userName: userName, message: input }]);
        setInput('');
    }
    return (
        <div className="App mt-5">
            <h3>Welcome <span style={{ color: 'tomato' }}>{userName}</span></h3>
            <form>
                <FormControl>
                    <InputLabel>Enter a message</InputLabel>
                    <Input value={input} onChange={event => setInput(event.target.value)} />
                    <Button className={!input && 'btn-style'} disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}><FontAwesomeIcon icon={faPaperPlane} /></Button>
                </FormControl>
            </form>
            {
                messages.map((message) => (
                    <div>
                        <Message userName={userName} message={message}></Message>
                    </div>
                ))
            }
        </div>
    );
};

export default Home;