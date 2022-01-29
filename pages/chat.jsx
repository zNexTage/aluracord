import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import UserCard from '../src/components/UserCard';
import ButtonSendSticker from '../src/components/ButtonSendSticker';


const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const MAX_LENGTH_MESSAGE = 250;

const listenerMessagesInRealTime = (addMessage, deleteMessage) => {
    return supabaseClient
        .from('messages')
        .on('DELETE', data => {
            deleteMessage(data.old.id);
        })
        .on('INSERT', data => {
            addMessage(data.new);
        })
        .subscribe();
}

const Chat = () => {
    const [message, setMessage] = useState('');
    const [listMessages, setListMessages] = useState([]);
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [isLoadingMessage, setIsLoadingMessage] = useState(false);
    const [isLoadingSendMessage, setIsLoadingSendMessage] = useState(false);


    useEffect(() => {
        const usernameParam = router.query?.username;

        if (!usernameParam) {
            router.replace('/');
            return;
        }

        setUsername(usernameParam);
    }, []);

    const getMessages = async () => {
        setIsLoadingMessage(true);

        try {
            const { data } = await supabaseClient
                .from('messages')
                .select('*')
                .order('id', { ascending: false });

            setListMessages(data);
        }
        catch (err) {
            alert('Não foi possível obter as mensagens...');
        }
        finally {
            setIsLoadingMessage(false);
        }
    }

    const onInsertMessage = (newMessage) => {
        //Quero usar um valor de referência (objeto/array)
        //Passar função para o setState
        setListMessages((actuaList) => {
            return [newMessage, ...actuaList]
        });
    }

    const onDeleteMessage = messageId => {
        setListMessages(actuaList => {
            return actuaList.filter(message => messageId != message.id);
        });
    }

    useEffect(() => {
        getMessages();

        listenerMessagesInRealTime(onInsertMessage, onDeleteMessage);
    }, []);

    const handleMessage = event => {

        setMessage(event.target.value);
    }

    const isValidMessage = (message) => {
        if (!message.trim()) {
            alert('Por favor, informe a sua mensagem!!');
            return false;
        }

        if (message.length > MAX_LENGTH_MESSAGE) {
            alert(`A mensagem deve ter no máximo ${MAX_LENGTH_MESSAGE} caracteres.`);
            return false;
        }

        return true;
    }

    const handleKeyPressMessage = event => {

        if (event.charCode === 13) {
            insertMessage(message);
            event.preventDefault();
        }
    }

    const insertMessage = async (newMessage) => {
        if (!isValidMessage(newMessage)) {
            return;
        }

        setIsLoadingSendMessage(true);

        try {
            await supabaseClient.from('messages')
                .insert([{
                    from: username,
                    text: newMessage
                }]);

            setMessage('');
        }
        catch (err) {

        }
        finally {
            setIsLoadingSendMessage(false);
        }

    }

    const handleSendMessage = event => {
        event.preventDefault();

        insertMessage(message);
    }

    const onStickerClick = (stickerUrl) => {
        insertMessage(`:sticker:${stickerUrl}`)
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
                    backgroundColor: `rgba(${appConfig.theme.colors.secondary.rgb['999']}, .85);`,
                    height: '100%',
                    maxWidth: '90%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header username={username} />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: `rgba(${appConfig.theme.colors.rgb['600']}, .80);`,
                        // backdropFilter: 'blur(2px)',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    {isLoadingMessage &&
                        <Box styleSheet={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image
                                styleSheet={{
                                    maxWidth: '75px'
                                }}
                                src='/Loading.gif' />
                        </Box>
                    }
                    {!isLoadingMessage && <MessageList
                        username={username}
                        messages={listMessages}
                    />}

                    <Box
                        onSubmit={handleSendMessage}
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: {
                                xl: 'row',
                                lg: 'row',
                                md: 'row',
                                sm: 'column',
                                xs: 'column'
                            }
                        }}
                    >
                        <TextField
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            onChange={handleMessage}
                            onKeyPress={handleKeyPressMessage}
                            maxLength={MAX_LENGTH_MESSAGE}
                            disabled={isLoadingSendMessage}
                            value={message}
                            counter={false}
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
                            alignItems: 'center'
                        }}>
                            <ButtonSendSticker
                                onStickerClick={onStickerClick}
                                disabled={isLoadingSendMessage}
                            />
                            <Button
                                disabled={isLoadingSendMessage}
                                type='submit'
                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.primary['050'],
                                    mainColor: appConfig.theme.colors.primary['900']
                                }}
                                styleSheet={{
                                    marginLeft: '10px'
                                }}
                                iconName="arrowRight"
                            />
                        </Box>
                    </Box>
                </Box>


            </Box>
        </Box >
    )
}

const Header = ({ username }) => {
    return (
        <Box styleSheet={{
            marginBottom: '16px'
        }}>
            <Box styleSheet={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>

                <Box styleSheet={{
                    display: 'inline-flex',
                    border: `1px solid ${appConfig.theme.colors.primary['050']}`,
                    padding: '10px',
                    borderRadius: '10px',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <Box styleSheet={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Image
                            styleSheet={{
                                maxWidth: '50px',
                                maxHeight: '50px',
                                borderRadius: '50%',
                                marginRight: '10px',
                                display: 'inline-block'
                            }}
                            src={`https://github.com/${username}.png`}
                        />
                        <Text variant='heading5'>
                            Olá, {username}
                        </Text>
                    </Box>
                    <Button
                        buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals['000']
                        }}
                        label='Sair'
                        href="/"
                    />

                </Box>

            </Box>


        </Box>
    )
}

const MessageList = ({ messages, username }) => {
    const [showUserInfo, setShowUserInfo] = useState();
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const onCloseCard = () => {
        setUserInfo(null);
        setShowUserInfo(undefined);
    }

    const onDeleteClick = async messageId => {
        const confirmDelete = confirm('Deseja realmente apagar essa mensagem?');

        if (confirmDelete) {
            try {
                await supabaseClient.from('messages')
                    .delete()
                    .match({ id: messageId })
            }
            catch (err) {
                alert('Não foi possível remover a sua mensagem...');
            }
        }
    }

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
                position: 'relative'
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
                        {showUserInfo === message.id &&
                            <UserCard
                                loading={loading}
                                onCloseClick={onCloseCard}
                                user={userInfo} />
                        }
                        <Box
                            styleSheet={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '5px'
                            }}
                        >
                            <Image
                                onClick={async () => {
                                    setShowUserInfo(message.id);

                                    try {
                                        setLoading(true);
                                        const response = await fetch(`https://api.github.com/users/${message.from}`)
                                        const data = await response.json();

                                        setUserInfo(data);
                                    }
                                    catch (err) {
                                        alert('Não foi possível obter as informações desse usuário...');
                                    }
                                    finally {
                                        setLoading(false);
                                    }
                                }}
                                styleSheet={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                    hover: {
                                        transform: 'scale(1.20)',
                                        transition: '.2s linear all',
                                        cursor: 'pointer'
                                    },
                                }}
                                src={`https://github.com/${message.from}.png`}
                            />
                            {message.from.toLowerCase() === username.toLowerCase() &&
                                <Box styleSheet={{
                                    display: 'flex'
                                }}>
                                    {/* <Icon name='FaPen' styleSheet={{
                                    marginRight: '5px',
                                    color: appConfig.theme.colors.secondary['999']
                                }} /> */}
                                    <Button
                                        onClick={() => onDeleteClick(message.id)}
                                        buttonColors={{
                                            contrastColor: appConfig.theme.colors.neutrals['000'],
                                            mainColor: appConfig.theme.colors.secondary['999']
                                        }}
                                        iconName="FaTrash" />

                                </Box>}
                        </Box>
                        <Box styleSheet={{
                            display: 'flex',
                            flexDirection: {
                                xl: 'row',
                                lg: 'row',
                                md: 'row',
                                sm: 'column',
                                xs: 'column'
                            }
                        }}>
                            <Text styleSheet={{
                                'whiteSpace': 'nowrap',
                                'overflow': 'hidden',
                                'textOverflow': 'ellipsis'
                            }} tag="strong">
                                {message.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    display: 'flex',
                                    justifyContent: {
                                        xl: 'center',
                                        lg: 'center',
                                        md: 'center',
                                        sm: 'flex-start',
                                        xs: 'flex-start'
                                    },
                                    alignItems: {
                                        xl: 'center',
                                        lg: 'center',
                                        md: 'center',
                                        sm: 'flex-start',
                                        xs: 'flex-start'
                                    },
                                    marginLeft: {
                                        xl: '8px',
                                        lg: '8px',
                                        md: '8px',
                                        sm: '0px',
                                        xs: '0px'
                                    },
                                    color: appConfig.theme.colors.neutrals[300],
                                }}

                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>

                        </Box>
                    </Box>
                    <Text styleSheet={{
                        overflowWrap: 'break-word'
                    }} tag='p'>
                        {/*Declarativo */}
                        {message.text.startsWith(':sticker:') ? (
                            <Image src={message.text.replace(':sticker:', '')} />
                        ) : (
                            message.text
                        )}
                    </Text>

                </Text>
            ))}
        </Box>
    )
}

export default Chat;