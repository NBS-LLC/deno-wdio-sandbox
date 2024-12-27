import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";
import { remote } from "webdriverio";

describe("proof of concept", () => {
  it("can e2e test a webpage", async () => {
    const browser = await remote({
      capabilities: {
        browserName: "chrome",
        browserVersion: "stable",
        "goog:chromeOptions": {
          args: Deno.env.get("CI") ? ["headless", "disable-gpu"] : [],
        },
      },
      outputDir: "./output",
    });

    await browser.url("https://webdriver.io");
    const apiLink = browser.$("=API");
    await apiLink.click();

    const header = browser.$("<h1>");
    expect(await header.getText()).toEqual("Introduction");
    await browser.saveScreenshot("./output/screenshot.png");

    await browser.deleteSession();
  });
});
