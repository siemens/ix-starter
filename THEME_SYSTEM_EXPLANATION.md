# Theme System Explanation - V4

## Overview

The application uses a comprehensive theme system that synchronizes themes across:
1. **Siemens iX components** (UI framework)
2. **ECharts** (data visualization library)

## How Theme Changes Work

### 1. Theme Storage (HTML Data Attributes)

The theme is stored on the `<html>` element using two data attributes:

```html
<html data-ix-theme="classic" data-ix-color-schema="dark">
```

- `data-ix-theme`: The theme name (`classic` or `brand`)
- `data-ix-color-schema`: The color mode (`dark` or `light`)

These attributes are the **single source of truth** for the current theme.

### 2. Theme Switching Methods

There are **two ways** users can change the theme:

#### Method A: Built-in Menu Toggle (Light/Dark Switch)
**Location:** `src/App.tsx`

```tsx
<IxMenu enableToggleTheme>
```

**What it does:**
- The `enableToggleTheme` prop adds a sun/moon icon button to the menu
- Clicking it toggles `data-ix-color-schema` between `light` and `dark`
- This is handled internally by `@siemens/ix-react`
- **Does NOT** change the theme name (classic/brand)

**Data Attribute Change:**
```
data-ix-color-schema: "dark" ↔ "light"
```

#### Method B: User Settings Page (Classic/Brand Switch)
**Location:** `src/pages/user-settings/index.tsx`

```tsx
function changeTheme(theme: string) {
  setCurrentTheme(theme);
}

useEffect(() => {
  document.documentElement.setAttribute('data-ix-theme', currentTheme);
}, [currentTheme]);
```

**What it does:**
- User clicks on "Classic" or "Siemens Brand" theme preview
- `setCurrentTheme()` updates React state
- `useEffect` detects state change and updates `data-ix-theme` attribute
- **Does NOT** change the color schema (light/dark)

**Data Attribute Change:**
```
data-ix-theme: "classic" ↔ "brand"
```

### 3. How Siemens iX Components React to Theme Changes

**CSS File Loading:**
In `src/main.tsx`:
```typescript
import "@siemens/ix/dist/siemens-ix/siemens-ix-core.css";
import "@siemens/ix/dist/siemens-ix/theme/classic-light.css";
import "@siemens/ix/dist/siemens-ix/theme/classic-dark.css";
```

**How it works:**
1. All theme CSS files are loaded upfront
2. Each CSS file contains theme-specific CSS custom properties scoped by data attributes:
   ```css
   /* classic-dark.css */
   [data-ix-theme="classic"][data-ix-color-schema="dark"] {
     --theme-color-1: #000;
     /* ... more variables */
   }
   
   /* classic-light.css */
   [data-ix-theme="classic"][data-ix-color-schema="light"] {
     --theme-color-1: #fff;
     /* ... more variables */
   }
   ```
3. When data attributes change, CSS automatically applies the matching theme variables
4. All iX components use these CSS custom properties, so they instantly update

### 4. How ECharts Components React to Theme Changes

ECharts needs explicit theme switching because it's a JavaScript library, not pure CSS.

#### Step 1: Theme Registration
**Location:** `src/App.tsx`

```tsx
import { registerTheme } from "@siemens/ix-echarts";
import * as echarts from "echarts/core";

registerTheme(echarts);
```

**What it does:**
- Registers all iX themes with ECharts
- Creates theme definitions for: `classic-dark`, `classic-light`, `brand-dark`, `brand-light`
- These themes contain colors and styles matching iX design system

#### Step 2: Theme Detection Hook
**Location:** `src/hooks/theme.ts`

```tsx
const getCurrentTheme = (): string => {
  const theme = document.documentElement.getAttribute('data-ix-theme') || 'classic';
  const colorSchema = document.documentElement.getAttribute('data-ix-color-schema') || 'dark';
  return `${theme}-${colorSchema}`;
};

export const useEChartsTheme = () => {
  const [theme, setTheme] = useState(getCurrentTheme());

  useLayoutEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(getCurrentTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-ix-theme', 'data-ix-color-schema']
    });

    return () => observer.disconnect();
  }, []);

  return theme;
};
```

**What it does:**
1. **getCurrentTheme()**: Reads both data attributes and combines them into a theme name:
   - `data-ix-theme="classic"` + `data-ix-color-schema="dark"` → `"classic-dark"`
   - `data-ix-theme="brand"` + `data-ix-color-schema="light"` → `"brand-light"`

2. **MutationObserver**: Watches for changes to data attributes
   - Triggers whenever `data-ix-theme` or `data-ix-color-schema` changes
   - Updates the React state with new theme name
   - Causes components using this hook to re-render

#### Step 3: Using the Theme in Components
**Location:** `src/pages/overview/components/status-history/index.tsx`

```tsx
import { useEChartsTheme } from "@/hooks/theme.ts";

function StatusHistory() {
  const theme = useEChartsTheme(); // e.g., "classic-dark"
  
  return (
    <ReactEcharts
      option={option}
      theme={theme}  // ← Pass theme to ECharts
    />
  );
}
```

**What it does:**
1. Hook returns current theme name (e.g., `"classic-dark"`)
2. Pass theme to `<ReactEcharts>` component
3. When theme changes:
   - Hook returns new theme name
   - Component re-renders with new theme prop
   - ECharts internally switches to the new registered theme

## Complete Flow Example

### Scenario: User switches from Classic Dark to Brand Light

1. **Initial State:**
   ```html
   <html data-ix-theme="classic" data-ix-color-schema="dark">
   ```

2. **User Action 1:** Click on "Siemens Brand" in User Settings
   ```
   → changeTheme("brand") called
   → setCurrentTheme("brand")
   → useEffect triggers
   → document.documentElement.setAttribute('data-ix-theme', 'brand')
   ```
   
   **New State:**
   ```html
   <html data-ix-theme="brand" data-ix-color-schema="dark">
   ```

3. **Automatic Reactions:**
   - **iX Components**: CSS automatically applies `[data-ix-theme="brand"][data-ix-color-schema="dark"]` styles
   - **ECharts**: MutationObserver detects change → `setTheme("brand-dark")` → Charts re-render

4. **User Action 2:** Click theme toggle in menu
   ```
   → IxMenu internal handler toggles data-ix-color-schema
   ```
   
   **New State:**
   ```html
   <html data-ix-theme="brand" data-ix-color-schema="light">
   ```

5. **Automatic Reactions:**
   - **iX Components**: CSS automatically applies `[data-ix-theme="brand"][data-ix-color-schema="light"]` styles
   - **ECharts**: MutationObserver detects change → `setTheme("brand-light")` → Charts re-render

## Key Points

1. **Single Source of Truth**: HTML data attributes store the current theme
2. **No Manual Event Bus**: MutationObserver automatically detects changes
3. **Separation of Concerns**:
   - iX components use CSS (automatic via custom properties)
   - ECharts uses JavaScript (manual via theme prop)
4. **Two Independent Dimensions**:
   - Theme name (`classic` / `brand`) - controlled by User Settings
   - Color schema (`dark` / `light`) - controlled by Menu toggle
5. **V4 Compliance**: Uses data attributes instead of deprecated class-based approach

## Benefits of V4 Approach

- **Declarative**: Theme is in HTML, not hidden in JavaScript state
- **Observable**: Any code can watch data attributes for changes
- **Standards-Based**: Uses Web APIs (MutationObserver, data attributes)
- **Performant**: CSS custom properties change instantly without JS
- **Maintainable**: Clear separation between CSS and JS theming
