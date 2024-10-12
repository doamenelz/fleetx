import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("../components/SSR/WrapperSSR"), {
  ssr: false, // Set ssr to false to exclude from server-side rendering
});

const YourPage = () => {
  return (
    <div>
      {/* Render the dynamically imported component */}
      <DynamicComponent />

      {/* Other components */}
    </div>
  );
};

export default YourPage;
