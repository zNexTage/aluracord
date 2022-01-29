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
            justifyContent: {
                xl: 'center',
                lg: 'center',
                md: 'center',
                sm: 'flex-start',
                xs: 'flex-start'
            },
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
            backgroundColor: appConfig.theme.colors.secondary['999'],
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
            borderRadius: {
                xl: '10px',
                lg: '10px',
                md: '10px',
                sm: 'none',
                xs: 'none'
            }
        }}>
        <Box styleSheet={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            zIndex: '1000'
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
        <Box
            styleSheet={{
                width: '100%',
                height: {
                    xl: 'auto',
                    lg: 'auto',
                    md: 'auto',
                    sm: '100%',
                    xs: '100%'
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                maxHeight: '250px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: {
                    xl: '10px 10px 0 0',
                    lg: '10px 10px 0 0',
                    md: '10px 10px 0 0',
                    sm: 'none',
                    xs: 'none'
                },
                position: 'relative',
                backgroundImage: `url(/UserIconBackground.jpg)`
            }}>
            <Image
                styleSheet={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '8px',
                    marginBottom: '8px',
                    marginTop: '80px',
                    position: {
                        xl: 'relative',
                        lg: 'relative',
                        md: 'relative',
                        sm: 'absolute',
                        xs: 'absolute'
                    },
                    top: {
                        xl: '0',
                        lg: '0',
                        md: '0',
                        sm: '120px',
                        xs: '120px'
                    },
                    border: `2px solid ${appConfig.theme.colors.secondary['999']}`,
                }}
                src={loading ? 'UserIcon.png' : `https://github.com/${user.login}.png`}
            />
        </Box>


        <Box styleSheet={{
            padding: '10px',
            display: 'flex',
            flex: '1',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Box
                tag='h1'
                styleSheet={{
                    fontSize: '1.15em',
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
                    color: appConfig.theme.colors.neutrals['000']
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
                    <Text variant="heading4" styleSheet={{ color: appConfig.theme.colors.neutrals['000'] }}>
                        {loading ? '...' : user.following}
                    </Text>
                    <Text variant="body3" styleSheet={{ color: appConfig.theme.colors.neutrals['000'] }}>
                        Seguindo
                    </Text>
                </Box>
                <Box styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '0 8px'
                }}>
                    <Text variant="heading4" styleSheet={{ color: appConfig.theme.colors.neutrals['000'] }}>
                        {loading ? '...' : user.followers}
                    </Text>
                    <Text variant="body3" styleSheet={{ color: appConfig.theme.colors.neutrals['000'] }}>
                        Seguidores
                    </Text>
                </Box>

                <Box styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '0 8px'
                }}>
                    <Text variant="heading4" styleSheet={{ color: appConfig.theme.colors.neutrals['000'] }}>
                        {loading ? '...' : user.public_repos}
                    </Text>
                    <Text variant="body3" styleSheet={{ color: appConfig.theme.colors.neutrals['000'] }}>
                        Repositórios
                    </Text>
                </Box>

            </Box>
            {loading &&
                <Text variant="body3" styleSheet={{
                    color: appConfig.theme.colors.neutrals['000'],
                    textAlign: 'center',
                    display: 'block'
                }}>
                    <b>
                        Aguarde...
                    </b>
                </Text>
            }
        </Box>
    </Box >

)

export default UserCard;