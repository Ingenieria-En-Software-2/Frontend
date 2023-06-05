from selenium.webdriver.common.by import By

class UsersPage:
    def __init__(self, driver):
        self.driver = driver

    def get_users_data(self):
        table = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/section/div/div[2]/div[2]/table')
        tbody = table.find_element(By.TAG_NAME, "tbody")
        rows = tbody.find_elements(By.TAG_NAME, "tr")

        users_data = []
        for row in rows:
            cells = row.find_elements(By.TAG_NAME, "td")
            row_data = [cell.text for cell in cells]
            users_data.append(row_data)

        return users_data
