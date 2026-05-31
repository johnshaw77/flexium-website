/**
 * @license
 * SPDX-License-Identifier: Apache-2.0 Flexium
 */

import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import CompanyWebsite from "./pages/CompanyWebsite";
import Optimus from "./pages/Optimus";
import OptimusFrontdesk from "./pages/OptimusFrontdesk";

type Route = "home" | "company" | "optimus" | "frontdesk";

const HASH_TO_ROUTE: Record<string, Route> = {
  "": "home",
  "#/": "home",
  "#/company": "company",
  "#/optimus": "optimus",
  "#/frontdesk": "frontdesk",
};

const ROUTE_TO_HASH: Record<Route, string> = {
  home: "#/",
  company: "#/company",
  optimus: "#/optimus",
  frontdesk: "#/frontdesk",
};

function getRouteFromHash(): Route {
  return HASH_TO_ROUTE[window.location.hash] ?? "home";
}

export default function App() {
  const [route, setRoute] = useState<Route>(getRouteFromHash);

  // Keep state in sync with browser back/forward navigation.
  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (next: Route) => {
    if (window.location.hash !== ROUTE_TO_HASH[next]) {
      window.location.hash = ROUTE_TO_HASH[next];
    }
    setRoute(next);
  };

  switch (route) {
    case "company":
      return <CompanyWebsite onNavigateHome={() => navigate("home")} />;
    case "optimus":
      return <Optimus onNavigateHome={() => navigate("home")} />;
    case "frontdesk":
      return <OptimusFrontdesk onNavigateHome={() => navigate("home")} />;
    default:
      return (
        <LandingPage
          onEnterCompany={() => navigate("company")}
          onEnterOptimus={() => navigate("optimus")}
          onEnterFrontdesk={() => navigate("frontdesk")}
        />
      );
  }
}
