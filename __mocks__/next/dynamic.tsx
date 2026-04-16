import React from "react";

const dynamic = (
  loader: () => Promise<{ default: React.ComponentType<unknown> }>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options?: { ssr?: boolean; loading?: () => React.ReactNode }
) => {
  // Return a component that lazily requires the module
  const DynamicComponent = (props: Record<string, unknown>) => {
    const [Comp, setComp] = React.useState<React.ComponentType<unknown> | null>(null);

    React.useEffect(() => {
      loader().then((mod) => setComp(() => mod.default));
    }, []);

    if (!Comp) return null;
    return <Comp {...props} />;
  };

  DynamicComponent.displayName = "DynamicMock";
  return DynamicComponent;
};

export default dynamic;
