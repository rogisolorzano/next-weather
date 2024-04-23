## Weather.

This is a basic weather app built with [Next.js](https://nextjs.org/).

## Getting Started

1. You will need the API keys for Google Places API and OpenWeather API.
   Copy `.env.local.example` to `.env.local` and replace the values with your secrets.

2. Ensure you have the right node version.

```
nvm use
```

This references the version in `.nvmrc`

3. Run `npm install`

4. Run the development server:

```bash
npm run dev
```

Go to [http://localhost:3000](http://localhost:3000). Auth is stubbed out in this application. You
can enter any email and password on the login screen.

## Technical overview

### Components & Styling

This project heavily leverages [Radix UI](https://www.radix-ui.com/). It has a great developer experience, active community, out of the box accessibility and great support for SSR.

This project leverages the props that Radix provides for styling when possible, for example:

```
<Grid
  columns={{ initial: "1", sm: "2" }}
  pt={{ initial: "0", sm: "2" }}
  gap="3"
>
```

For custom styling, we use [Tailwind CSS](https://tailwindcss.com/) along with `clsx` and `tailwindMerge` for handling class name toggling and merging.

### State management

This project leverages [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) for its dead-simplicity and low boilerplate.

With SSR, one page is rendered to the browser at a time, which provides good partitioning of functionality. This makes app-wide state management mostly unnecessary.

The store is defined in `lib/store`.

### Form validation

For form validation, we are using [react-hook-form](https://react-hook-form.com/) for its dead simple API and focus on performance. An example can be seen in the LoginForm.

### Auth

Auth is stubbed out - we have some logic in `middleware.ts` to check a session cookie and simulate auth.

## Tests

Run `npm run test` to run unit tests.

End to end testing with cypress is WIP.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
