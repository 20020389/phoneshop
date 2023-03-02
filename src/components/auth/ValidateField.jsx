import React, { useMemo } from 'react';

export function ValidateField({ as, ...props }) {
  const Component = useMemo(() => {
    return React.createElement(as);
  }, [as]);

  return <Component {...props} />;
}
