import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0; padding: 0; border: none; background: none;
    font-size: 100%; font-weight: var(--fw-base); font-family: var(--font-nexon);
    -webkit-tap-highlight-color: transparent;
  }

  ol,ul {
    list-style: none;
  } 
  strong {
    font-size: var(--fz-base);
    font-weight: var(--fw-strong);
  }
  img {
    vertical-align: top;
    outline: none;
  }
  input,select,textarea,button {
    appearance: none; -webkit-appearance: none;
    outline: none; background: none;
    border: none; border-radius: 0;
    margin: 0; padding: 0; line-height: 1;
  }
  input:-webkit-autofill, 
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active {
    background: transparent; background-clip: text; -webkit-background-clip: text;
    -webkit-text-fill-color: var(--black-300);
  }
  textarea {
    resize: none;
  }
  ::placeholder {
    font: inherit;
  }
  a {
    text-decoration: none; color: inherit;
  }
  a:visited {
    background: none; color: inherit;
  }
  a:active {
    background: none; color: inherit;
  }

  body {
    overflow-x: hidden;
    font-size: var(--fz-base); line-height: 1;
    font-family: var(--font-nexon),
    -apple-system, 
    BlinkMacSystemFont, 
    system-ui, 
    Roboto, 
    'Helvetica Neue', 
    'Segoe UI', 
    'Apple SD Gothic Neo', 
    'Noto Sans KR', 
    'Malgun Gothic', sans-serif;
    font-size: var(--fz-base);
    color: var(--black-300);
    ;
  }
`
