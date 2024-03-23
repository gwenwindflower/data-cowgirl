---
title: Task is awesome
description: Task is awesome
pubDate: 2024-03-23
---

I _love_ the terminal. Like a weird amount. It's uniquely flexible and rigid at the same time, in a way that really works for my neurodivergent brain. One of the coolest things about the terminal is the way you can _script_ things. If there's a task you do more than once, you can just write a script to do it for you and voila. Try doing that with a GUI! (I mean, GUIs are great too, for different reasons)

Unfortunately, bash scripting is not always the most accessible thing to learn or parse. Simple stuff is relatively straightforward, but once you get into the weeds of conditionals, loops, and functions, it can get pretty gnarly pretty quick.

Not only that, but there are often specific things you want to do in specific projects, that don't necessarily need to be in your global environment. Particularly when there are multiple specific things with the same name that operate differently in different projects.

Enter `make`. `make` is the original task runner/build tool (these are slightly different things but often used interchangeably unless you're pedantic and/or program in C a lot), and it's still one of the best. It's a bit weird in the syntax department, but it's also very powerful and flexible. Kind of like a shell script, but with a bunch of extra features that make it easier to use for certain things.

So...I don't love `make`. I don't have anything against it, I'm just kinda dumb and I like things simple. As simple as possible really. And I don't mind using an extra tool to make things easier for myself. That's where `task` comes in.

While `make` is very similar to bash scripting in its syntax, `task` is configured with YAML. This makes it a lot easier to read and write if you're a dbt-head like myself who wrangles lots of YAML. It also has a bunch of extra features that make it easier to use for certain things. It can automatically read in your environment variables, it lets you easily run things in parallel or serial, and it has a bunch of built-in features for things like logging and error handling. And where `make` requires special syntax for commands that don't produce files, `task` is designed to be more intuitive and flexible and expects that you probably want to run commands that do arbitrary things.

Here's an example Taskfile.yml (the YAML that configures `task`) for this very website:

```yaml
version: "3"

tasks:
  dev:
    aliases: ["d"]
    cmds:
      - astro dev
  build:
    aliases: ["b"]
    cmds:
      - astro build
      - astro preview
```

Pretty easy right? You can run `task dev` to start the development server, and `task build` to build the site and preview it. I also alias task to `t`, so I can also run `t d` and `t b` respectively. This is a really simple example, but you can imagine how this could be useful for a more complex project.

Here's a `Taskfile.yml` (the YAML that configures `task`) for a dbt project that sets up a virtual environment, installs dependencies, and builds the project:

```yaml
version: "3"

tasks:
  venv:
    cmds:
      - python3 -m venv .venv

  install:
    cmds:
      - source .venv/bin/activate && python3 -m pip install --upgrade pip
      - source .venv/bin/activate && python3 -m pip install -r requirements.txt --progress-bar off

  build:
    cmds:
      - source .venv/bin/activate && dbt deps
      - source .venv/bin/activate && dbt seed
      - rm -rf jaffle-data
      - source .venv/bin/activate && dbt run
      - source .venv/bin/activate && dbt test

  setup:
    cmds:
      - task: venv
      - task: install
      - task: build
```

If you're interested in checking it out for yourself, you can install `task` with `brew install go-task` on a Mac, or similar on whatever platform you're using. You can also check out the [official documentation](https://taskfile.dev/#/) for more details.
