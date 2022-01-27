import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useEffect, useState } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'


const SUPABASE_ANON_KEY = '***REMOVED***';
const SUPABASE_URL = '***REMOVED***';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



const Chat = () => {
    const [message, setMessage] = useState('');
    const [listMessages, setListMessages] = useState([]);


    const getMessages = async () => {
        const { data } = await supabaseClient
            .from('messages')
            .select('*')
            .order('id', { ascending: false });

        setListMessages(data);
    }

    useEffect(getMessages, []);

    const handleMessage = event => {
        setMessage(event.target.value);
    }

    const handleKeyPressMessage = event => {

        if (event.charCode === 13) {
            insertMessage();
            event.preventDefault();
        }
    }

    const insertMessage = async () => {
        const newMessage = {
            from: 'zNexTage',
            text: message
        }

        const { data } = await supabaseClient.from('messages')
            .insert([newMessage]);

        setListMessages([data.pop(), ...listMessages]);
        setMessage('');
    }

    const handleSendMessage = event => {
        event.preventDefault();
        
        insertMessage();
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary['400'],
                backgroundImage: 'url(https://w.wallha.com/ws/12/7TD08dxC.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: `rgba(${appConfig.theme.colors.rgb['700']}, .80);`,
                    backdropFilter: 'blur(2px)',
                    height: '100%',
                    maxWidth: '60%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: `rgba(${appConfig.theme.colors.rgb['600']}, .20);`,
                        backdropFilter: 'blur(10px)',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >


                    <MessageList
                        messages={listMessages}
                    />

                    <Box
                        onSubmit={handleSendMessage}
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            onChange={handleMessage}
                            onKeyPress={handleKeyPressMessage}
                            value={message}
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        <Box styleSheet={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Button
                                type='submit'
                                label='Enviar'
                                styleSheet={{
                                    marginBottom: '8px'
                                }}
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.secondary[999],
                                    mainColorLight: appConfig.theme.colors.primary[600],
                                    mainColorStrong: appConfig.theme.colors.primary[900],
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const Header = () => {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

const MessageList = ({ messages }) => {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {messages.map(message => (
                <Text
                    key={message.id}
                    tag="li"
                    styleSheet={{
                        borderRadius: '5px',
                        padding: '6px',
                        marginBottom: '12px',
                        hover: {
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                        }
                    }}
                >
                    <Box
                        styleSheet={{
                            marginBottom: '8px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginRight: '8px',
                            }}
                            src={`https://github.com/${message.from}.png`}
                        />
                        <Text tag="strong">
                            {message.from}
                        </Text>
                        <Text
                            styleSheet={{
                                fontSize: '10px',
                                marginLeft: '8px',
                                color: appConfig.theme.colors.neutrals[300],
                            }}
                            tag="span"
                        >
                            {(new Date().toLocaleDateString())}
                        </Text>
                    </Box>
                    {message.text}
                </Text>
            ))}
        </Box>
    )
}

export default Chat;