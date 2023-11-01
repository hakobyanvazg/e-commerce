import notFoundStyle from "./style.module.css";
const NotFound = () => {
  return (
    <div className={notFoundStyle.not_found}>
      <h2>404</h2>
      <p>Page not found</p>
    </div>
  );
};

export default NotFound;
