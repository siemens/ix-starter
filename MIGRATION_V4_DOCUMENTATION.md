# Migration to V4 - Documentation

## Project Information

**Date:** 2025-10-24  
**React Starter App Version:** 0.0.0  
**Migration Target:** V4 Release Candidate (PR-2198-20251023082407)

### Environment Requirements
- **Node.js:** v22.19.0 or higher for V4
- **pnpm:** 10.14.0 (locked) ✅
- **Package Manager:** pnpm (monorepo with Turborepo)

---

## Current Package Versions

### Core iX Packages
- `@siemens/ix`: **3.2.0** → Target: `0.0.0-pr-2198-20251023082407`
- `@siemens/ix-react`: **3.2.0** → Target: `0.0.0-pr-2198-20251023082407`
- `@siemens/ix-icons`: **3.1.1** → Check for updates
- `@siemens/ix-aggrid`: **3.0.2** → ⚠️ Waiting for v4 build
- `@siemens/ix-echarts`: **3.0.0** → Keep current

### Related Dependencies
- `ag-grid-community`: 32.2.1 → Will update to v33+
- `ag-grid-react`: 32.2.1 → Will update to v33+
- `react`: 18.3.1
- `react-dom`: 18.3.1

---

## Migration Steps (Following Official V4 Migration Guide Order)

### Step 1: Updated Dependencies
✅ **Status:** Ready to execute  

**Command to update packages:**

Run this command from the project root:
```bash
pnpm --filter ix-react-starter add @siemens/ix@0.0.0-pr-2198-20251023082407 @siemens/ix-react@0.0.0-pr-2198-20251023082407
```

Or from the `apps/react-starter` directory:
```bash
cd apps/react-starter
pnpm add @siemens/ix@0.0.0-pr-2198-20251023082407 @siemens/ix-react@0.0.0-pr-2198-20251023082407
```

**What this command does:**
- Updates `@siemens/ix` from 3.2.0 → 0.0.0-pr-2198-20251023082407
- Updates `@siemens/ix-react` from 3.2.0 → 0.0.0-pr-2198-20251023082407
- Automatically updates `package.json` and `pnpm-lock.yaml`
- Installs the new package versions

**Packages NOT updated (intentionally):**
- `@siemens/ix-aggrid`: Keeping at 3.0.2 (waiting for v4 build)
- `@siemens/ix-echarts`: Keeping at 3.0.0 (no update needed)
- `@siemens/ix-icons`: Keeping at 3.1.1 (no breaking changes)

**After running the command:**
1. Verify the update: `pnpm list @siemens/ix @siemens/ix-react`
2. Check that both packages show version `0.0.0-pr-2198-20251023082407`
3. Proceed to Step 4: Component Updates (button variants migration)

---

### Step 2: Renamed or Removed Icons
✅ **Status:** COMPLETE - No action needed  
**Finding:** The deprecated `cam` icon is not used in the codebase

---

### Step 3: Deprecated and Removed Components
✅ **Status:** COMPLETE - No action needed  
**Findings:**
- **Basic Navigation:** Not used
- **Map Navigation:** Not used  
- **Drawer:** Not used (already using IxPane)

---

### Step 4: Component Updates

#### 4.1 ix-application
✅ **Status:** Review needed  
**Change:** `min-width: 0` added to content-area  
**Location:** `src/App.tsx`  
**Action:** Verify no custom workarounds exist (✅ confirmed - none found)

---

#### 4.2 ix-application-header
✅ **Status:** COMPLETE - No action needed  
**Change:** Height changed from 44px → 48px  
**Location:** `src/App.tsx`  
**Verification:** Height is already 48px - correct for V4

---

#### 4.3 ix-button variants
✅ **Status:** COMPLETE - All 8 IxButton instances migrated

**Affected Components in this app:**
- ✅ ix-button (9 instances)
- ✅ ix-icon-button (7 instances)
- ❌ ix-dropdown-button (not used)
- ❌ ix-split-button (not used)
- ❌ ix-toggle-button (not used)
- ❌ ix-icon-toggle-button (not used)

**Migration Rules:**
| Old Variant | Outline | Ghost | New Variant |
|------------|---------|-------|-------------|
| `secondary` | `false` | `false` | `subtle-primary` |
| `secondary` | `true` | `false` | `subtle-secondary` |
| `secondary` | `false` | `true` | `subtle-tertiary` |
| `primary` | `false` | `false` | `primary` |
| `primary` | `true` | `false` | `secondary` |
| `primary` | `false` | `true` | `tertiary` |
| `danger` | `false` | `false` | `danger-primary` |
| `danger` | `true` | `false` | `danger-secondary` |
| `danger` | `false` | `true` | `danger-tertiary` |

**Default Variants (when no variant specified):**

**IxButton defaults:**
| Outline | Ghost | New Variant |
|---------|-------|-------------|
| `false` | `false` | `primary` |
| `true` | `false` | `secondary` |
| `false` | `true` | `tertiary` |

**IxIconButton defaults:**
| Outline | Ghost | New Variant |
|---------|-------|-------------|
| `false` | `false` | `subtle-primary` |
| `true` | `false` | `subtle-secondary` |
| `false` | `true` | `subtle-tertiary` |

**Migration Completed:**

##### IxButton - 8 instances across 5 files

1. ✅ **File:** `src/pages/devices/components/ag-grid-table/delete-modal.tsx`
   - Button 1: `variant="secondary" outline` → `variant="subtle-secondary"` (removed outline prop)
   - Button 2: `variant="danger"` → `variant="danger-primary"`

2. ✅ **File:** `src/pages/devices/components/modal/add-device-modal.tsx`
   - Button 1: `outline` → `variant="secondary"` (removed outline prop)
   - Button 2: No props → Added explicit `variant="primary"`

3. ✅ **File:** `src/pages/devices/components/device-details/index.tsx`
   - Button 1: `outline` → `variant="secondary"` (removed outline prop)

4. ✅ **File:** `src/pages/overview/components/incidents/overview/index.tsx`
   - Button 1: `outline` → `variant="secondary"` (removed outline prop)
   - Button 2: No props → Added explicit `variant="primary"`

5. ✅ **File:** `src/pages/overview/components/incidents/overview/incident-list/index.tsx`
   - Button 1: `outline color="primary"` → `variant="secondary"` (removed outline and color props)

##### IxIconButton - 9 instances across 2 files

1. ✅ **File:** `src/pages/devices/components/ag-grid-table/quick-actions-cell-renderer.tsx`
   - Button 1: `variant="secondary" ghost` → `variant="subtle-tertiary"` (removed ghost prop)
   - Button 2: `variant="secondary" ghost` → `variant="subtle-tertiary"` (removed ghost prop)
   - Button 3: `variant="secondary" ghost` → `variant="subtle-tertiary"` (removed ghost prop)
   - Buttons 4-7: `ghost` (no variant) → `variant="subtle-tertiary"` (removed ghost prop)

2. ✅ **File:** `src/pages/overview/components/incidents/overview/incident-list/index.tsx`
   - Button 1 (Desktop): `variant="secondary" ghost` → `variant="subtle-tertiary"` (removed ghost prop)
   - Button 2 (Mobile): `variant="primary" outline` → `variant="secondary"` (removed outline prop)

---

#### 4.4 ix-pane
✅ **Status:** Optional enhancements available  
**Location:** `src/pages/devices/components/device-details/index.tsx`  
**New Properties Available:**
- `close-on-click-outside`
- `aria-label-close-button`
- `aria-label-expand-button`
- `aria-label-collapse-button`

**Action:** Can be added for improved accessibility (optional)

---

#### 4.5 ix-aggrid
⚠️ **Status:** WAITING for `@siemens/ix-aggrid` v4 build

**Current Implementation:**
- `src/index.css`: Imports `@siemens/ix-aggrid/dist/ix-aggrid/ix-aggrid.css`
- `src/pages/devices/components/ag-grid-table/ag-grid-table.tsx`:
  - Imports `ag-grid-community/styles/ag-theme-alpine.css`
  - Uses classes: `ag-theme-alpine-dark ag-theme-ix`

**Migration Steps (Once v4 build available):**

1. **Update packages:**
   ```bash
   pnpm add @siemens/ix-aggrid@^4.0.0 ag-grid-community@^33.0.0 ag-grid-react@^33.0.0
   ```

2. **Remove CSS import from `src/index.css`:**
   ```scss
   // ❌ Remove this line
   @import "@siemens/ix-aggrid/dist/ix-aggrid/ix-aggrid.css";
   ```

3. **Remove CSS import and theme classes from `src/pages/devices/components/ag-grid-table/ag-grid-table.tsx`:**
   ```tsx
   // ❌ Remove this import
   @import "ag-grid-community/styles/ag-theme-alpine.css";
   
   // ❌ Remove these classes
   className="ag-theme-alpine-dark ag-theme-ix"
   ```

4. **Add new theming API:**
   ```javascript
   import { useIxTheme } from '@siemens/ix-aggrid';
   import { provideGlobalGridOptions } from 'ag-grid-community';
   
   const ixTheme = await useIxTheme(() => import('ag-grid-community'));
   
   provideGlobalGridOptions({
     theme: ixTheme,
   });
   ```

---

### Step 5: Global Style Updates

#### 5.1 Updated Elevation Principle
⚠️ **Status:** Review needed

**Change:** Components require visual outline if placed on `color-2` or `component-1`

**Affected Components in App:**

##### IxCard (2 instances)
**Locations:**
1. `src/pages/overview/components/device-range/index.tsx`
2. `src/pages/overview/components/status-history/index.tsx`

**Current:** Using default `filled` variant  
**Action:** Check background color context. If on `color-2` or `component-1`, change to `variant="outline"`

##### IxEventList (1 instance)
**Location:** `src/pages/overview/components/incidents/overview/incident-list/index.tsx`

**Current:** Using default variant  
**Action:** Check background color context. If on `color-2` or `component-1`, add `variant="outline"`

---

## Migration Execution Order

Follow this exact sequence:

1. ✅ **Dependencies** - Update core iX packages
2. ✅ **Icons** - No action needed (cam not used)
3. ✅ **Deprecated Components** - No action needed (not used)
4. 🔴 **Button Variants** - Update 16 button instances (PRIORITY)
5. ⚠️ **Application Components** - Visual review after update
6. ⚠️ **Elevation Principle** - Review and update cards/event list
7. ✅ **Pane** - Optional accessibility enhancements
8. ⏳ **AG Grid** - Execute when v4 build available

---

## Testing Checklist

After migration:

- [ ] Visual regression testing for button variants
- [ ] Test all button interactions (click, hover, disabled states)
- [ ] Verify application header height change
- [ ] Check card/event list appearance on different backgrounds
- [ ] Test pane functionality
- [ ] AG Grid functionality (after v4 available)
- [ ] Run unit tests: `pnpm test`
- [ ] Run E2E tests: `pnpm e2e`

---

## Notes

- **Important:** Start button migration by renaming `secondary` to `subtle-*` variants first to avoid unwanted overriding
- Visually review changes to ensure `subtle-*` variants are not mixed with default variants
- AG Grid migration is prepared but waiting for official v4 build release
