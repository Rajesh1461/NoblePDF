const supportedLanguages = ["el_GR", "it_IT", "ru_RU", "pl_PL", "bo_CN", "ro_RO", "tr_TR", "hi_IN", "id_ID", "pt_BR", "th_TH", "fr_FR", "ja_JP", "cs_CZ", "de_DE", "hu_HU", "zh_TW", "eu_ES", "sk_SK", "es_ES", "nl_NL", "sr_LATN_RS", "sv_SE", "da_DK", "fa_IR", "bg_BG", "vi_VN", "az_AZ", "hr_HR", "ar_AR", "en_GB", "no_NB", "ko_KR", "en_US", "ml_IN", "uk_UA", "ga_IE", "sl_SI", "zh_CN", "ca_CA", "pt_PT"];

function getDetailedLanguageCode() {
    const userLanguages = navigator.languages ? navigator.languages : [navigator.language];
    for (let lang of userLanguages) {
        let matchedLang = supportedLanguages.find(supportedLang => supportedLang.startsWith(lang.replace('-', '_')));
        if (matchedLang) {
            return matchedLang;
        }
    }
    // Fallback
    return "en_GB";
}