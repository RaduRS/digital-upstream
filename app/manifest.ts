import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Digital Upstream",
    short_name: "Digital Upstream",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F4F4",
    theme_color: "#F5F4F4",
    icons: [
      {
        src: "/digital-upstream-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

