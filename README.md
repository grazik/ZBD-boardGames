# ZBD Project ReadMe

## Basics

### IDE
We suggest using webstorm, all configuration will be shown on it.
If you prefer something else, remember to ensure that it supports following plugins:

* Editorconfig
* Save Actions
* Eslint *

\* For your own good, our webpack uses eslint-loader. It's better to see your errors and warnings within IDE then during build.

### Yarn
In this project we use yarn instead of npm.
We suggest installing it globally, to do so use following command:

 ``npm install -g yarn``


You can also download it from yarn home page. All of the following commands use yarn.

## Setting things up.
After downloading repository use following command:

`` yarn install``

And you are ready to go.

## EditorConfig

As it was mentioned in Basics, we use EditorConfig.

We use:

* 4 spaces as indent
* UTF-8 as coding
* clrf as end-of-line

We don't:

* add whitespace at the end of line
* add empty line at the end of the file

Webstorm has EditorConfig plugin included, but make sure it enables its support.
```
 File -> Settings -> Editor -> Code Style
 At the end of this window, check 'Enable EditorConfig Support
```

Configuration file (.editorconfig) is added automatically.

## Eslint

### Configuration of the IDE

```
File -> Setting -> Preferences -> Languages and Frameworks -> JavaScript -> Code Quality Tools -> ESLint
```
Check Enable box

In Node Interpreter select path to your node file

In Eslint Package select path to your eslint package inside node_modules.

In Configuration File select path to .eslintrc, it should be in as-home directory.

### Rules

We use airbnb rules which are extended by:

[TODO]

## Save Actions

### Instalation

In webstorm
```
File -> Setting -> Plugin
```
Type Save Actions and install that plugin.

### Configuration
In webstorm
```
File -> Setting -> Save Actions
```
Check 'Activate save actions on save' box in Gerenal section

Check 'Reformat file' box in Formatting actions section.

## Commands



## Structure


