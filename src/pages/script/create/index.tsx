
import Create from "@/components/create/create";
import { getAppLayout } from "@/components/layout/layout";
import { NextPageWithLayout } from "@/utils/types";
import React from "react";

const index: NextPageWithLayout = () => {
  return (
    <div>
      <Create />
    </div>
  );
};

export default index;
index.isProtected = true;
index.getLayout = (page) => getAppLayout(page, '');
