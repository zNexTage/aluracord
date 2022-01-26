const GlobalStyle = () => (
    <style global jsx>{
        `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            list-style: none;
        }

        body {
            font-family: 'Open Sans', sans-serif;
        }
      
        /* App fit Height */ 
        html, body, #__next {
            min-height: 100vh;
            display: flex;
            flex: 1;
        }
        
        #__next {
            flex: 1;
        }
        
        #__next > * {
            flex: 1;
        }
      /* ./App fit Height */ 

      .avatar {
        border-radius: 50%;
      }
        `
    }
    </style>
);

//Encapsulador de todas as páginas.
const App = ({ Component, pageProps }) => (
    <>
        <GlobalStyle />
        <Component {...pageProps} />
    </>
)


export default App;