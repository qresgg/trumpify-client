import style from './App.module.scss';
import { Layout } from './components/layout';

function App() {
  return (
    <div className={style.app} style={{userSelect: 'none'}}>
      <Layout />
    </div>
  );
}

export default App;
