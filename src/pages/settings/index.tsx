import { getAppLayout } from "@/components/layout/layout";
import Setting from "@/components/settings/Settings";
import { NextPageWithLayout } from "@/utils/types";
import React from "react";

const index: NextPageWithLayout = () => {
    return (
        <div>
            <Setting />
        </div>
    );
};

export default index;
index.isProtected = true;
index.getLayout = (page) => getAppLayout(page, '');
