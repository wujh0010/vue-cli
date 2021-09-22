interface Config {
  name?: string,
  lang?: string,
  api?: string
}

const config = (): Config => {
  return {
    name: process.env.NAME,
    lang: process.env.LANG,
    api: process.env.API
  }
}

export default config;
