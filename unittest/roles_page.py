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

    def get_roles_description(self):
        info = []

        ######## BUTTON 1 ########

        button1 = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/section/div/div[2]/div[2]/table/tbody/tr[1]/td[3]/div/div[1]/button')
        button1.click()

        # Obtener el valor de una etiqueta input
        input1 = self.driver.find_element(By.XPATH, '//*[@id="description"]')
        info.append(input1.get_attribute('value'))

        # Cerrar ventana modal
        cerrar1 = self.driver.find_element(By.XPATH, '//*[@id="alert-dialog-title"]/button')
        cerrar1.click()

        ######## BUTTON 2 ########

        button2 = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/section/div/div[2]/div[2]/table/tbody/tr[2]/td[3]/div/div[1]/button')
        button2.click()

        # Obtener el valor de una etiqueta input
        input2 = self.driver.find_element(By.XPATH, '//*[@id="description"]')
        info.append(input2.get_attribute('value'))

        # Cerrar ventana modal
        cerrar2 = self.driver.find_element(By.XPATH, '//*[@id="alert-dialog-title"]/button')
        cerrar2.click()

        ######## BUTTON 3 ########

        button3 = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/section/div/div[2]/div[2]/table/tbody/tr[3]/td[3]/div/div[1]/button')
        button3.click()

        # Obtener el valor de una etiqueta input
        input3 = self.driver.find_element(By.XPATH, '//*[@id="description"]')
        info.append(input3.get_attribute('value'))

        # Cerrar ventana modal
        cerrar3 = self.driver.find_element(By.XPATH, '//*[@id="alert-dialog-title"]/button')
        cerrar3.click()

        ######## BUTTON 4 ########

        button4 = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/section/div/div[2]/div[2]/table/tbody/tr[4]/td[3]/div/div[1]/button')
        button4.click()

        # Obtener el valor de una etiqueta input
        input4 = self.driver.find_element(By.XPATH, '//*[@id="description"]')
        info.append(input4.get_attribute('value'))

        # Cerrar ventana modal
        cerrar4 = self.driver.find_element(By.XPATH, '//*[@id="alert-dialog-title"]/button')
        cerrar4.click()

        ######## BUTTON 5 ########

        button5 = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/section/div/div[2]/div[2]/table/tbody/tr[5]/td[3]/div/div[1]/button')
        button5.click()

        # Obtener el valor de una etiqueta input
        input5 = self.driver.find_element(By.XPATH, '//*[@id="description"]')
        info.append(input5.get_attribute('value'))

        # Cerrar ventana modal
        cerrar5 = self.driver.find_element(By.XPATH, '//*[@id="alert-dialog-title"]/button')
        cerrar5.click()

        ######## BUTTON 6 ########

        button6 = self.driver.find_element(By.XPATH, '//*[@id="root"]/div/div/section/div/div[2]/div[2]/table/tbody/tr[6]/td[3]/div/div[1]/button')
        button6.click()

        # Obtener el valor de una etiqueta input
        input6 = self.driver.find_element(By.XPATH, '//*[@id="description"]')
        info.append(input6.get_attribute('value'))

        # Cerrar ventana modal
        cerrar6 = self.driver.find_element(By.XPATH, '//*[@id="alert-dialog-title"]/button')
        cerrar6.click()

        return info
