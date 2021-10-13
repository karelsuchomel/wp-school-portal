import React from "https://esm.sh/react?dev&no-check";
import {
  internalAbsoluteToRelativeLink,
  isRelativeLink,
} from "../../utils/utils.ts";
import { Link as RouterLink } from "https://esm.sh/react-router-dom?dev&no-check";

const Link = ({ title, to }) => {
  const url = !isRelativeLink(to) ? internalAbsoluteToRelativeLink(to) : to;

  if (isInternalLink(to)) {
    return (
      <RouterLink className="nav-link" to={url}>
        {title}
      </RouterLink>
    );
  }

  return <a className="nav-link" href={to}>{title}</a>;
};

export default Link;
