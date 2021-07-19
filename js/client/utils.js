export const getRelativePath = function( path ) {
    const re = new RegExp(`^${window.SiteSettings.endpoint}(.*)`, "g");
    const result = re.exec(path);

    if (result.length === 2) {
        return result[1];
    } else {
        return path;
    }
};