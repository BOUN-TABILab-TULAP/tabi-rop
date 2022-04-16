import * as React from 'react';
import { useTranslation } from "react-i18next"
export default function NotFound() {


    const { t } = useTranslation()
    return (

        <div >
            <h3>
                {t("notfound")}
            </h3>


        </div>
    );
}