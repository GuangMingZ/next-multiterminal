import "@/styles/globals.css";
import App, { AppProps, AppContext } from "next/app";
import Router from "next/router";
import { NextPageContext } from "next/dist/shared/lib/utils";
import isMobile from "is-mobile";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

function redirect(ctx: NextPageContext, location: string) {
  if (ctx.req) {
    ctx.res?.writeHead(308, { Location: location });
    ctx.res?.end();
  } else {
    Router.push(location);
  }
}

MyApp.getInitialProps = async (context: AppContext) => {
  const { ctx } = context;
  const isMobileDevice = isMobile({ ua: ctx.req, tablet: false });
  const isTabletDevice =
    !isMobileDevice && isMobile({ ua: ctx.req, tablet: true });
  if (isMobileDevice && !ctx.pathname.startsWith("/mobile")) {
    redirect(ctx, "/mobile");
  } else if (isTabletDevice && !ctx.pathname.startsWith("/tablet")) {
    redirect(ctx, "/tablet");
  } else if (
    !isMobileDevice &&
    !isTabletDevice &&
    !ctx.pathname.startsWith("/pc")
  ) {
    redirect(ctx, "/pc");
  }
  return {
    ...App.getInitialProps(context),
  };
};
