import React, { useState } from "react";

let AppContext;
const { Provider, Consumer } = (AppContext = React.createContext({}));

const AppProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  const state = {
    courses,
    setCourses,
  };

  return <Provider value={state}>{children}</Provider>;
};

const withApp = (Component) => {
  const WithApp = (props) => (
    <Consumer>
      {(appProps) => <Component {...appProps} {...props} />}
    </Consumer>
  );

  WithApp.getInitialProps = async (context) => ({
    ...(Component.getInitialProps
      ? await Component.getInitialProps(context)
      : {}),
  });

  const displayName = Component.displayName || Component.name || `Unknown`;
  WithApp.displayName = `WithApp(${displayName})`;

  return WithApp;
};

export { AppProvider, Consumer as AppConsumer, AppContext, withApp };
