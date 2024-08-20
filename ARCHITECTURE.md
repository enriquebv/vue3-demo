# Architecture

This document describes the high-level architecture of the repository. Read it to familiarize yourself with the codebase.

## Code Map

#### `src/domain`

- Domain entity definitions.

#### `src/infrastructure`

- Access and mutation of remote data.
- Contains services.
  - Each service must be a interface defining the service methods.
    - Each concrete service implements must implements that interface.

#### `src/composables`

- Bridge between Vue app and domain/infrastructure.
- Use it to wrap dependencies, to avoid components be coupled to them.
- Contains services.
  - Each service must be a interface defining the service methods.
    - Each concrete service implements must implements that interface.

#### `src/ui`

- Presentational components.
- If a component script setup is large, isolate that logic in a composable adjacent to the component.
  - Check `./src/ui/business/vacancies/vacancy-board.ts`
- Naming:
  - Vue components in PascalCase.
    - Vue requires all components to have two words, if your component only can be described with one word use `UI` prefix. Instead of `Button.vue`, use `UIButton.vue`.
  - Dirs in kebab-case.
  - Composables in kebab-case.
- Colocation principles:
  - Components from a common context need to be grouped in a directory. Check `./src/ui/icons`.
  - If the component has more components that compose it, create a dir for this component. Check `./src/ui/ui-board`.
- Components must not be coupled to business logic (except `business` dir).
- Must not know

##### `src/ui/views`

- Vue router views.

##### `src/ui/business/**`

- This dir contains concrete implements for the business.
  - For example, the vacancy board is in `./src/ui/business/vacancies/VacancyBoard.vue`.

###### `src/ui/views/layouts`

- Layouts to be used in the app.

## SOLID

- S:
  - Small components/functions/classes with one responsibility over big chunks of code with multiple results.
    - Check `./src/ui/RelativeTime.vue`, a component used to update in real time the relative time from a date.
- O:
  - Components must be extended adding code, not modifying internal implementation details.
    - Check `./src/ui/business/vacancies/VacancyBoard.vue`, extends `./src/ui/ui-board/UIBoard.vue` adding code.
- L:
  - Abstract dependencies from concreate implementations.
    - Check `./src/composables/toast.ts`, abstracts `toast` feature from external dependency.
- I:
  - Prefer small components with low props over big ones.
    - If your component has too much props, probably you need to split it.
- D:
  - Inject logic that need to be mocked to make tests easier.
    - Check `./src/di.ts`.
