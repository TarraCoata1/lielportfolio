# Local Projects Drop-Zone

Place each offline / static build in its own folder here:

```
public/local-projects/
  <your-slug>/
    index.html
    assets/...
```

Then register it in `src/lib/portfolio-data.ts` by adding an entry to
`LOCAL_PROJECTS` with:

```ts
{
  id: "<your-slug>",
  n: "L1",
  name: { he: "...", en: "..." },
  category: { he: "...", en: "..." },
  description: { he: "...", en: "..." },
  tags: ["HTML","CSS","JS"],
  image: "/local-projects/<your-slug>/preview.jpg",
  staticFilePath: "/local-projects/<your-slug>/index.html",
}
```

The portfolio modal will iframe the `staticFilePath` directly,
responsive on all breakpoints.
