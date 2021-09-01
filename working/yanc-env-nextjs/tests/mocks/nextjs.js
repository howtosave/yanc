
//
// See https://github.com/vercel/next.js/issues/7479
//

// next/router
jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "",
            pathname: "",
            query: "",
            asPath: "",
        };
    },
}));

/**
# in the tests 
useRouter.mockImplementation(() => ({
      route: "/yourRoute",
      pathname: "/yourRoute",
      query: "",
      asPath: "",
    }));
 */
