import './App.css';

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <button
        onClick={() => {
          window.microApp.dispatch({ myname: 'app2' });
        }}
      >
        发送消息
      </button>
    </div>
  );
};

export default App;
