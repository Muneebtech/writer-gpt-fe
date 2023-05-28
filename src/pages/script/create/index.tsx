import Script from "@/components/Script/Script";
import { getAppLayout } from "@/components/layout/layout";
import { NextPageWithLayout } from "@/utils/types";
import React from "react";

const index: NextPageWithLayout = () => {
  return (
    <div>
      <Script></Script>
    </div>
  );
};

export default index;
index.isProtected = true;
index.getLayout = (page)=> getAppLayout(page,'Create Script');
