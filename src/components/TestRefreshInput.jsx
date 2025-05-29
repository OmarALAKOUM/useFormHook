import { memo } from "react";

const TestRefreshInput = memo(
  function TestRefresh({ field, as = "input", children, ...props }) {
    console.log("Refresh detected here:", field);

    const Component = as;

    return as === "select" ? (
      <Component {...props}>{children}</Component>
    ) : (
      <Component {...props} />
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.checked === nextProps.checked
    );
  }
);

export default TestRefreshInput;
