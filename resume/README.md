# ResumAI

🔗 [https://brianbriscoe.dev/resume](https://brianbriscoe.dev/resume)

This is a lightweight web app that allows you to chat about my resume with a bot using LangChain and OpenAI GPT 3.5.

## Tech stack
The frontend is completely static and requires no build step. This is great as it takes roughly ~3 seconds to deploy to Vercel. 

It uses [Preact](https://preactjs.com/) for the UI and [TailwindCSS](https://tailwindcss.com/) for styling.

The backend is my own [ResumAI API](https://github.com/briscoooe/resumai), a [FastAPI](https://fastapi.tiangolo.com/) app that hosts my resume as a series of endpoints, one of which uses [LangChain](https://python.langchain.com/en/latest/index.html) and [OpenAI](https://openai.com/) to facilitate chat. 

## Development
While there's no explicit build step, there is a file watcher that needs to be run to make changes to the Tailwind automatically.

```bash
npx tailwindcss -i ./index.css -o ./output.css --watch
```

Also every now and then I run prettier to clean up the formatting. Preact uses backticked strings for HTML and by default my IDE does not format them correctly.

```bash
npx prettier --write .    
```

## Todo
- [ ] Add multiple language support
- [ ] Add bot persona support (maybe)
- [ ] Add plain text alternative