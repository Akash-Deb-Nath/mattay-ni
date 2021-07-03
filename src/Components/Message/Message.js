import { Card, CardContent, Typography } from '@material-ui/core';
import React, { useContext,forwardRef } from 'react';
import { UserContext } from '../../App';
import './Message.css';

const Message = forwardRef((message, userName) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const isUser = message.userName === message.message.userName;
    return (
        <div className="mx-auto p-2 message-style">
            {/* <div className="col-md-2">
                <img className={isUser ? "user" : "guest"} style={{ borderRadius: '50%', width: '30px' }} src={loggedInUser.photo} />
            </div> */}
            <div style={{ textAlign: 'start' }}>
                <p className={isUser ? "user" : "guest"} style={{ fontSize: '0.8rem' }}><small>{message.message.userName}</small></p>
                <div className={`message ${isUser && 'message_user'}`}>
                    <Card className={isUser ? "message_userCard" : "message_guestCard"}>
                        <CardContent>
                            <Typography
                                color="white"
                                variant="h5"
                                component="h2"
                            >
                                {message.message.message}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
});

export default Message;