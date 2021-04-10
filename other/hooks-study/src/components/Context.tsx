import React from 'react';

type Theme = {
  [key: string]: {
    color: string;
    background: string;
  };
};

const themes: Theme = {
  light: {
    color: '#000',
    background: '#eee',
  },
  dark: {
    color: '#fff',
    background: '#222',
  },
};

const ThemeContext = React.createContext(themes.light);

const Provider: React.FC = () => {
  const [theme, setTheme] = React.useState(themes.light);

  return (
    <>
      <button
        onClick={() => {
          setTheme(theme.color === '#000' ? themes.dark : themes.light);
        }}>
        toggle thtme
      </button>
      <ThemeContext.Provider value={theme}>
        <Children />
      </ThemeContext.Provider>
    </>
  );
};

const Children: React.FC = () => {
  return <ChildrenChildren />;
};

const ChildrenChildren: React.FC = () => {
  const theme = React.useContext(ThemeContext);

  return (
    <div
      style={{
        color: theme.color,
        background: theme.background,
      }}>
      hello world
    </div>
  );
};

export default Provider;
