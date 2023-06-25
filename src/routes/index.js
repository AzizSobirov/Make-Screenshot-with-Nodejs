import { Router } from "express";
import chromium from "chrome-aws-lambda";

const router = Router();

router.get("/screenshot", async (req, res) => {
  const { url } = req.query;

  try {
    const browser = await chromium.puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1200 });

    await page.goto(url);
    const screenshotBuffer = await page.screenshot();

    await browser.close();
    console.log("Screenshot taken successfully!");

    res.set("Content-Type", "image/png");
    res.send(screenshotBuffer);
  } catch (error) {
    console.error("Error capturing screenshot:", error);
    res.status(500).send("Error capturing screenshot");
  }
});

export default router;
