import { getAppLayout } from "@/components/layout/layout";
import Library from "@/components/library";
import { NextPageWithLayout } from "@/utils/types";
import React from "react";

const Index: NextPageWithLayout = () => {
  return (
    <>
      <Library />
    </>
  );
};

export default Index;
Index.isProtected = true;
Index.getLayout = (page) => getAppLayout(page, "Library", true); // Set showSearch to true
