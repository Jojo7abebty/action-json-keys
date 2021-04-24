# action-json-keys
A GitHub action to check keys of json files
## How to use it

Create a `.yml` file in `./github/workflows/` in your project.

## Inputs

- `file-matcher`: Minimatch expression of the json files to check.
  - Optional.
  - Default: `'**/*.json'`.
- `order`: The alphabetical key order.
  - Options: `'acs'`, `'desc'`.
  - Optional.
  - Default: `'asc'`.
- `key-format`: Format of the keys.
  - Options: `'snake_case'`, `'camelCase'`, `'PascalCase'`, `'kebab-case'`.
    You can also put your custom regular expression.
  - Optional.
  - Default: `'camelCase'`.
  

## Outputs

No output.

## Result

It will fail the checks on your Pull Requests if any issue is found.


## Example usage

```yml
on: [pull_request]

jobs:
  linter:
    runs-on: ubuntu-latest
    name: Check JSON keys
    steps:
    - name: Checkout code
      uses: actions/checkout@v2
    - name: Check json files
      uses: ValentinVignal/action-json-keys@v0.5
      with:
        file-matcher: 'json/**/*.json'
```

If you want to use your own regular expression, you can use the option `key-format`:

```yml
on: [pull_request]

jobs:
  linter:
    runs-on: ubuntu-latest
    name: Check JSON keys
    steps:
    - name: Checkout code
      uses: actions/checkout@v2
    - name: Check json files
      uses: ValentinVignal/action-json-keys@v0.5
      with:
        file-matcher: 'json/**/*.json'
        key-format: '^(([A-Z]{2})|([a-z0-9_]*))$' # snake_case or country code

```
