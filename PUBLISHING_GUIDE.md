# Publishing Guide for @speechall/sdk

This guide explains how to build and publish the Speechall TypeScript SDK to npm, both locally and through GitHub Actions.

## Prerequisites

Before you start, ensure you have:
- [ ] Node.js 16+ installed
- [ ] npm account with access to publish packages
- [ ] NPM access token generated from npmjs.org
- [ ] Repository cloned locally

## Setup NPM Authentication

### Option 1: Local Publishing Setup

1. **Configure npm with your access token:**
   ```bash
   npm config set //registry.npmjs.org/:_authToken YOUR_ACCESS_TOKEN
   ```

2. **Verify your authentication:**
   ```bash
   npm whoami
   ```
   This should display your npm username.

### Option 2: Using .npmrc file (Alternative)
Create a `.npmrc` file in your home directory:
```
//registry.npmjs.org/:_authToken=YOUR_ACCESS_TOKEN
```

⚠️ **Important:** Never commit your access token to version control!

## Publishing Locally

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Quality Checks
```bash
# Run linting
npm run lint

# Fix any linting issues
npm run lint:fix
```

### Step 3: Build the Package
```bash
# Clean previous builds
npm run clean

# Build both CommonJS and ESM versions
npm run build
```

This will create:
- `dist/` - CommonJS build
- `dist/esm/` - ES Modules build

### Step 4: Test the Build
```bash
# Test that the package can be imported
node -e "require('./dist/index.js')"
```

### Step 5: Version Management

Before publishing, update the version in `package.json`:

```bash
# For patch releases (0.0.1 -> 0.0.2)
npm version patch

# For minor releases (0.0.1 -> 0.1.0)
npm version minor

# For major releases (0.0.1 -> 1.0.0)
npm version major
```

This automatically:
- Updates `package.json`
- Creates a git commit
- Creates a git tag

### Step 6: Publish to npm

#### Dry Run (Recommended first time)
```bash
npm publish --dry-run
```

This shows what would be published without actually doing it.

#### Actual Publishing
```bash
npm publish
```

For scoped packages (like `@speechall/sdk`), you might need:
```bash
npm publish --access public
```

## Publishing via GitHub Actions (Recommended)

Your repository already has a CI/CD workflow configured. Here's how to use it:

### Step 1: Setup NPM Token in GitHub

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `NPM_TOKEN`
5. Value: Your npm access token
6. Click "Add secret"

### Step 2: Create a Release

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "feat: prepare for v0.0.1 release"
   git push origin main
   ```

2. **Update version and create a tag:**
   ```bash
   npm version patch  # or minor/major
   git push origin main --tags
   ```

3. **Create a GitHub Release:**
   - Go to your repository on GitHub
   - Click "Releases" → "Create a new release"
   - Choose the tag you just created
   - Add release notes
   - Click "Publish release"

The GitHub Action will automatically:
- Run tests on Node.js 16, 18, and 20
- Build the package
- Publish to npm (only on release creation)

## Verification

After publishing, verify your package:

1. **Check on npmjs.org:**
   Visit: https://www.npmjs.com/package/@speechall/sdk

2. **Test installation in a new project:**
   ```bash
   mkdir test-install
   cd test-install
   npm init -y
   npm install @speechall/sdk
   ```

3. **Test importing:**
   ```javascript
   // test.js
   const { SpeechallSDK } = require('@speechall/sdk');
   console.log('Package imported successfully!');
   ```

## Troubleshooting

### Common Issues

1. **Authentication Error:**
   ```
   npm ERR! 401 Unauthorized
   ```
   Solution: Check your npm token is correctly configured.

2. **Package Name Conflicts:**
   ```
   npm ERR! 403 Forbidden
   ```
   Solution: The package name might be taken. Update `name` in `package.json`.

3. **Build Errors:**
   - Ensure all TypeScript files compile without errors
   - Check that all dependencies are installed
   - Verify `tsconfig.json` configuration

### Best Practices

- [ ] Always run `npm run lint` before publishing
- [ ] Test the built package locally before publishing
- [ ] Use semantic versioning (semver)
- [ ] Write clear release notes
- [ ] Test your package after publishing
- [ ] Keep your npm token secure

## Available Scripts

- `npm run build` - Build both CommonJS and ESM versions
- `npm run build:cjs` - Build CommonJS version only
- `npm run build:esm` - Build ESM version only
- `npm run clean` - Remove dist directory
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run prepublishOnly` - Clean and build (runs automatically before publish)

## Next Steps

1. Set up your npm authentication
2. Test building the package locally
3. Set up the GitHub secret for automated publishing
4. Create your first release!

---

**Need help?** Check the [npm documentation](https://docs.npmjs.com/) or create an issue in this repository. 