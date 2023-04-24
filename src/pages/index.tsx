// import { NextPageContext } from "next/dist/shared/lib/utils";
// import isMobile from "is-mobile";

export default function Index() {
  return <></>;
}

// export async function getServerSideProps(ctx: NextPageContext) {
//   const isMobileDevice = isMobile({ ua: ctx.req, tablet: false });
//   const isTabletDevice =
//     !isMobileDevice && isMobile({ ua: ctx.req, tablet: true });
//   let route = "/pc";
//   if (isMobileDevice) {
//     route = "/mobile";
//   } else if (isTabletDevice) {
//     route = "/tablet";
//   }
//   return {
//     props: {},
//     redirect: {
//       destination: route,
//       permanent: true,
//     },
//   };
// }
