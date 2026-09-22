# Regent Orthodontics

Website for Regent Orthodontics, 11/11A Regent Street, Newtownards, County Down BT23 4AB — [regentorthodontics.com](https://regentorthodontics.com).

Built with [Astro](https://astro.build) and published to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```sh
npm ci
npm run build   # builds the site, then runs the compliance checks
```

`npm run build` fails if a mandatory compliance check fails, and a failed build is not deployed: the previous version of the site stays live.
