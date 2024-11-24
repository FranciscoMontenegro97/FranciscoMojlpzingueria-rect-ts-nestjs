
const Loading = () => (
  <div className="loading">
    <div className="loading__container">
      <div className="loading__pulse"></div>
      <div className="loading__pulse"></div>
      <div className="loading__pulse"></div>
      <img src="/images/logo.png" alt="Loading" className="loading__logo" />
    </div>
    <p className="loading__text">Cargando...</p>
  </div>
);

export default Loading;