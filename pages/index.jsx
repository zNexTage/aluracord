import { Box, Button, Text, TextField } from '@skynexui/components';
import { useState } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import CustomUserIcon from '../assets/UserIcon.png';
import appConfig from '../config.json';


const Title = ({ children, tag = 'h1' }) => {
    const Tag = tag;

    return (
        <>
            <Tag>
                {children}
            </Tag>
            <style jsx>
                {`
                    ${Tag} {
                        color: ${appConfig.theme.colors.neutrals['000']};
                        font-size:24px;
                        font-weight: 600;
                    }
                `}
            </style>
        </>
    );
};

//Componente React
// const HomePage = () => {
//     return (
//         <div>
//             <GlobalStyle />
//             <hgroup>
//                 <Title tag="h2">
//                     Boas vindas de volta!!
//                 </Title>
//                 <h2>
//                     Discord - Vaporwave Channel
//                 </h2>
//             </hgroup>

//         </div>
//     );
// };

const HomePage = () => {
    const [username, setUsername] = useState('zNexTage');
    const [userImg, setUserImg] = useState(`https://github.com/${username}.png`);
    const router = useRouter();


    const handleUsername = event => {
        setUsername(event.target.value);
    }

    const onSubmit = event => {
        event.preventDefault();

        router.push('/chat');
    }

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary['400'],
                    // backgroundImage: 'url(https://www.wallpapertip.com/wmimgs/1-11293_vaporwave-wallpaper-vaporwave-wallpaper-space.jpg)',
                    backgroundImage: 'url(https://w.wallha.com/ws/12/7TD08dxC.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        onSubmit={onSubmit}
                        as="form"
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Title tag="h2">Boas vindas de volta!</Title>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            onChange={handleUsername}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                            position: 'relative'
                        }}
                    >
                        <Image
                            className='avatar'
                            placeholder='blur'
                            blurDataURL={CustomUserIcon}
                            width={200}
                            height={200}
                            objectFit='cover'
                            onError={() => {
                                setUserImg(CustomUserIcon);
                            }}
                            onLoadingComplete={(event) => {
                                if (event.naturalWidth > 0) {
                                    setUserImg(`https://github.com/${username}.png`)
                                }
                            }}
                            layout='intrinsic'
                            src={userImg}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px',
                                marginTop: "20px"
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}

export default HomePage;