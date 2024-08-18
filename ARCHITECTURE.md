# Architecture

This document describes the high-level architecture of the repository. Read it to familiarize yourself with the codebase.

> We will explain the architectural examples as if this document were created for a car-selling company.

## Code Map

### `src/ui`

> _**Layer**: [Infrastructure (Presentational)](#presentational)_

- Directory where `.vue` components are stored.
  - Check the [Components](#components) section.
  - Directories are in `kebab-case`.

#### Colocation Principles

- Components from a common context need to be grouped in a directory.

  > This helps avoid having an endless folder of loose components and makes it easy to identify which components already exist.

  ```
  // ❌ Bad
  - src/ui/
    [... other components ...]
    FormText.vue
    FormNumber.vue
    FormSelect.vue
    [... other components ...]
    CarCard.vue
    CardPricing.vue
    CardList.vue
    [... other components ...]

  // ✅ Good
  - src/ui/
    - src/ui/form
        FormText.vue
        FormNumber.vue
        FormSelect.vue
    - src/ui/car
        CarCard.vue
        CardPricing.vue
        CardList.vue
    [... other components ...]
  ```

#### `src/ui/views`

This is where app pages (`.vue` components) are stored. Like isolated components, views with a common context must be grouped in a directory.

##### `src/ui/views/layouts`

Different UI reusable layouts.

#### `src/domain`

> _**Layers**: [Domain](#domain), [Application](#application)_

- This is where the business logic and _domain entities_ are stored.
  - **Domain Entity**: A class or interface that represents a business entity. For example, a `Car` class or interface.
- Each domain entity will have a _composable_, which groups _use cases_ that can be performed in the business.
  - **Use Case**: A function that encapsulates and manages a specific user interaction or workflow, representing a real-world business action. For example, a `buyCar(car: Car)` function.

> Currently, the domain layer is coupled with Vue (but not with the browser context) because we are using composables to centralize use cases. We make this concession in favor of simplicity.

```
- src/domain
    Car.ts -> Car domain entity, with methods like addExtra(extra: CarExtra)
    CarExtra.ts -> Car extra domain entity
    Cart.ts -> Cart domain entity
    Order.ts -> Order domain entity with methods like "addDiscount(discount: OrderDiscount)"
    OrderDiscount.ts -> Order discount domain entity
    types.ts -> Contains common types like CursorPagination
    useCart.ts -> With methods like "addCart(car: Car)", "checkout()", etc.
    useCars.ts -> With methods like "fetchById(id: Car['id'])", "list(filters: CarListFilters, pagination: CursorPagination)"
```

#### `src/infrastructure`

> _**Layer**: [Infrastructure](#infrastructure)_

- This is where **services** are stored:
  > **Service**: A class that handles API communication, only accepting and returning serializable data or _domain entities_.

## Layers

### Presentational

`// TODO`

### Domain

`// TODO`

### Infrastructure

`// TODO`

## SOLID

`// TODO`

## Testing

`// TODO`

- Static: `// TODO`
- Unit: `// TODO`
- Integration: `// TODO`
- E2E:
  - Tests MUST behave like a user.
    > "The more your tests resemble the way your software is used, the more confidence they can give you." - [Kent C. Dodds](https://x.com/kentcdodds/status/977018512689455106)

## Components

### Naming

- File names should be in `PascalCase`.
- File names need to be as short as possible without losing context.
  > **Code Smell**: If you need a long name for a component, it’s likely heavily coupled to a specific context and is not reusable. Check [SRP](#srp).

### Semantics

- Semantics are important for various reasons:
  - **Accessibility**: [Accessibility Introduction](https://www.w3.org/WAI/fundamentals/accessibility-intro/)
  - **Make E2E tests less fragile**:
    - If the test can refer to elements without knowing internal implementations (classnames, IDs, selectors, or tags), we decouple the test from the code.
    - Without being coupled, the test does not need to know that we are using Vue.
    - Without being coupled, we can write tests in the same way we instruct users on how to use the application (in fact, [the test MUST behave like a user](#must-behave-like-a-user)).
      - We do not tell the user: _Find the button with ID `#submit-action`, data-test attribute `form-submit-action`, and classname `active`, and click it._
      - We tell them: _Find the active "Submit" button and click it._
