import { Footer } from './components/Footer/footer.jsx';
import { Header } from './components/Header/header.jsx';
import { Main } from './components/Main/main.jsx';
import { Auth } from './components/Auth/auth.jsx';
import style from './App.module.scss';

function App() {
  return (
    <div className={style.app}>
      {/* <Header />
      <Main />
      <Footer /> */}
      <Auth />
    </div>
  );
}

export default App;
