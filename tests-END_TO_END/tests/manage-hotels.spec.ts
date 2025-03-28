import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = "http://localhost:5173/";

test.beforeEach(async({page})=>{

      await page.goto(UI_URL);
    
      //get the sign in button
      await page.getByRole('link', {name: "Sign In"}).click();
    
      await expect(page.getByRole('heading', {name: "Sign In"})).toBeVisible();
    
      await page.locator("[name=email]").fill("test_register_4471@test.com");
      await page.locator("[name=password]").fill("password");
    
      await page.getByRole('button', {name: "Login"}).click();
    
      await expect(page.getByText("Sign In Successful!")).toBeVisible();

})

test("should allow user to add a hotel", async ({page})=>{

    await page.goto(`${UI_URL}add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("Test Test Test Test Test Test");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]', "3");
    await page.getByText("Budget").click();
    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();
    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");

    await page.setInputFiles('[name="imageFiles"]', [ 
        path.join(__dirname, "files", "1_hotel.jpg"),
        path.join(__dirname, "files", "3_hotel.jpg"), 
    ])

    await page.getByRole('button', {
        name: "Save"
    }).click();

    await expect(page.getByText("Hotel Saved!")).toBeVisible();
})

test("should display hotels", async ({page})=> {

    await page.goto(`${UI_URL}my-hotels`);

    await expect(page.getByText("Taj Residency")).toBeVisible();
    // await expect(page.locator(':has-text("Contrary to popular belief,")')).toBeVisible();

    await expect(page.getByText("Darjeling, India")).toBeVisible();
    await expect(page.getByText("Cabin")).toBeVisible();
    await expect(page.getByText("$700 per Night")).toBeVisible();
    await expect(page.getByText("2 adults, 0 children")).toBeVisible();
    await expect(page.getByText("4 Star Ratings")).toBeVisible();

    await expect(page.getByRole("link", {name: "Add Hotel"})).toBeVisible();
    await expect(page.getByRole("link", {name: "View Deatils"})).toBeVisible();
});

test("should edit hotel", async ({page})=>{
    await page.goto(`${UI_URL}my-hotels`);
    await page.getByRole("link", {name: "View Deatils"}).click();
    await page.waitForSelector('[name="name"]', {state: "attached"});
    await expect(page.locator('[name="name"]')).toHaveValue('Taj Residency');
    await page.locator('[name="name"]').fill("Taj Residency-Updated");
    await page.getByRole("button", {name: "Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
})


