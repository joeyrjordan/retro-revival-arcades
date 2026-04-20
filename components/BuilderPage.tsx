"use client";

import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { useEffect, useState } from "react";

builder.init("f5d286e7cb4c4fb0976ea20024894328");

export default function BuilderPage({ model = "page" }) {
  const [content, setContent] = useState(null);
  const isPreviewing = useIsPreviewing();

  useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get(model, {
          url: window.location.pathname,
        })
        .promise();

      setContent(content);
    }

    fetchContent();
  }, [model]);

  if (!content && !isPreviewing) {
    return <div>Page not found</div>;
  }

  return <BuilderComponent model={model} content={content || undefined} />;
}