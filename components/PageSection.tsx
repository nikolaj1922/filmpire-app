import React, { PropsWithChildren } from "react";

interface Props {
  subheader: string;
}

const PageSection: React.FC<PropsWithChildren<Props>> = ({
  subheader,
  children,
}) => {
  return (
    <div className="page-section">
      <h3 className="page-section-subheader">{subheader}</h3>
      {children}
    </div>
  );
};

export default PageSection;
