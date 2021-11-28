import { ReactElement, FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "app/context/api";
import Pages from "./app/pages";
import "./app.scss";

const App: FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Pages />
      </ApiProvider>
    </BrowserRouter>
  );
};

export default App;
