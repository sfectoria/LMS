import React, { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom"
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import "../../css/auth.css";
import { login } from '../../store/auth';
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import sfectoriaDark from '../../assets/logo.png';
import sfectoriaLight from '../../assets/logoblanc.png';
import backgroundLight from '../../assets/backgroundLight.jpg'
import backgroundDark from '../../assets/backgroundDARK.jpg'
function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  function getImageSrc() {
    return mode==='dark' ? sfectoriaLight: sfectoriaDark;
  }
  React.useEffect(() =>{ setMounted(true);
    
  }, []);
  return (

    <Box sx={{ display: 'flex',  justifyContent:'space-between' , alignItems: 'center' }}>
        <img src={getImageSrc()}  
                 style={{width:"23%", objectFit: 'cover'}}/>
    <Box sx={{ display: 'flex',  justifyContent:'center' , alignItems: 'center' }}>
    
      <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === 'light' ? 'dark' : 'light');
        onClick?.(event);
      }}
      {...other}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  </Box>
  </Box>
  )
}

export default function Login() {
  const navigate = useNavigate();
   const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
    <CssBaseline />
    <GlobalStyles
      styles={{
        ':root': {
          '--Form-maxWidth': '800px',
          '--Transition-duration': '0.4s', 
        },
      }}
    />
    <Box
      sx={(theme) => ({
        width: { xs: '100%', md: '50vw' },
        transition: 'width var(--Transition-duration)',
        transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255 255 255 / 0.2)',
      
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          width: '100%',
          px: 2,
        }}
      >
        <Box
          component="header"
          sx={{
            py: 3,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
     
          
            
           
        <ColorSchemeToggle />
       
        </Box>

        <Box
          component="main"
          sx={{
            my: 'auto',
            py: 2,
            pb: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: 400,
            maxWidth: '100%',
            mx: 'auto',
            borderRadius: 'sm',
            '& form': {
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            },
            [`& .MuiFormLabel-asterisk`]: {
              visibility: 'hidden',
            },
          }}
        >
          <Stack gap={4} sx={{ mb: 2 }}>
            <Stack gap={1}>
            <Typography component="h1" level="h3" style={{ fontFamily: 'Poppins' }}>
  Sign in
</Typography>
        
            </Stack>
            
          </Stack>
          <Divider
 sx={(theme) => ({
  color: {
    xs: 'gray', // Light color for mobile screens
    md: 'text.tertiary', // Color for medium and larger screens
  },
  [theme.getColorSchemeSelector('dark')]: {
    color: {
      xs: 'gray', // Ensure text color is consistent in dark mode on mobile
      md: 'text.tertiary', // Ensure text color is consistent in dark mode on larger screens
    },
  },
})}
>
  Your journey starts here.
</Divider>
          <Stack gap={4} sx={{ mt: 2 }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(login({ email , password })).then((res) => {
               if (!res.error) {
                showSuccessToast('Welcome! You are now logged in.')
               navigate("/");
               
              } else showErrorToast('Authentication failed ! Please check your credentials.');
            })}}
            >
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" onChange={(e) => {
                    setEmail(e.target.value);
                  }} />
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password"   onChange={(e) => {
                    setPassword(e.target.value);
                  }}/>
              </FormControl>
              <Stack gap={4} sx={{ mt: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox size="sm" label="Remember me" name="persistent" />
                  <Link level="title-sm" href="#replace-with-a-link">
                    Forgot your password?
                  </Link>
                </Box>
                <Button type="submit" fullWidth >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
        <Box component="footer" sx={{ py: 3 }}>
          <Typography level="body-xs" textAlign="center">
            © Sfectoria {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
    <Box
  sx={(theme) => ({
    height: '100%',
    position: 'fixed',
    right: 0,
    top: 0,
    bottom: 0,
    left: { xs: 0, md: '50vw' }, // Adjust position for different screen sizes
    transition:
      'background-image var(--Transition-duration), left var(--Transition-duration) !important',
    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
    backgroundColor: 'background.level1',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${backgroundLight})`,
    display: { xs: 'none', md: 'block' }, // Hide on xs (mobile) screens, show on md (tablet and larger)
    [theme.getColorSchemeSelector('dark')]: {
      backgroundImage: `url(${backgroundDark})`,
    },
  })}
/>
  </CssVarsProvider>
);
}
