import { Image, Box, Text, Button } from "@skynexui/components";
import appConfig from '../../config.json';

const UserCard = ({ user, onCloseClick, loading }) => (
    <Box
        styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: {
                xl: '300px',
                lg: '300px',
                md: '300px',
                sm: '100%',
                xs: '100%'
            },
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
            width: '100%',
            height: {
                xl: 'auto',
                lg: 'auto',
                md: 'auto',
                sm: '100%',
                xs: '100%'
            },
            backgroundColor: appConfig.theme.colors.neutrals[800],
            position: 'fixed',
            bottom: {
                xl: '20px',
                lg: '20px',
                md: '20px',
                sm: '0',
                xs: '0'
            },
            left: {
                xl: '150px',
                lg: '150px',
                md: '150px',
                sm: '0px',
                xs: '0px'
            },
            padding: '10px',
        }}>
        <Box styleSheet={{
            position: 'absolute',
            right: '10px',
            top: '10px'
        }}>

            <Box
                onClick={onCloseClick}
                styleSheet={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: appConfig.theme.colors.neutrals['000']
                }}
                tag="button">
                X
            </Box>
        </Box>
        <Image
            styleSheet={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '8px',
                marginBottom: '8px'
            }}
            src={loading ? 'UserIcon.png' : `https://github.com/${user.login}.png`}
        />

        <Box>
            <Box
                tag='h1'
                styleSheet={{
                    fontSize: '1.15em',
                    textAlign: 'center',
                }}
            >
                {loading ? '...' : user.name}
            </Box>
            {!loading && <Text
                href={`https://github.com/${user.login}/`}
                tag='a' variant="body2" styleSheet={{
                    display: 'block',
                    marginBottom: '32px',
                    textAlign: 'center',
                    color: appConfig.theme.colors.neutrals[300]
                }}>
                {loading ? '...' : user.login}
            </Text>}
            <Box
                styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}
            >

                <Box styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '0 8px'
                }}>
                    <Text variant="heading4" styleSheet={{ color: appConfig.theme.colors.neutrals[300] }}>
                        {loading ? '...' : user.following}
                    </Text>
                    <Text variant="body3" styleSheet={{ color: appConfig.theme.colors.neutrals[300] }}>
                        Seguindo
                    </Text>
                </Box>
                <Box styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '0 8px'
                }}>
                    <Text variant="heading4" styleSheet={{ color: appConfig.theme.colors.neutrals[300] }}>
                        {loading ? '...' : user.followers}
                    </Text>
                    <Text variant="body3" styleSheet={{ color: appConfig.theme.colors.neutrals[300] }}>
                        Seguidores
                    </Text>
                </Box>

                <Box styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '0 8px'
                }}>
                    <Text variant="heading4" styleSheet={{ color: appConfig.theme.colors.neutrals[300] }}>
                        {loading ? '...' : user.public_repos}
                    </Text>
                    <Text variant="body3" styleSheet={{ color: appConfig.theme.colors.neutrals[300] }}>
                        Repositórios
                    </Text>
                </Box>

            </Box>
            {loading &&
                <Text variant="body3" styleSheet={{
                    color: appConfig.theme.colors.neutrals[300],
                    textAlign: 'center',
                    display: 'block'
                }}>
                    <b>
                        Aguarde...
                    </b>
                </Text>
            }
        </Box>
    </Box>

)

export default UserCard;