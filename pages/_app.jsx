const GlobalStyle = () => (
    <style global jsx>{
        `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            list-style: none;
        }

        /* width */
        ::-webkit-scrollbar {
            width: 4px;
        }
    
        /* Track */
        ::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }
     
        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #888; 
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