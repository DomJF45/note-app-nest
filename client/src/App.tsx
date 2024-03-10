import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { router } from "./router";
import { queryClient } from "./queryClient";
import { Toaster } from "react-hot-toast";

/*
 * This funciton takes providers and renders them with the router as children
 * */

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-center" gutter={8} />
    </QueryClientProvider>
  );
}

export default App;
