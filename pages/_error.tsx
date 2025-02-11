import NextErrorComponent from "next/error";
import type { NextPageContext } from "next";
import * as Sentry from "@sentry/nextjs";

interface ErrorProps {
  statusCode: number;
  hasGetInitialPropsRun: boolean;
  err?: Error;
}

function MyError({ statusCode, hasGetInitialPropsRun, err }: ErrorProps) {
  // Capture exception if getInitialProps has not run
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }
  return <NextErrorComponent statusCode={statusCode} />;
}

MyError.getInitialProps = async (context: NextPageContext) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps(context);
  (
    errorInitialProps as unknown as { hasGetInitialPropsRun: boolean }
  ).hasGetInitialPropsRun = true;

  if (context.err) {
    Sentry.captureException(context.err);
    return errorInitialProps as ErrorProps;
  }

  return errorInitialProps as ErrorProps;
};

export default MyError;
