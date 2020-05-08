import React from "react";
import { useTranslation } from 'react-i18next';
import '../../locale/i18n';
function NotFound() {
    const { t } = useTranslation();
    return (
        <div className="not-found">
            <div>404</div>
            <div>
                {t('NOT_FOUND')}
            </div>
        </div>
    )
}
export default NotFound;