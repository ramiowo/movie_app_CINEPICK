import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | CINEPICK</title>
    </Helmet>
  );
};

export default PageTitle;
