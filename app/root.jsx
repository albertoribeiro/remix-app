import styles from '~/styles/main.css'
import MainNavigation from '~/components/main-navigation'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
} from "@remix-run/react";

export const links = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const ErrorBoundary = ({ error }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <title>An error ocurred</title>
      </head>
      <body >
        <header>
          <MainNavigation />
        </header>
        <main className='error'>
          <h1>An error ocurred</h1>
          <h3>{error.message}</h3>
          <p>{error.stack}</p>
          <p>Back to <Link to="/">safety!</Link></p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>)
}


export function CatchBoundary(){
  const caughtResponse = useCatch()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <title>{caughtResponse.statusText}</title>
      </head>
      <body >
        <header>
          <MainNavigation />
        </header>
        <main className='error'>
          <h1>An error ocurred</h1>
          <h3>{caughtResponse.statusText}</h3>
         
          <p>Back to <Link to="/">safety!</Link></p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>)
}