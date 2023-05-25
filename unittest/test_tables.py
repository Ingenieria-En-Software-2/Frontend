import unittest
import os
from selenium import webdriver
from users_page import UsersPage
from roles_page import RolesPage

class TestTableFunctionality(unittest.TestCase):
    def setUp(self):
        path = os.path.dirname(os.path.abspath(__file__)) # Find the path to chromedriver
        self.driver = webdriver.Chrome(executable_path=os.path.join(path, 'chromedriver')) # Set up Selenium WebDriver and navigate to the web page

    def test_users_data_extraction(self):
        self.driver.get("http://localhost:5173/users")
        users_page = UsersPage(self.driver)
        users_data = users_page.get_users_data()

        expected_data = [
            ["admin", "Admin", "One", "Analista de Cuentas", "Interno", ""],
            ["user", "User", "Two", "Analista de Cuentas", "Externo", ""],
            ["user2", "User", "Three", "Cuentahabiente", "Mixto", ""],
            ["user3", "User", "Four", "Analista de Cuentas", "Interno", ""],
            ["user4", "User", "Five", "Cuentahabiente", "Externo", ""],
        ]

        self.assertEqual(users_data, expected_data)

    def test_roles_data_extraction(self):
        self.driver.get("http://localhost:5173/roles")  # URL de la página de roles
        roles_page = RolesPage(self.driver)
        roles_data = roles_page.get_roles_data()

        expected_data = [
            ["1", "Gerente General", ""],
            ["2", "Gerente de Operaciones", ""],
            ["3", "Sub-Gerente de Cuentas", ""],
            ["4", "Analista de Cuentas", ""],
            ["5", "Administrador de Sistemas", ""],
            ["6", "Cuentahabiente", ""],
        ]

        self.assertEqual(roles_data, expected_data)

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
