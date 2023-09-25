import './App.css';
import AppFooter from './components/AppFooter/AppFooter';
import AppHeader from './components/AppHeader/AppHeader';
import MainForm from './components/MainForm/MainForm';
function App() {

  return (

    <div className="App">
      <AppHeader />
      <div className='main'>
        <MainForm />
      </div>
      <AppFooter />


    </div>

  );
}

export default App;
