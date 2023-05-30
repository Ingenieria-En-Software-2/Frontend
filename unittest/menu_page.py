from selenium.webdriver.common.by import By

class MenuPage:
    def __init__(self, driver):
        self.driver = driver

    def click_hamburger_button(self):
        button = self.driver.find_element(By.XPATH, '/html/body/div/div/main/div/aside/div/button')
        button.click()

    def click_back(self):
        button = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/aside/div/button')
        button.click()

    def click_menu_item(self, index):
        menu_items = self.driver.find_elements(By.CSS_SELECTOR, '.MuiList-root a')
        menu_items[index].click()

    def get_current_url(self):
        return self.driver.current_url
