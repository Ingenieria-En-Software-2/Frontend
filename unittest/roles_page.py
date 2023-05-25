from selenium.webdriver.common.by import By

class RolesPage:
    def __init__(self, driver):
        self.driver = driver

    def get_roles_data(self):
        table = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/section/div/div[2]/div[2]/table')
        tbody = table.find_element(By.TAG_NAME, "tbody")
        rows = tbody.find_elements(By.TAG_NAME, "tr")

        roles_data = []
        for row in rows:
            cells = row.find_elements(By.TAG_NAME, "td")
            row_data = [cell.text for cell in cells]
            roles_data.append(row_data)

        return roles_data
