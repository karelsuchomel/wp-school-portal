// Global variables loaded from WordPress
export const siteSettings = {
    ...window.SiteSettings,
    navigationData: window.navigationData || { primary: [], userMenu: [], dashboard: [] }
}

export const getRelativePath = function( path ) {
    const re = new RegExp(`^${siteSettings.endpoint}(.*)`, "g");
    const result = re.exec(path);

    if (result.length === 2) {
        return result[1];
    } else {
        return path;
    }
};