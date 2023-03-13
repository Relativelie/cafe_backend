const URLS = {
  USERS: {
    BASE: "/users",
  },
  AUTH: {
    BASE: "/",
    ACTIVATION: "/activate/:link",
    LOGIN: "/login",
    LOGOUT: "/logout",
    REFRESH: "/refresh",
    REGISTRATION: "/registration",
  },
  LIKES: {
    BASE: "/likes",
    GET_LIKES: "/:id",
    UPDATE_LIKES: "/:id",
    CREATE_LIKES: "/:id",
  },
  PRODUCTS: {
    BASE: "/products",
    GET_PRODUCTS: "/:id",
    UPDATE_PRODUCTS: "/:id",
    CREATE_PRODUCTS: "/:id",
  },
  RECIPES: {
    BASE: "/recipes",
    ALL_RECIPES: "/",
    CREATE_RECIPES: "/create",
    GET_RECIPES: "/:id",
  },
};

export default URLS;
