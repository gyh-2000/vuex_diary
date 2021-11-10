const IndexPage = () => import("@/pages/Index");
const OwnSpacePage = () => import("@/pages/OwnSpace");
const CommenPage = () => import('@/pages/Commen')

const route = [
  {
    path: "/",
    name: '',
    redirect: '/index'
  },
  {
    path: "/index",
    name: "index",
    component: CommenPage,
    children: [
      {
        path: 'diary',
        component: IndexPage
      },
      {
        path: "detail",
        component: OwnSpacePage,
      },
    ],
  },
];

export default route;
