import style from './App.module.scss';
import { Layout } from './components/layout';

export default function App() {
  return (
    <div className={style['app']} style={{userSelect: 'none'}}>
      <Layout />
    </div>
  );
}