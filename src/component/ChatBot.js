// src/App.js
import avatar from "../images/sendto.png";
import clear from "../images/clear.png";
import React, { useEffect, useState, useRef } from "react";
import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import Message from "./Message";
import axios from "axios";

function ChatBot() {

    const messagesListRef = React.createRef();
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState([]);
    // const scrollBar = useRef(null);

    useEffect(() => {
        setMessages(prevState => [
            {
                content: 'Welcome to our chat world ',
                isCustomer: false,
            }
        ]);
    }, []

    );



    const sendMessage = (content) => {
        // add the message to the state
        console.log("message : ", content);
        setMessages([
            ...messages,
            {
                content: content,
                isCustomer: true,
            }
        ]);

        // TODO: post the request to Back4app
        axios.get('https://us-central1-hack-team-tradeai.cloudfunctions.net/api1', { params: { q: messageInput } }).then(res => {
            console.log(res);
            setMessages(prevState => [
                ...prevState,
                {
                    content: res.data,
                    isCustomer: false,
                }
            ]);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(messageInput);
        setMessageInput("");
    }

    const clearForm = (event) => {
        // event.preventDefault();
        // sendMessage(messageInput);
        // setMessageInput("");
        console.log("Clear the form: ", event);
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Card sx={{ maxWidth: 620, border: "3px solid #752f2a", boxShadow: "2px 1px 6px 2px" }}>
                <CardContent>
                    <Box
                        ref={messagesListRef}
                        sx={{
                            height: 520,
                            width: 580,
                            overflow: "scroll",
                            overflowX: "hidden",
                            display: "flex",
                            overflowY: "scroll",
                            flexDirection: "column-reverse",

                        }
                        }
                    >
                        <Box sx={{ m: 1, mr: 3 }}>
                            {messages.map((message, index) => (
                                <Message
                                    key={index}
                                    content={message.content}
                                    image={message.image}
                                    isCustomer={message.isCustomer}
                                    choices={message.choices}
                                    handleChoice={sendMessage}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            mt: 2,
                            display: "flex",
                            flexFlow: "row",
                            gap: 1,
                        }}
                    >
                        <TextField
                            variant="outlined"
                            size="small"
                            value={messageInput}
                            onChange={(event) => setMessageInput(event.target.value)}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            type="submit"
                            title="Submit your query"
                            disabled={!messageInput}
                            sx={{
                                paddingTop: "15px",
                                width: "20px",
                                height: "45px",
                                paddingBottom: "10px",
                                backgroundColor: "whitesmoke",
                                boxShadow: "10"
                            }}
                        >
                            <span><img src={avatar} alt="Bot response" style={{ width: "100%" }} /></span>
                        </Button>
                        <Button
                            variant="contained"
                            onClick={clearForm}
                            type="submit"
                            title="Clear the bot"
                            sx={{
                                paddingTop: "15px",
                                width: "30px",
                                height: "45px",
                                paddingBottom: "7px",
                                backgroundColor: "whitesmoke",
                                boxShadow: "10",
                                paddingLeft: "10px",
                                paddingRight: "10px"
                            }}
                        >
                            <span><img src={clear} alt="Bot response" style={{ width: "100%" }} /></span>
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ChatBot;