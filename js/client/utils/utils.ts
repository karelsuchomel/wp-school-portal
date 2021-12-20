declare global {
  interface Window {
    SiteSettings: LoadedSettings;
    navigationData: LoadedNavigation;
  }
}

interface LoadedSettings {
  endpoint: string;
  nonce: string;
  user: string;
  userDisplay: string;
  frontPage: {
    page: string;
  };
  URL: {
    base: string;
    path: string;
  };
  meta: {
    title: string;
    description: string;
  };
}

interface LoadedNavigation {
  primary: Array<NavigationLink>;
  userMenu: Array<NavigationLink>;
  dashboard: Array<NavigationLink>;
}

interface NavigationLink {
  title: string;
  url: string;
}

// Global variables loaded from WordPress
export const siteSettings = {
  ...window.SiteSettings,
  navigationData: window.navigationData ||
    { primary: [], userMenu: [], dashboard: [] },
};

// console.log(siteSettings);

export const isRelativeLink = (path: string): boolean => {
  return path[0] === "/";
}

const isInternalLink = (path: string): boolean | undefined => {
  // Is it relative path
  if (isRelativeLink(path)) {
    return true
  }

  // Is it internal absolute path
  try {
    const url = new URL(path);
    const server = new URL(window.SiteSettings.URL.base);
    return server.hostname === url.hostname;
  } catch (err) {
    return undefined;
  }
};

// Makes relative path from absolute for internal links.
// Otherwise returns input
export const internalAbsoluteToRelativeLink = (
  path: string = "/",
): string => {
  if (isInternalLink(path)) {
    const url = new URL(path);
    return url.pathname + url.search + url.hash;
  }

  return path;
};
