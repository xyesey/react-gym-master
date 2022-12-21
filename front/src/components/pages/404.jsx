
import Layout from "../../common/Layout";
import bgImage from "../../../images/newwork2.jpg";


function error404() {
  return (
    <>
      <Layout bgImage={bgImage} heading="Page not found" />
      <div className="wrapper-inner-page">
      404 page not found
      </div>
    </>
  );
}

export default error404;