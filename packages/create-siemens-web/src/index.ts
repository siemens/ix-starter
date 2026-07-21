import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import util from "node:util";
import type { SpawnOptions } from "node:child_process";
import spawn from "cross-spawn";
import mri from "mri";
import * as prompts from "@clack/prompts";
import { determineAgent } from "@vercel/detect-agent";

const { red, green, yellow, underline } = createColors();

type ColorFunc = (str: string) => string;
type Framework = {
  name: string;
  display: string;
  color: ColorFunc;
  variants: FrameworkVariant[];
};
type FrameworkVariant = {
  name: string;
  display: string;
  link?: `https://${string}`;
  color: ColorFunc;
  customCommand?: string;
};

const FRAMEWORKS: Framework[] = [
  {
    name: "angular",
    display: "Angular",
    color: red,
    variants: [
      {
        name: "element-starter",
        display: "Element (Angular) ↗",
        color: red,
      },
      {
        name: "ix-angular-starter",
        display: "iX (Angular) ↗",
        color: red,
      },
    ],
  },
  {
    name: "react",
    display: "React",
    color: green,
    variants: [
      {
        name: "ix-react-starter",
        display: "iX (React) ↗",
        color: green,
      },
    ],
  },
  {
    name: "vue",
    display: "Vue",
    color: yellow,
    variants: [
      {
        name: "ix-vue-starter",
        display: "iX (Vue) ↗",
        color: yellow,
      },
    ],
  },
];
const DEFAULT_TEMPLATE = "element-starter";

const argv = mri<{
  template?: string;
  help?: boolean;
  overwrite?: boolean;
  immediate?: boolean;
  interactive?: boolean;
}>(process.argv.slice(2), {
  boolean: ["help", "overwrite", "immediate", "interactive"],
  alias: { h: "help", t: "template", i: "immediate" },
  string: ["template"],
});
const cwd = process.cwd();

// prettier-ignore
const helpMessage = `\
Usage: create-siemens-web [OPTION]... [DIRECTORY]

Create a new Vite project in JavaScript or TypeScript.
When running in TTY, the CLI will start in interactive mode.

Options:
  -t, --template NAME                   use a specific template
  -i, --immediate / --no-immediate      install dependencies and start dev
  --overwrite                           remove existing files if target directory is not empty
  --interactive / --no-interactive      force interactive / non-interactive mode
  -h, --help                            display this help message

Available templates:

${getListOfAllTemplates()}
`;

function getListOfAllTemplates() {
  return FRAMEWORKS.map((f) => {
    const frameworkColor = f.color;
    const frameworkName = frameworkColor(f.display || f.name);
    const variants = f.variants.map((v) => `  - ${v.name}`).join("\n");
    return `${frameworkName}\n${variants}`;
  }).join("\n\n");
}

const TEMPLATES = FRAMEWORKS.map((f) => f.variants.map((v) => v.name)).reduce(
  (a, b) => a.concat(b),
  [],
);

const renameFiles: Record<string, string | undefined> = {
  _gitignore: ".gitignore",
  _editorconfig: ".editorconfig",
  _npmrc: ".npmrc",
  _prettierignore: ".prettierignore",
  "_stylelintrc.yml": ".stylelintrc.yml",
};

const defaultTargetDir = "vite-project";

function run([command, ...args]: string[], options?: SpawnOptions) {
  const { status, error } = spawn.sync(command, args, options);
  if (status != null && status > 0) {
    process.exit(status);
  }

  if (error) {
    console.error(`\n${command} ${args.join(" ")} error!`);
    console.error(error);
    process.exit(1);
  }
}

function install(root: string, agent: string) {
  if (process.env._TEST_CLI) {
    prompts.log.step(`Installing dependencies with ${agent}... (skipped in test)`);
    return;
  }
  prompts.log.step(`Installing dependencies with ${agent}...`);
  run(getInstallCommand(agent), {
    stdio: "inherit",
    cwd: root,
  });
}

function start(root: string, agent: string) {
  if (process.env._TEST_CLI) {
    prompts.log.step("Starting dev server... (skipped in test)");
    return;
  }
  prompts.log.step("Starting dev server...");
  run(getRunCommand(agent, "dev"), {
    stdio: "inherit",
    cwd: root,
  });
}

async function init() {
  const argTargetDir = argv._[0] ? formatTargetDir(String(argv._[0])) : undefined;
  const argTemplate = argv.template;
  const argOverwrite = argv.overwrite;
  const argImmediate = argv.immediate;
  const argInteractive = argv.interactive;

  const help = argv.help;
  if (help) {
    console.log(helpMessage);
    return;
  }

  const interactive = argInteractive ?? process.stdin.isTTY;

  // Detect AI agent environment for better agent experience (AX)
  const { isAgent } = await determineAgent();
  if (isAgent && interactive) {
    console.log(
      "\nTo create in one go, run: create-vite <DIRECTORY> --no-interactive --template <TEMPLATE>\n",
    );
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const cancel = () => prompts.cancel("Operation cancelled");

  // 1. Get project name and target dir
  let targetDir = argTargetDir;
  if (!targetDir) {
    if (interactive) {
      const projectName = await prompts.text({
        message: "Project name:",
        defaultValue: defaultTargetDir,
        placeholder: defaultTargetDir,
        validate: (value) => {
          return !value || formatTargetDir(value).length > 0 ? undefined : "Invalid project name";
        },
      });
      if (prompts.isCancel(projectName)) return cancel();
      targetDir = formatTargetDir(projectName);
    } else {
      targetDir = defaultTargetDir;
    }
  }

  // 2. Handle directory if exist and not empty
  if (fs.existsSync(targetDir) && !isEmpty(targetDir)) {
    let overwrite: "yes" | "no" | "ignore" | undefined = argOverwrite ? "yes" : undefined;
    if (!overwrite) {
      if (interactive) {
        const res = await prompts.select({
          message:
            (targetDir === "." ? "Current directory" : `Target directory "${targetDir}"`) +
            ` is not empty. Please choose how to proceed:`,
          options: [
            {
              label: "Cancel operation",
              value: "no",
            },
            {
              label: "Remove existing files and continue",
              value: "yes",
            },
            {
              label: "Ignore files and continue",
              value: "ignore",
            },
          ],
        });
        if (prompts.isCancel(res)) return cancel();
        overwrite = res;
      } else {
        overwrite = "no";
      }
    }

    switch (overwrite) {
      case "yes":
        emptyDir(targetDir);
        break;
      case "no":
        cancel();
        return;
    }
  }

  // 3. Get package name
  let packageName = path.basename(path.resolve(targetDir));
  if (!isValidPackageName(packageName)) {
    if (interactive) {
      const packageNameResult = await prompts.text({
        message: "Package name:",
        defaultValue: toValidPackageName(packageName),
        placeholder: toValidPackageName(packageName),
        validate(dir) {
          if (dir && !isValidPackageName(dir)) {
            return "Invalid package.json name";
          }
        },
      });
      if (prompts.isCancel(packageNameResult)) return cancel();
      packageName = packageNameResult;
    } else {
      packageName = toValidPackageName(packageName);
    }
  }

  // 4. Choose a framework and variant
  let template = argTemplate;
  let hasInvalidArgTemplate = false;
  if (argTemplate && !TEMPLATES.includes(argTemplate)) {
    template = undefined;
    hasInvalidArgTemplate = true;
  }
  if (!template) {
    if (interactive) {
      const framework = await prompts.select({
        message: hasInvalidArgTemplate
          ? `"${argTemplate}" isn't a valid template. Please choose from below: `
          : "Select a framework:",
        options: FRAMEWORKS.map((framework) => {
          const frameworkColor = framework.color;
          return {
            label: frameworkColor(framework.display || framework.name),
            value: framework,
          };
        }),
      });
      if (prompts.isCancel(framework)) return cancel();

      const variant = await prompts.select({
        message: "Select a variant:",
        options: framework.variants.map((variant) => {
          const command = variant.customCommand
            ? getFullCustomCommand(variant.customCommand, pkgInfo).replace(/ TARGET_DIR$/, "")
            : undefined;
          return {
            label: getLabel(variant),
            value: variant.name,
            hint: command,
          };
        }),
      });
      if (prompts.isCancel(variant)) return cancel();

      template = variant;
    } else {
      template = DEFAULT_TEMPLATE;
    }
  }

  const pkgManager = pkgInfo ? pkgInfo.name : "npm";

  const root = path.join(cwd, targetDir);

  const { customCommand } =
    FRAMEWORKS.flatMap((f) => f.variants).find((v) => v.name === template) ?? {};

  if (customCommand) {
    const fullCustomCommand = getFullCustomCommand(customCommand, pkgInfo);

    const [command, ...args] = fullCustomCommand.split(" ");
    // we replace TARGET_DIR here because targetDir may include a space
    const replacedArgs = args.map((arg) => arg.replace("TARGET_DIR", () => targetDir));
    const { status } = spawn.sync(command, replacedArgs, {
      stdio: "inherit",
    });
    process.exit(status ?? 0);
  }

  // 5. Ask about immediate install and package manager
  let immediate = argImmediate;
  if (immediate === undefined) {
    if (interactive) {
      const immediateResult = await prompts.confirm({
        message: `Install with ${pkgManager} and start now?`,
      });
      if (prompts.isCancel(immediateResult)) return cancel();
      immediate = immediateResult;
    } else {
      immediate = false;
    }
  }

  // Only create directory for built-in templates, not for customCommand
  fs.mkdirSync(root, { recursive: true });
  prompts.log.step(`Scaffolding project in ${root}...`);

  const templateDir = path.resolve(fileURLToPath(import.meta.url), "../..", `template-${template}`);

  const writeTemplate = (relPath: string, content?: string) => {
    const isTopLevel = !relPath.includes(path.sep);
    const basename = path.basename(relPath);
    const renamedBasename = isTopLevel ? (renameFiles[basename] ?? basename) : basename;
    const targetPath = path.join(root, path.dirname(relPath), renamedBasename);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else if (basename === "index.html") {
      const templateContent = fs.readFileSync(path.join(templateDir, relPath), "utf-8");
      const updatedContent = templateContent.replace(
        /<title>.*?<\/title>/,
        `<title>${packageName}</title>`,
      );
      fs.writeFileSync(targetPath, updatedContent);
    } else {
      fs.copyFileSync(path.join(templateDir, relPath), targetPath);
    }
  };

  const allFiles = walkTemplateDir(templateDir);
  for (const file of allFiles.filter((f) => f !== "package.json")) {
    writeTemplate(file);
  }

  const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, `package.json`), "utf-8"));

  pkg.name = packageName;

  writeTemplate("package.json", JSON.stringify(pkg, null, 2) + "\n");

  if (immediate) {
    install(root, pkgManager);
    start(root, pkgManager);
  } else {
    let doneMessage = "";
    const cdProjectName = path.relative(cwd, root);
    doneMessage += `Done. Now run:\n`;
    if (root !== cwd) {
      doneMessage += `\n  cd ${cdProjectName.includes(" ") ? `"${cdProjectName}"` : cdProjectName}`;
    }
    doneMessage += `\n  ${getInstallCommand(pkgManager).join(" ")}`;
    doneMessage += `\n  ${getRunCommand(pkgManager, "dev").join(" ")}`;
    prompts.outro(doneMessage);
  }
}

function formatTargetDir(targetDir: string) {
  return targetDir
    .trim()
    .replace(/[<>:"\\|?*]/g, "")
    .replace(/\/+$/g, "");
}

function walkTemplateDir(dir: string, prefix = ""): string[] {
  const result: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const relPath = prefix ? path.join(prefix, entry.name) : entry.name;
    if (entry.isDirectory()) {
      result.push(...walkTemplateDir(path.join(dir, entry.name), relPath));
    } else {
      result.push(relPath);
    }
  }
  return result;
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z\d\-~]+/g, "-");
}

function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

interface PkgInfo {
  name: string;
  version: string;
}

function pkgFromUserAgent(userAgent: string | undefined): PkgInfo | undefined {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

function updateReactCompilerReadme(root: string, newBody: string) {
  editFile(path.resolve(root, `README.md`), (content) => {
    const h2Start = content.indexOf("## React Compiler");
    const bodyStart = content.indexOf("\n\n", h2Start);
    const compilerSectionEnd = content.indexOf("\n## ", bodyStart);
    if (h2Start === -1 || bodyStart === -1 || compilerSectionEnd === -1) {
      console.warn("Could not update compiler section in README.md");
      return content;
    }
    return content.replace(content.slice(bodyStart + 2, compilerSectionEnd - 1), newBody);
  });
}

function editFile(file: string, callback: (content: string) => string) {
  const content = fs.readFileSync(file, "utf-8");
  fs.writeFileSync(file, callback(content), "utf-8");
}

function getFullCustomCommand(customCommand: string, pkgInfo?: PkgInfo) {
  const pkgManager = pkgInfo ? pkgInfo.name : "npm";
  const isYarn1 = pkgManager === "yarn" && pkgInfo?.version.startsWith("1.");

  return (
    customCommand
      .replace(/^npm create (?:-- )?/, () => {
        // `bun create` uses its own set of templates,
        // the closest alternative is using `bun x` directly on the package
        if (pkgManager === "bun") {
          return "bun x create-";
        }
        // Deno uses `run -A npm:create-` instead of `create` or `init` to also provide needed perms
        if (pkgManager === "deno") {
          return "deno run -A npm:create-";
        }
        // pnpm doesn't support the -- syntax
        if (pkgManager === "pnpm") {
          return "pnpm create ";
        }
        // For other package managers, preserve the original format
        return customCommand.startsWith("npm create -- ")
          ? `${pkgManager} create -- `
          : `${pkgManager} create `;
      })
      // Only Yarn 1.x doesn't support `@version` in the `create` command
      .replace("@latest", () => (isYarn1 ? "" : "@latest"))
      .replace(/^npm exec (?:-- )?/, () => {
        // Prefer `pnpm dlx`, `yarn dlx`, or `bun x`
        if (pkgManager === "pnpm") {
          // pnpm doesn't support the -- syntax
          return "pnpm dlx ";
        }
        if (pkgManager === "yarn" && !isYarn1) {
          return "yarn dlx ";
        }
        if (pkgManager === "bun") {
          return "bun x ";
        }
        if (pkgManager === "deno") {
          return "deno run -A npm:";
        }
        // Use `npm exec` in all other cases,
        // including Yarn 1.x and other custom npm clients.
        return customCommand.startsWith("npm exec -- ") ? "npm exec -- " : "npm exec ";
      })
  );
}

function getLabel(variant: FrameworkVariant) {
  const labelText = variant.display || variant.name;
  let label = variant.color(labelText);
  const { link } = variant;
  if (link) {
    label += ` ${underline(link)}`;
  }
  return label;
}

function getInstallCommand(agent: string) {
  if (agent === "yarn") {
    return [agent];
  }
  return [agent, "install"];
}

function getRunCommand(agent: string, script: string) {
  switch (agent) {
    case "yarn":
    case "pnpm":
    case "bun":
      return [agent, script];
    case "deno":
      return [agent, "task", script];
    default:
      return [agent, "run", script];
  }
}

type ColorName = Exclude<Parameters<typeof util.styleText>[0], any[]>;

function createColors() {
  return new Proxy({} as Record<ColorName, ColorFunc>, {
    get(_, prop: ColorName) {
      // eslint-disable-next-line n/no-unsupported-features/node-builtins -- our supported nodejs range supports `styleText` but in experimental state, which is fine
      return (str: string) => util.styleText(prop, str);
    },
  });
}

init().catch((e) => {
  console.error(e);
});
