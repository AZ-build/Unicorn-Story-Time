# How to put the game online (no command line needed)

You're going to end up with a web address like:

> **https://az-build.github.io/unicorn-story-time/**

Anyone with that link can play it. She can add it to her phone's home screen and it
will look and behave exactly like a real app — including working with no internet.

The whole thing takes about ten minutes and happens entirely in a web browser.

---

## Step 1 — Make a new repository

A "repository" (repo) is just a folder that lives on GitHub.

1. Go to **https://github.com/new** (sign in as AZ-build if you aren't already)
2. **Repository name:** `unicorn-story-time`
3. Leave the description blank, or write "A choose-your-own-adventure unicorn game"
4. Choose **Public** — this is required for free GitHub Pages hosting
5. **Don't** tick "Add a README file"
6. Click the green **Create repository** button

---

## Step 2 — Upload the game

You'll now be on a mostly empty page with some setup instructions. Ignore all of it
except one link.

1. Find the link that says **"uploading an existing file"** and click it
   *(if you can't see it, go to `https://github.com/AZ-build/unicorn-story-time/upload/main`)*
2. Open the **`app`** folder on your computer:
   `C:\Users\bird\Unicorn Story Time\app`
3. Select **everything inside** the `app` folder — the files AND the `data`, `js` and
   `icons` folders. On Windows: click inside the folder, press **Ctrl + A**.
4. **Drag it all** onto the GitHub upload page

   > ⚠️ **Important:** upload the *contents* of the `app` folder, not the `app` folder
   > itself. When you're done, `index.html` should be sitting at the top level of the
   > repo, not inside a folder called `app`. If you get this wrong the link won't work —
   > but you can just delete the repo and start over, no harm done.

5. Scroll down and click the green **Commit changes** button
6. Wait for the upload to finish. You should now see `index.html`, `styles.css`,
   `manifest.json`, `sw.js`, and the `data`, `js` and `icons` folders listed.

> **About the hidden `.nojekyll` file.** The `app` folder contains a small empty file
> called `.nojekyll` that Windows hides from you. It tells GitHub not to try anything
> clever with the files. If it doesn't make it into the upload, nothing breaks — the
> game works either way.

---

## Step 3 — Turn on GitHub Pages

This is the step that makes it a real website.

1. In your repo, click the **Settings** tab (top right, near the gear icon)
2. In the left sidebar, click **Pages**
3. Under **"Build and deployment" → Source**, choose **Deploy from a branch**
4. Under **Branch**, choose **`main`**, leave the folder as **`/ (root)`**
5. Click **Save**

Now wait. It takes **one to three minutes** the first time. Refresh the Settings → Pages
screen and you'll eventually see a green box with your link:

> Your site is live at **https://az-build.github.io/unicorn-story-time/**

Click it. The unicorn should be waiting.

---

## Step 4 — Put it on her phone

This is the part that makes it feel like a real app rather than a website.

**On an iPhone:**

1. Open the link in **Safari** (this only works in Safari, not Chrome)
2. Tap the **Share** button — the square with an arrow coming out of the top
3. Scroll down and tap **Add to Home Screen**
4. Name it **Story Time** and tap **Add**

**On an Android phone:**

1. Open the link in **Chrome**
2. Tap the **⋮** menu in the top right
3. Tap **Add to Home screen** (or **Install app** if it offers that)
4. Tap **Add** / **Install**

Either way, she now has a unicorn icon on her home screen. Tapping it opens the game
full screen with no browser bars, and it works on a plane, in the car, or anywhere with
no signal.

---

## Step 5 — When you want to change something

Say you fix a typo, or we add Chapter Four.

1. Go to your repo on GitHub
2. Navigate to the file that changed (for a new chapter that's `data/story.js`)
3. Click the file, then click the **pencil icon** to edit it — or use
   **Add file → Upload files** to replace it with the new version from your computer
4. Click **Commit changes**

GitHub Pages redeploys automatically in about a minute.

> **One quirk to know about:** because the game is built to work offline, her phone
> keeps a copy. After you publish an update she may need to close the app completely
> and reopen it — sometimes twice — before she sees the new version. Her saved
> progress is never affected by an update.
>
> **And one more, about the icon:** the home-screen icon is baked in at the moment she
> adds the app to her home screen, and phones never change it afterwards. If the icon
> ever changes, the fix is to delete the icon from her home screen and add it again
> (Step 4). Her saved progress lives in the browser, not in the shortcut, so it survives
> that untouched.

---

## If something goes wrong

| What you see | What it means | Fix |
|---|---|---|
| "404 — There isn't a GitHub Pages site here" | Pages hasn't finished building yet | Wait 3 minutes and refresh |
| A page of plain text, no unicorn | `index.html` isn't at the top level | You uploaded the `app` folder instead of its contents. Delete the repo and redo Step 2. |
| The page loads but is unstyled and white | `styles.css` didn't upload | Re-upload it |
| Nothing happens when you tap a choice | A `js` or `data` file is missing | Check the repo has both folders with all their files |

If you get stuck, tell me what you see on screen and I'll walk you through it.

---

## A note on privacy

There is no server, no account, no login, and no analytics. Her progress is saved only
in her own phone's browser storage and never leaves the device. Nothing she does in the
game is sent anywhere.

The flip side: if she clears her browser data, or switches to a different phone, her
progress doesn't come with her. That's a deliberate trade — no accounts means nothing to
collect and nothing to leak. If it ever becomes a real problem, we can add an
"export my adventure" button that saves her progress as a file.
