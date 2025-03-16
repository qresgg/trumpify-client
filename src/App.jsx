import style from './App.module.scss';
import { Layout } from './components/layout';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className={style.app} style={{userSelect: 'none'}}>
        <Layout />
      </div>
    </BrowserRouter>
  );
}

export default App;
