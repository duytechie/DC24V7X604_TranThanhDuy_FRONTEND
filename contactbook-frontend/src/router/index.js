import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import authService from "@/services/auth.service";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
    meta: { requiresAuth: true },
  },
  {
    path: "/contacts/add",
    name: "contact.add",
    component: () => import("@/views/ContactAdd.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("@/views/ContactEdit.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = authService.isLoggedIn();

  if (to.meta.requiresAuth && !loggedIn) {
    return next({ name: "login" });
  }

  if (to.meta.requiresGuest && loggedIn) {
    return next({ name: "contactbook" });
  }

  next();
});

export default router;
