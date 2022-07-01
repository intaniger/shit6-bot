oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g space-pilot-coach
$ space-pilot-coach COMMAND
running command...
$ space-pilot-coach (--version)
space-pilot-coach/0.0.0 linux-arm64 node-v16.14.2
$ space-pilot-coach --help [COMMAND]
USAGE
  $ space-pilot-coach COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`space-pilot-coach help [COMMAND]`](#space-pilot-coach-help-command)
* [`space-pilot-coach plugins`](#space-pilot-coach-plugins)
* [`space-pilot-coach plugins:install PLUGIN...`](#space-pilot-coach-pluginsinstall-plugin)
* [`space-pilot-coach plugins:inspect PLUGIN...`](#space-pilot-coach-pluginsinspect-plugin)
* [`space-pilot-coach plugins:install PLUGIN...`](#space-pilot-coach-pluginsinstall-plugin-1)
* [`space-pilot-coach plugins:link PLUGIN`](#space-pilot-coach-pluginslink-plugin)
* [`space-pilot-coach plugins:uninstall PLUGIN...`](#space-pilot-coach-pluginsuninstall-plugin)
* [`space-pilot-coach plugins:uninstall PLUGIN...`](#space-pilot-coach-pluginsuninstall-plugin-1)
* [`space-pilot-coach plugins:uninstall PLUGIN...`](#space-pilot-coach-pluginsuninstall-plugin-2)
* [`space-pilot-coach plugins update`](#space-pilot-coach-plugins-update)
* [`space-pilot-coach serve`](#space-pilot-coach-serve)

## `space-pilot-coach help [COMMAND]`

Display help for space-pilot-coach.

```
USAGE
  $ space-pilot-coach help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for space-pilot-coach.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `space-pilot-coach plugins`

List installed plugins.

```
USAGE
  $ space-pilot-coach plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ space-pilot-coach plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `space-pilot-coach plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ space-pilot-coach plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ space-pilot-coach plugins add

EXAMPLES
  $ space-pilot-coach plugins:install myplugin 

  $ space-pilot-coach plugins:install https://github.com/someuser/someplugin

  $ space-pilot-coach plugins:install someuser/someplugin
```

## `space-pilot-coach plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ space-pilot-coach plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ space-pilot-coach plugins:inspect myplugin
```

## `space-pilot-coach plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ space-pilot-coach plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ space-pilot-coach plugins add

EXAMPLES
  $ space-pilot-coach plugins:install myplugin 

  $ space-pilot-coach plugins:install https://github.com/someuser/someplugin

  $ space-pilot-coach plugins:install someuser/someplugin
```

## `space-pilot-coach plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ space-pilot-coach plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ space-pilot-coach plugins:link myplugin
```

## `space-pilot-coach plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ space-pilot-coach plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ space-pilot-coach plugins unlink
  $ space-pilot-coach plugins remove
```

## `space-pilot-coach plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ space-pilot-coach plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ space-pilot-coach plugins unlink
  $ space-pilot-coach plugins remove
```

## `space-pilot-coach plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ space-pilot-coach plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ space-pilot-coach plugins unlink
  $ space-pilot-coach plugins remove
```

## `space-pilot-coach plugins update`

Update installed plugins.

```
USAGE
  $ space-pilot-coach plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `space-pilot-coach serve`

Run our "TRUSTED" Coach

```
USAGE
  $ space-pilot-coach serve -t <value> [-d]

FLAGS
  -d, --dev            Should run as dev behavior
  -t, --token=<value>  (required) Discord bot token

DESCRIPTION
  Run our "TRUSTED" Coach

EXAMPLES
  $ oex serve --token OTgyMDA1Mzc2NDU3MjY1MTYy.GYnLT-.1pbk4anc9qa1G-MuOW7ABOQX3id53_73Ev9T5w --dev
```

_See code: [dist/commands/serve/index.ts](https://github.com/intaniger/space-pilot-coach/blob/v0.0.0/dist/commands/serve/index.ts)_
<!-- commandsstop -->
