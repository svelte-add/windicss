<h1 align="center">🌬️ Add Windi CSS to Svelte</h1>

## ❓ What is this?
This is an **experimental** command to run to add Windi CSS to your SvelteKit project or Vite-powered Svelte app.

## 🧰 Adding to SvelteKit
You must start with a fresh copy of the official SvelteKit template, which is currently created by running this command:
```sh
npm init svelte@next
```

Once that is set up, run this command in your project directory to set up Windi CSS:
```sh
npx svelte-add windicss
```

## ⚡️ Adding to Vite
You must start with a fresh copy of the official Vite-powered Svelte app template, which is currently created by running this command:
```sh
npm init @vitejs/app  # Choose svelte or svelte-ts
```

Once that is set up, run this command in your project directory to set up Windi CSS:
```sh
npx svelte-add windicss
```

## 🛠 Usage
After the preset runs,
* You can use Windi utility classes like `bg-blue-700` in the markup (components, routes, `app.html`).

* You can [configure Windi CSS](https://windicss.org/guide/configuration.html) in the `windi.config.cjs` file.

* Your Windi CSS will be purged for production builds.

* You can apply *another* [Svelte Adder](https://github.com/svelte-add/svelte-adders) to your project for more functionality.

## 😵 Help! I have a question
[Create an issue](https://github.com/svelte-add/windicss/issues/new) and I'll try to help.

## 😡 Fix! There is something that needs improvement
[Create an issue](https://github.com/svelte-add/windicss/issues/new) or [pull request](https://github.com/svelte-add/windicss/pulls) and I'll try to fix.

These are new tools, so there are likely to be problems in this project. Thank you for bringing them to my attention or fixing them for me.

## 📄 License
MIT

---

*Repository preview image generated with [GitHub Social Preview](https://social-preview.pqt.dev/)*

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
