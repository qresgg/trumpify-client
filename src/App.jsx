import style from './App.module.scss';
import { Layout } from './components/layout';
import {useDeviceDetect} from "./hooks/global/useDeviceDetect";

export default function App() {
    const deviceType = useDeviceDetect({ breakpoint: 480, debounceMs: 50 });
  return (
    <div className={style['app']} style={{userSelect: 'none'}}>
      <Layout />
    </div>
  );
}